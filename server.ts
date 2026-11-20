import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import stream from "node:stream";
import url from "node:url";
import { createServer as createViteServer } from "vite";
import {
  buildSecurityHeaders,
  readBoundedJsonBody,
  safeLogError,
  sanitizePlainText,
} from "./src/security";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const HOST = "0.0.0.0";
const DATA_DIR = path.join(__dirname, "data");
const LEADERBOARD_FILE = path.join(DATA_DIR, "pont_de_salars_leaderboard.json");

type NodeIncomingReq = {
  method?: string;
  url?: string;
  headers: Record<string, string | string[] | undefined>;
};

type NodeServerRes = {
  statusCode: number;
  headersSent?: boolean;
  setHeader(name: string, value: string | string[]): void;
  end(chunk?: unknown): void;
};

export interface LeaderboardEntry {
  id: string;
  familyName: string;
  avatarId: "renard" | "chouette" | "loutre";
  levelId: "petits" | "aventuriers" | "grands" | "experts";
  seriesId?: "decouverte" | "pimentee";
  treasuresFound: number;
  stars: number;
  score: number;
  completed: boolean;
  updatedAt: string;
}

const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: "seed-1",
    familyName: "Famille Delmas",
    avatarId: "loutre",
    levelId: "grands",
    treasuresFound: 10,
    stars: 29,
    score: 1450,
    completed: true,
    updatedAt: "2026-11-18T15:40:00.000Z",
  },
  {
    id: "seed-2",
    familyName: "Les Loups du Viaur",
    avatarId: "renard",
    levelId: "aventuriers",
    treasuresFound: 10,
    stars: 27,
    score: 1320,
    completed: true,
    updatedAt: "2026-11-18T11:20:00.000Z",
  },
  {
    id: "seed-3",
    familyName: "Équipe Rouergue",
    avatarId: "chouette",
    levelId: "petits",
    treasuresFound: 10,
    stars: 30,
    score: 1280,
    completed: true,
    updatedAt: "2026-11-17T16:05:00.000Z",
  },
  {
    id: "seed-4",
    familyName: "Famille Bonal",
    avatarId: "renard",
    levelId: "aventuriers",
    treasuresFound: 8,
    stars: 22,
    score: 1020,
    completed: false,
    updatedAt: "2026-11-19T14:15:00.000Z",
  },
  {
    id: "seed-5",
    familyName: "Tribu des Rousselleries",
    avatarId: "loutre",
    levelId: "petits",
    treasuresFound: 7,
    stars: 20,
    score: 890,
    completed: false,
    updatedAt: "2026-11-19T10:50:00.000Z",
  },
];

let leaderboardCache: LeaderboardEntry[] | null = null;

function loadLeaderboard(): LeaderboardEntry[] {
  if (leaderboardCache) return leaderboardCache;
  try {
    if (fs.existsSync(LEADERBOARD_FILE)) {
      const raw = fs.readFileSync(LEADERBOARD_FILE, "utf8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        leaderboardCache = parsed;
        return leaderboardCache;
      }
    }
  } catch {
    // Fallback to default seed data if disk read fails
  }
  leaderboardCache = [...DEFAULT_LEADERBOARD];
  return leaderboardCache;
}

function saveLeaderboard(entries: LeaderboardEntry[]): void {
  leaderboardCache = entries;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LEADERBOARD_FILE, JSON.stringify(entries, null, 2), "utf8");
  } catch {
    // Safe fallback to in-memory cache if filesystem is read-only
  }
}

function sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.stars !== a.stars) return b.stars - a.stars;
    if (b.treasuresFound !== a.treasuresFound) return b.treasuresFound - a.treasuresFound;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

function jsonResponse(request: Request, body: unknown, status = 200): Response {
  const isHttps =
    new URL(request.url).protocol === "https:" ||
    request.headers.get("x-forwarded-proto") === "https";
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...buildSecurityHeaders(isHttps),
    },
  });
}

function toWebRequest(req: NodeIncomingReq): Request {
  const proto =
    (typeof req.headers["x-forwarded-proto"] === "string" &&
      req.headers["x-forwarded-proto"].split(",")[0].trim()) ||
    "http";
  const host =
    (typeof req.headers["x-forwarded-host"] === "string" &&
      req.headers["x-forwarded-host"].split(",")[0].trim()) ||
    req.headers.host ||
    `localhost:${PORT}`;
  const fullUrl = `${proto}://${host}${req.url || "/"}`;

  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) {
    if (typeof v === "string") {
      headers.set(k, v);
    } else if (Array.isArray(v)) {
      headers.set(k, v.join(", "));
    }
  }

  const method = (req.method || "GET").toUpperCase();
  const hasBody = method !== "GET" && method !== "HEAD";
  const init: RequestInit & { duplex?: "half" } = {
    method,
    headers,
  };
  if (hasBody) {
    init.body = stream.Readable.toWeb(
      req as unknown as Parameters<typeof stream.Readable.toWeb>[0],
    ) as unknown as ReadableStream<Uint8Array>;
    init.duplex = "half";
  }
  return new Request(fullUrl, init);
}

async function sendWebResponse(res: NodeServerRes, webRes: Response): Promise<void> {
  res.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  if (!webRes.body) {
    res.end();
    return;
  }
  const buf = Buffer.from(await webRes.arrayBuffer());
  res.end(buf);
}

const MIME_BY_EXT: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function tryServeStaticFile(req: NodeIncomingReq, res: NodeServerRes, rootDir: string): boolean {
  if (req.method !== "GET" && req.method !== "HEAD") return false;
  const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  const cleanRel = urlPath === "/" ? "index.html" : urlPath.replace(/^\/+/, "");
  const resolved = path.resolve(rootDir, cleanRel);
  if (!resolved.startsWith(path.resolve(rootDir))) {
    return false;
  }
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    return false;
  }
  const ext = path.extname(resolved).toLowerCase();
  res.statusCode = 200;
  res.setHeader("content-type", MIME_BY_EXT[ext] || "application/octet-stream");
  res.setHeader("x-content-type-options", "nosniff");
  if (ext === ".png" || ext === ".jpg" || ext === ".ico") {
    res.setHeader("cache-control", "public, max-age=3600");
  }
  if (req.method === "HEAD") {
    res.end();
    return true;
  }
  fs.createReadStream(resolved).pipe(res as unknown as NodeJS.WritableStream);
  return true;
}

export async function startServer(customPort?: number) {
  async function handleApiRequest(request: Request): Promise<Response> {
    const reqUrl = new URL(request.url);

    try {
      if (reqUrl.pathname === "/api/health") {
        return jsonResponse(request, { ok: true, app: "pont-de-salars" });
      }

      if (reqUrl.pathname === "/api/leaderboard") {
        if (request.method === "GET") {
          const entries = sortLeaderboard(loadLeaderboard()).slice(0, 40);
          return jsonResponse(request, { ok: true, entries });
        }

        if (request.method === "POST") {
          const parsed = await readBoundedJsonBody(request, 16_384);
          if (!parsed.ok) {
            return jsonResponse(request, { ok: false, error: parsed.error }, parsed.status);
          }
          const raw = parsed.data;
          const id = sanitizePlainText(raw.id, 48, true) || `team-${Date.now()}`;
          const familyName = sanitizePlainText(raw.familyName, 40, true);
          if (!familyName) {
            return jsonResponse(request, { ok: false, error: "Nom de famille requis." }, 400);
          }

          const avatarRaw = sanitizePlainText(raw.avatarId, 16, true);
          const avatarId: LeaderboardEntry["avatarId"] =
            avatarRaw === "chouette" || avatarRaw === "loutre" ? avatarRaw : "renard";

          const levelRaw = sanitizePlainText(raw.levelId, 16, true);
          const levelId: LeaderboardEntry["levelId"] =
            levelRaw === "petits" || levelRaw === "grands" || levelRaw === "experts"
              ? levelRaw
              : "aventuriers";

          const seriesRaw = sanitizePlainText(raw.seriesId, 16, true);
          const seriesId: LeaderboardEntry["seriesId"] =
            seriesRaw === "pimentee" ? "pimentee" : "decouverte";

          const treasuresFound = Math.max(
            0,
            Math.min(10, Math.round(Number(raw.treasuresFound) || 0)),
          );
          const stars = Math.max(0, Math.min(30, Math.round(Number(raw.stars) || 0)));
          const score = Math.max(0, Math.min(5000, Math.round(Number(raw.score) || 0)));
          const completed = treasuresFound >= 10 || Boolean(raw.completed);

          const entries = [...loadLeaderboard()];
          const existingIdx = entries.findIndex((e) => e.id === id);
          const nextEntry: LeaderboardEntry = {
            id,
            familyName,
            avatarId,
            levelId,
            seriesId,
            treasuresFound,
            stars,
            score,
            completed,
            updatedAt: new Date().toISOString(),
          };

          if (existingIdx >= 0) {
            entries[existingIdx] = nextEntry;
          } else {
            entries.push(nextEntry);
          }

          const sorted = sortLeaderboard(entries).slice(0, 60);
          saveLeaderboard(sorted);
          return jsonResponse(request, { ok: true, entry: nextEntry, entries: sorted.slice(0, 40) });
        }

        return jsonResponse(request, { ok: false, error: "Method not allowed." }, 405);
      }

      return jsonResponse(request, { ok: false, error: "Not found." }, 404);
    } catch (err) {
      safeLogError("api_unhandled", err);
      return jsonResponse(request, { ok: false, error: "Internal server error." }, 500);
    }
  }

  const isProd = process.env.NODE_ENV === "production";
  const distDir = path.join(__dirname, "dist");
  const publicDir = path.join(__dirname, "public");

  const httpServer = http.createServer();

  let viteMiddleware: ((req: NodeIncomingReq, res: NodeServerRes, next: () => void) => void) | null =
    null;

  if (!isProd || !fs.existsSync(path.join(distDir, "index.html"))) {
    const vite = await createViteServer({
      root: __dirname,
      server: {
        middlewareMode: true,
        hmr: { server: httpServer },
        allowedHosts: true,
      },
      appType: "spa",
    });
    viteMiddleware = vite.middlewares as unknown as (
      req: NodeIncomingReq,
      res: NodeServerRes,
      next: () => void,
    ) => void;
  }

  httpServer.on("request", async (req: NodeIncomingReq, res: NodeServerRes) => {
    const urlPath = (req.url || "/").split("?")[0];

    if (urlPath.startsWith("/api/")) {
      const webReq = toWebRequest(req);
      const webRes = await handleApiRequest(webReq);
      await sendWebResponse(res, webRes);
      return;
    }

    if (viteMiddleware) {
      viteMiddleware(req, res, () => {
        if (!res.headersSent) {
          res.statusCode = 404;
          res.end("Not Found");
        }
      });
      return;
    }

    if (tryServeStaticFile(req, res, distDir)) return;
    if (tryServeStaticFile(req, res, publicDir)) return;

    const indexPath = path.join(distDir, "index.html");
    if (fs.existsSync(indexPath)) {
      res.statusCode = 200;
      res.setHeader("content-type", "text/html; charset=utf-8");
      fs.createReadStream(indexPath).pipe(res as unknown as NodeJS.WritableStream);
      return;
    }
    res.statusCode = 404;
    res.end("Not Found");
  });

  const listenPort = customPort ?? PORT;
  await new Promise<void>((resolve) => {
    httpServer.listen(listenPort, HOST, () => {
      console.log(`À l'aventure à Pont-de-Salars listening on http://${HOST}:${listenPort}`);
      resolve();
    });
  });

  return {
    httpServer,
    close: () =>
      new Promise<void>((resolve) => {
        httpServer.close(() => resolve());
      }),
  };
}

const isMainModule =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(url.fileURLToPath(import.meta.url));

if (isMainModule) {
  void startServer();
}
