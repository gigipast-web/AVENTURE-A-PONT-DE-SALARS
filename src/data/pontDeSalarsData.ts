export type AvatarId = "renard" | "chouette" | "loutre";
export type LevelId = "petits" | "aventuriers" | "grands";
export type StopCategory = "commerce" | "patrimoine" | "nature";

export interface CharacterAvatar {
  id: AvatarId;
  name: string;
  role: string;
  tagline: string;
  image: string;
  greeting: string;
}

export interface DifficultyLevel {
  id: LevelId;
  title: string;
  ageRange: string;
  description: string;
  pointMultiplier: number;
}

export interface LevelRiddle {
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export interface AdventureStop {
  id: string;
  order: number;
  name: string;
  shortName: string;
  category: StopCategory;
  categoryLabel: string;
  missionSummary: string;
  partnerName?: string;
  vitrineCode?: string;
  vitrineHint?: string;
  /** Pourcentages sur la carte illustrée (0-100) */
  mapX: number;
  mapY: number;
  storyIntro: string;
  treasureName: string;
  badgeTitle: string;
  heritageFact: string;
  riddles: Record<LevelId, LevelRiddle>;
}

import avatarChouetteImg from "../assets/images/avatar_chouette_savante_1795179667926.jpg";
import avatarLoutreImg from "../assets/images/avatar_loutre_viaur_1795179667224.jpg";
import avatarRenardImg from "../assets/images/avatar_renard_explorateur_1795179668796.jpg";
import heroPontDeSalarsImg from "../assets/images/hero_pont_de_salars_1795179668576.jpg";
import mapPontDeSalarsImg from "../assets/images/map_pont_de_salars_1795179667841.jpg";

export const HERO_IMAGE = heroPontDeSalarsImg;
export const MAP_IMAGE = mapPontDeSalarsImg;

export const AVATARS: CharacterAvatar[] = [
  {
    id: "renard",
    name: "Roux le Renard",
    role: "Pisteur des sentiers",
    tagline: "Malin et curieux, il repère chaque détail caché dans les vitrines du centre.",
    image: avatarRenardImg,
    greeting: "Suivez ma trace ! On m'a dit que le premier indice brille sur la place du village.",
  },
  {
    id: "chouette",
    name: "Céleste la Chouette",
    role: "Gardienne du patrimoine",
    tagline: "Avec ses lunettes dorées, elle connaît tous les secrets de la chapelle et du pont.",
    image: avatarChouetteImg,
    greeting: "Ouvrons grand les yeux : chaque pierre et chaque recette raconte une histoire du Lévézou.",
  },
  {
    id: "loutre",
    name: "Léon la Loutre",
    role: "Navigateur du Viaur",
    tagline: "Toujours boussole en patte, il guide la famille du centre-bourg jusqu'au lac.",
    image: avatarLoutreImg,
    greeting: "Cap sur le Viaur et les Rousselleries ! Prêts pour la grande chasse aux 10 trésors ?",
  },
];

export const LEVELS: DifficultyLevel[] = [
  {
    id: "petits",
    title: "Les petits explorateurs",
    ageRange: "4 à 7 ans",
    description: "Énigmes visuelles et ludiques, indices simples à lire en famille.",
    pointMultiplier: 1,
  },
  {
    id: "aventuriers",
    title: "Les aventuriers",
    ageRange: "8 à 12 ans",
    description: "Observation des lieux, spécialités aveyronnaises et défis malins.",
    pointMultiplier: 1.15,
  },
  {
    id: "grands",
    title: "Les grands explorateurs",
    ageRange: "Ados et adultes",
    description: "Patrimoine du Lévézou, gastronomie et secrets d'histoire locale.",
    pointMultiplier: 1.3,
  },
];

export const ADVENTURE_STOPS: AdventureStop[] = [
  {
    id: "centre-village",
    order: 1,
    name: "Le Centre du Village & Commerces",
    shortName: "Centre & Vitrines",
    category: "commerce",
    categoryLabel: "Commerce du centre",
    missionSummary: "Retrouver un détail dans une vitrine et lancer la quête",
    partnerName: "Commerçants du Centre-Bourg",
    vitrineCode: "SALARS1",
    vitrineHint: "Cherchez l'affichette « Trésor #1 » collée en bas d'une vitrine de la rue principale.",
    mapX: 56,
    mapY: 49,
    storyIntro:
      "Le mystérieux Farfadet du Viaur vient de passer par la place centrale ! Avant de s'échapper, il a laissé une piste dans les vitrines des boutiques du bourg.",
    treasureName: "La Boussole de la Place",
    badgeTitle: "Œil de Lynx du Bourg",
    heritageFact:
      "Situé à environ 730 m d'altitude sur le plateau du Lévézou, le centre de Pont-de-Salars s'anime toute l'année autour de ses commerces de proximité.",
    riddles: {
      petits: {
        question:
          "En vous promenant devant les vitrines du centre, quel animal porte un chapeau ou une couronne sur l'affiche du jeu des commerçants ?",
        options: ["Un petit renard malicieux", "Un éléphant bleu", "Un poisson rouge"],
        correctIndex: 0,
        hint: "C'est un animal roux à longue queue qui vit dans les bois de l'Aveyron !",
        explanation: "Bravo ! Le renard explorateur vous met sur la piste des 10 trésors du village.",
      },
      aventuriers: {
        question:
          "Regardez bien les façades des commerces du centre : quel matériau traditionnel de l'Aveyron recouvre souvent les toits et les anciens murs du bourg ?",
        options: [
          "La lauze ou la tuile et le granit du pays",
          "Des plaques de bambou tressé",
          "Du corail blanc de Méditerranée",
        ],
        correctIndex: 0,
        hint: "Les maisons anciennes du Lévézou sont bâties avec la roche locale très solide.",
        explanation: "Exact ! Le granit et l'ardoise/lauze donnent tout leur caractère aux villages du Lévézou.",
      },
      grands: {
        question:
          "Pont-de-Salars appartient à un grand plateau aveyronnais célèbre pour ses lacs et ses villages ruraux vivants. Quel est son nom ?",
        options: ["Le plateau du Lévézou", "Le plateau des Mille Étangs", "Le causse du Larzac"],
        correctIndex: 0,
        hint: "Ce plateau relie Rodez aux gorges du Tarn et abrite cinq grands lacs.",
        explanation: "Parfait ! Pont-de-Salars est l'une des portes d'entrée emblématiques du Lévézou.",
      },
    },
  },
  {
    id: "boulangerie-roumieux",
    order: 2,
    name: "Boulangerie Yoann Roumieux",
    shortName: "Boulangerie Roumieux",
    category: "commerce",
    categoryLabel: "Commerce partenaire",
    missionSummary: "Retrouver le nom d'une spécialité boulangère aveyronnaise",
    partnerName: "Boulangerie Yoann Roumieux",
    vitrineCode: "FOUACE2",
    vitrineHint: "Repérez la carte dorée près du comptoir à pains ou sur la vitrine des spécialités.",
    mapX: 50,
    mapY: 56,
    storyIntro:
      "Hum… quelle bonne odeur de pain chaud et de beurre ! Le Farfadet s'est arrêté ici pour goûter une brioche en couronne bien connue en Aveyron.",
    treasureName: "La Couronne de Fouace Dorée",
    badgeTitle: "Apprenti Boulanger",
    heritageFact:
      "La fouace aveyronnaise est une brioche traditionnelle parfumée à la fleur d'oranger, souvent en forme de couronne, partagée en famille depuis des générations.",
    riddles: {
      petits: {
        question:
          "Quelle délicieuse brioche en forme de couronne sent bon la fleur d'oranger chez le boulanger ?",
        options: ["La fouace", "La pizza aux anchois", "La soupe de cailloux"],
        correctIndex: 0,
        hint: "Son nom commence par « Fou… » et rime avec « glace » !",
        explanation: "Miam ! La fouace est la brioche star des goûters en famille à Pont-de-Salars.",
      },
      aventuriers: {
        question:
          "Quel ingrédient parfume traditionnellement la vraie fouace aveyronnaise de nos boulangers ?",
        options: [
          "L'eau de fleur d'oranger",
          "Le piment d'Espelette",
          "La menthe poivrée",
        ],
        correctIndex: 0,
        hint: "C'est une fleur blanche très parfumée utilisée en pâtisserie douce.",
        explanation: "Bien joué ! La fleur d'oranger donne à la fouace son parfum unique.",
      },
      grands: {
        question:
          "Outre la fouace, quelle pâtisserie festive aveyronnaise cuit lentement couche par couche sur un cône tournant devant la flamme ?",
        options: ["Le gâteau à la broche", "Le kouign-amann", "Le canelé bordelais"],
        correctIndex: 0,
        hint: "Sa forme conique hérissée rappelle un sapin doré cuit à la flamme.",
        explanation: "Bravo ! Le gâteau à la broche demande patience et savoir-faire artisanal.",
      },
    },
  },
  {
    id: "artisans-village",
    order: 3,
    name: "L'Atelier des Artisans",
    shortName: "Les Artisans",
    category: "commerce",
    categoryLabel: "Savoir-faire local",
    missionSummary: "Découvrir un métier d'artisanat du village",
    partnerName: "Artisans de Pont-de-Salars",
    vitrineCode: "OUTIL3",
    vitrineHint: "Cherchez le mot-code inscrit sur la plaque « Amis des Artisans ».",
    mapX: 64,
    mapY: 44,
    storyIntro:
      "Un coffre cadenassé attend devant l'atelier ! Seul un artisan du village connaît la clé des matières : bois, pierre, fer ou laine.",
    treasureName: "Le Compas du Compagnon",
    badgeTitle: "Curieux des Métiers",
    heritageFact:
      "À Pont-de-Salars et dans tout le Lévézou, menuisiers, tailleurs de pierre, ferronniers et artisans de bouche transmettent des gestes précis.",
    riddles: {
      petits: {
        question:
          "Quel outil utilise l'artisan menuisier pour couper une planche de bois bien droit ?",
        options: ["Une scie", "Une louche à soupe", "Une raquette de tennis"],
        correctIndex: 0,
        hint: "Elle a plein de petites dents en métal et fait « cric-crac » sur le bois !",
        explanation: "Gagné ! Avec une scie et un rabot, le menuisier fabrique portes et meubles.",
      },
      aventuriers: {
        question:
          "Quel artisan travaille la pierre locale avec un ciseau et une massette pour restaurer murets et linteaux ?",
        options: ["Le tailleur de pierre", "Le souffleur de verre", "Le horloger"],
        correctIndex: 0,
        hint: "Son métier porte directement le nom du matériau qu'il sculpte.",
        explanation: "Exact ! Les tailleurs de pierre façonnent le granit et le grès du Rouergue.",
      },
      grands: {
        question:
          "Dans la tradition des artisans du bâtiment en France, comment appelle-t-on le réseau historique de transmission des savoir-faire par le voyage ?",
        options: [
          "Le Compagnonnage (Tour de France)",
          "La Guilde des Navigateurs",
          "L'Académie des Bâtisseurs de Mer",
        ],
        correctIndex: 0,
        hint: "On parle souvent des « Compagnons du Devoir ».",
        explanation: "Tout juste ! Le Compagnonnage forme encore aujourd'hui de nombreux artisans d'excellence.",
      },
    },
  },
  {
    id: "combo-by-dia",
    order: 4,
    name: "Combo by Dia",
    shortName: "Combo by Dia",
    category: "commerce",
    categoryLabel: "Commerce partenaire",
    missionSummary: "Découvrir un produit du terroir aveyronnais",
    partnerName: "Combo by Dia — Pont-de-Salars",
    vitrineCode: "TERROIR4",
    vitrineHint: "Regardez le rayon des saveurs locales ou l'affiche près de l'entrée.",
    mapX: 69,
    mapY: 52,
    storyIntro:
      "Dans les rayons du magasin, le Farfadet a mélangé les étiquettes du panier pique-nique de la famille ! Retrouvez l'authentique produit du terroir.",
    treasureName: "Le Panier du Terroir",
    badgeTitle: "Dénicheur de Saveurs",
    heritageFact:
      "L'Aveyron est réputé pour ses fromages (Roquefort, Laguiole, Pérail), ses charcuteries sèches et ses miels de bruyère du Lévézou.",
    riddles: {
      petits: {
        question:
          "Dans notre panier pique-nique de Pont-de-Salars, quel fromage célèbre de l'Aveyron est fabriqué avec du lait de brebis ?",
        options: ["Le Roquefort", "La barbe à papa", "Le chocolat chaud"],
        correctIndex: 0,
        hint: "C'est un fromage à pâte persillée très célèbre dans tout le pays !",
        explanation: "Bravo ! Le Roquefort est l'un des plus célèbres fromages d'Aveyron.",
      },
      aventuriers: {
        question:
          "Comment s'appelle le petit fromage rond et crémeux au lait de brebis, très apprécié sur du pain frais en Aveyron ?",
        options: ["Le Pérail", "Le Parmesan", "La Feta grecque"],
        correctIndex: 0,
        hint: "Son nom commence par « Pé… » et rime avec « corail ».",
        explanation: "Superbe trouvaille ! Le Pérail est un incontournable des tables du Rouergue.",
      },
      grands: {
        question:
          "Quel fromage AOP au lait cru de vache d'Aubrac ou Simmental permet de réussir un véritable aligot filant ?",
        options: [
          "La tome fraîche de Laguiole",
          "Le camembert affiné",
          "La ricotta salée",
        ],
        correctIndex: 0,
        hint: "On la récolte juste avant le pressage final du fromage de Laguiole.",
        explanation: "Exact ! Sans tome fraîche jeune, impossible d'obtenir le long fil caractéristique de l'aligot.",
      },
    },
  },
  {
    id: "intermarche",
    order: 5,
    name: "Intermarché Pont-de-Salars",
    shortName: "Intermarché",
    category: "commerce",
    categoryLabel: "Commerce partenaire",
    missionSummary: "Résoudre une énigme sur les produits locaux",
    partnerName: "Intermarché Pont-de-Salars",
    vitrineCode: "LOCAL5",
    vitrineHint: "Cherchez le panneau « Circuit Court Aveyron » à l'accueil ou dans la galerie.",
    mapX: 76,
    mapY: 41,
    storyIntro:
      "Halte ravitaillement ! Le Farfadet vous met au défi de reconnaître ce que produisent les fermes des environs avant de filer vers le lac.",
    treasureName: "La Médaille des Producteurs",
    badgeTitle: "Ami des Fermes",
    heritageFact:
      "L'élevage ovin et bovin du Lévézou façonne les prairies verdoyantes autour de Pont-de-Salars et alimente les marchés et magasins locaux.",
    riddles: {
      petits: {
        question:
          "Dans les prés verts autour de Pont-de-Salars, quels animaux produisent le bon lait pour les yaourts et fromages locaux ?",
        options: ["Les vaches et les brebis", "Les girafes", "Les pingouins"],
        correctIndex: 0,
        hint: "On les voit brouter l'herbe dans les collines tout autour du village !",
        explanation: "Bravo ! Les vaches et brebis du Lévézou donnent un lait très parfumé.",
      },
      aventuriers: {
        question:
          "Pourquoi préfère-t-on acheter des produits marqués « Origine Aveyron » ou « Circuit court » lors du pique-nique ?",
        options: [
          "Pour soutenir les producteurs voisins et limiter les transports",
          "Pour que les légumes viennent en fusée",
          "Pour payer deux fois plus de plastique",
        ],
        correctIndex: 0,
        hint: "Cela aide directement les agriculteurs et artisans proches de Pont-de-Salars.",
        explanation: "Exactement ! Le circuit court valorise les fermes locales et garantit la fraîcheur.",
      },
      grands: {
        question:
          "Dans les fermes du Lévézou, quelle spécialité fromagère fraîche à base de caillé de brebis sert à garnir la célèbre tarte appelée « flaune » ?",
        options: ["La recuite", "La burrata", "Le mascarpone"],
        correctIndex: 0,
        hint: "Son nom vient du fait que le petit-lait est « recuit » pour obtenir une pâte douce.",
        explanation: "Bien vu ! La flaune à la recuite de brebis est un dessert emblématique du Sud-Aveyron et du Lévézou.",
      },
    },
  },
  {
    id: "restaurants-gastronomie",
    order: 6,
    name: "Auberge & Restaurants du Centre",
    shortName: "Restaurants",
    category: "commerce",
    categoryLabel: "Gastronomie aveyronnaise",
    missionSummary: "Répondre à une question sur la gastronomie aveyronnaise",
    partnerName: "Tables & Restaurants de Pont-de-Salars",
    vitrineCode: "ALIGOT6",
    vitrineHint: "Demandez ou lisez l'ardoise du menu « Spécialités de l'Aveyron » en terrasse.",
    mapX: 59,
    mapY: 60,
    storyIntro:
      "À table les explorateurs ! Le Farfadet a caché un trésor sous une cloche de cuisine. Devinez le secret des cuisiniers aveyronnais pour l'ouvrir.",
    treasureName: "La Cuillère d'Argent du Chef",
    badgeTitle: "Gourmet de l'Aveyron",
    heritageFact:
      "Les auberges de Pont-de-Salars célèbrent l'aligot, les farçous aux herbes du jardin, le veau d'Aveyron et les truites des rivières.",
    riddles: {
      petits: {
        question:
          "Quel plat rigolo fait de longs fils de fromage fondu avec de la purée de pommes de terre ?",
        options: ["L'aligot", "Les spaghettis à la fraise", "La glace à la vanille"],
        correctIndex: 0,
        hint: "Plus on soulève la cuillère en bois, plus il s'étire comme un ruban !",
        explanation: "Oui, c'est l'aligot ! Un plat chaleureux que toute la famille adore.",
      },
      aventuriers: {
        question:
          "Que sont les « farçous », ces délicieuses petites galettes vertes servies en Aveyron ?",
        options: [
          "Des beignets salés aux herbes (blettes, persil) dorés à la poêle",
          "Des bonbons à la menthe",
          "Des biscuits secs au chocolat",
        ],
        correctIndex: 0,
        hint: "On les prépare avec des blettes, du persil, des œufs et un peu de farine.",
        explanation: "Bravo ! Les farçous sont parfaits chauds ou tièdes au marché.",
      },
      grands: {
        question:
          "Quelle expression occitane ou culinaire décrit l'action de « filer » l'aligot à la spatule jusqu'à ce qu'il forme un ruban continu ?",
        options: ["Le ruban de l'Aubrac", "La danse de la truffade", "Le fil du Viaur"],
        correctIndex: 0,
        hint: "On l'appelle « faire le ruban » en hommage au plateau voisin de l'Aubrac.",
        explanation: "Parfait ! Réussir « le ruban » demande un tour de main énergique avec une spatule en bois.",
      },
    },
  },
  {
    id: "pont-sur-le-viaur",
    order: 7,
    name: "Le Pont sur le Viaur",
    shortName: "Pont sur le Viaur",
    category: "patrimoine",
    categoryLabel: "Patrimoine & Rivière",
    missionSummary: "Observer le pont historique et percer le secret de la rivière",
    mapX: 42,
    mapY: 66,
    storyIntro:
      "Nous voici au bord de l'eau ! Le vieux pont en pierre veille sur le Viaur qui traverse le village. Penchez-vous pour observer ses arches.",
    treasureName: "La Clé d'Or des Arches",
    badgeTitle: "Gardien du Viaur",
    heritageFact:
      "La rivière du Viaur prend sa source dans le Lévézou et a donné son nom à Pont-de-Salars, lieu de passage historique entre les rives.",
    riddles: {
      petits: {
        question:
          "Comment s'appelle la jolie rivière qui passe sous les arches en pierre du pont du village ?",
        options: ["Le Viaur", "La Seine", "Le Nil"],
        correctIndex: 0,
        hint: "Son nom est court et commence par la lettre V !",
        explanation: "Bravo ! Le Viaur chante sous le pont avant de rejoindre le Tarn plus loin.",
      },
      aventuriers: {
        question:
          "Pourquoi les bâtisseurs d'autrefois construisaient-ils des ponts avec des arches arrondies en pierre ?",
        options: [
          "Pour répartir le poids vers les piliers et résister aux crues",
          "Pour faire joli sur les cartes postales uniquement",
          "Pour empêcher les poissons de nager",
        ],
        correctIndex: 0,
        hint: "La forme en voûte dirige la force sur les côtés et rend le pont très solide.",
        explanation: "Exact ! La voûte en pierre traverse les siècles malgré le courant.",
      },
      grands: {
        question:
          "Étymologiquement, que rappelle le nom « Pont-de-Salars » dans l'histoire locale ?",
        options: [
          "Le franchissement du Viaur au pied de l'ancien bourg castral de Salars",
          "Un pont suspendu bâti au XXIe siècle",
          "Un ancien port maritime du Moyen Âge",
        ],
        correctIndex: 0,
        hint: "Le village ancien était perché tout près, autour de Salars.",
        explanation: "Juste ! Le pont sur le Viaur a permis le développement du bourg en contrebas de Salars.",
      },
    },
  },
  {
    id: "chapelle-de-salars",
    order: 8,
    name: "La Chapelle de Salars",
    shortName: "Chapelle de Salars",
    category: "patrimoine",
    categoryLabel: "Monument historique",
    missionSummary: "Grimper observer la chapelle et son panorama sur la vallée",
    mapX: 20,
    mapY: 20,
    storyIntro:
      "Sur la hauteur, la silhouette paisible de la chapelle domine tout le paysage. Le Farfadet a gravé une énigme près du vieux clocher.",
    treasureName: "Le Sceau de la Colline",
    badgeTitle: "Veilleur du Patrimoine",
    heritageFact:
      "La chapelle de Salars témoigne de l'ancien village perché originel et offre un point de vue remarquable sur le Lévézou.",
    riddles: {
      petits: {
        question:
          "Tout en haut du toit de la chapelle, que fait-on sonner pour prévenir les habitants lors des fêtes ?",
        options: ["La cloche", "Une trompette de plage", "Un réveil-matin géant"],
        correctIndex: 0,
        hint: "Elle fait « Ding ! Dong ! » dans le clocher-mur.",
        explanation: "Ding-dong ! Vous avez trouvé le trésor de la colline de Salars.",
      },
      aventuriers: {
        question:
          "Autrefois, pourquoi choisissait-on souvent une colline comme celle de Salars pour bâtir une chapelle ou un château ?",
        options: [
          "Pour voir arriver les voyageurs de loin et se protéger",
          "Pour être plus proche des nuages de pluie",
          "Parce qu'il n'y avait pas de pierre dans la vallée",
        ],
        correctIndex: 0,
        hint: "Depuis le sommet, on surveille toute la vallée et les chemins.",
        explanation: "Bien observé ! La vue panoramique servait de poste d'observation naturel.",
      },
      grands: {
        question:
          "Quel élément architectural typique des églises rurales du Rouergue retrouve-t-on souvent sur les petites chapelles comme Salars ?",
        options: [
          "Un clocher-mur (ou clocher-peigne) ajouré",
          "Une flèche gothique de 140 mètres",
          "Un minaret en brique vernissée",
        ],
        correctIndex: 0,
        hint: "La cloche est logée directement dans une baie au sommet du mur de façade.",
        explanation: "Exact ! Le clocher-peigne est caractéristique de nombreuses chapelles de l'Aveyron.",
      },
    },
  },
  {
    id: "barrage-et-lac",
    order: 9,
    name: "Le Barrage & Le Lac de Pont-de-Salars",
    shortName: "Barrage & Lac",
    category: "nature",
    categoryLabel: "Eau & Énergie",
    missionSummary: "Comprendre le secret du barrage et de l'eau du lac",
    mapX: 71,
    mapY: 78,
    storyIntro:
      "Face à l'immense mur courbe du barrage, le vent souffle sur le lac bleu. Le Farfadet s'amuse à regarder l'eau produire de l'électricité propre !",
    treasureName: "La Turbine Cristalline",
    badgeTitle: "Ingénieur du Lac",
    heritageFact:
      "Mis en service en 1952 sur le Viaur, le barrage de Pont-de-Salars retient un lac de près de 190 hectares destiné à la production hydroélectrique et aux loisirs.",
    riddles: {
      petits: {
        question:
          "Grâce à l'eau retenue par le grand barrage du lac, qu'est-ce qu'on fabrique pour allumer les lampes des maisons ?",
        options: ["De l'électricité", "De la confiture de framboise", "Du papier journal"],
        correctIndex: 0,
        hint: "L'eau fait tourner de grandes roues cachées qui fabriquent de l'énergie !",
        explanation: "Bravo ! C'est l'énergie hydraulique : propre et renouvelable.",
      },
      aventuriers: {
        question:
          "Quelle forme particulière a le barrage de Pont-de-Salars pour mieux résister à la poussée de l'eau du lac ?",
        options: [
          "Une forme courbe en voûte",
          "Une forme en escalier de bois",
          "Un pont-levis en carton",
        ],
        correctIndex: 0,
        hint: "Comme une coquille d'œuf, l'arc appuie contre les rochers sur les côtés.",
        explanation: "Gagné ! Le barrage-voûte transfère la pression de l'eau sur les rives rocheuses.",
      },
      grands: {
        question:
          "À quelle grande famille d'aménagements du plateau appartient le lac de Pont-de-Salars avec Pareloup et Villefranche-de-Panat ?",
        options: [
          "Le complexe hydroélectrique des lacs du Lévézou",
          "Les canaux royaux du Midi",
          "Les lagunes naturelles du Golfe du Lion",
        ],
        correctIndex: 0,
        hint: "Ces grands lacs artificiels des années 1950 sont reliés entre eux pour produire de l'électricité.",
        explanation: "Parfait ! Les lacs du Lévézou forment un vaste réseau hydroélectrique et touristique.",
      },
    },
  },
  {
    id: "rousselleries-saint-georges",
    order: 10,
    name: "Plage des Rousselleries & Saint-Georges-de-Camboulas",
    shortName: "Rousselleries & Camboulas",
    category: "nature",
    categoryLabel: "Étape finale",
    missionSummary: "Dernier trésor au bord de l'eau face à Saint-Georges-de-Camboulas",
    mapX: 87,
    mapY: 69,
    storyIntro:
      "Dernière étape les amis ! Sur le sable doré de la plage des Rousselleries, face au hameau de Saint-Georges-de-Camboulas, brille le 10e et dernier coffre du village.",
    treasureName: "Le Diamant des Rousselleries",
    badgeTitle: "Grand Explorateur de Pont-de-Salars",
    heritageFact:
      "La plage aménagée des Rousselleries offre baignade, canoë et balades au bord du lac, avec les sentiers menant vers Saint-Georges-de-Camboulas.",
    riddles: {
      petits: {
        question:
          "Au bord de la plage des Rousselleries, quelle activité calme et amusante permet de glisser sur le lac sans bruit ?",
        options: ["Le canoë ou le paddle", "Le camion de pompiers", "Le patin à glace"],
        correctIndex: 0,
        hint: "On utilise une rame ou une pagaie pour avancer doucement sur l'eau bleue !",
        explanation: "Hourra ! Les 10 trésors de Pont-de-Salars sont réunis. Votre diplôme vous attend !",
      },
      aventuriers: {
        question:
          "En explorant les abords du lac du côté des Rousselleries vers Saint-Georges-de-Camboulas, comment protéger ce bel endroit naturel ?",
        options: [
          "Rester sur les sentiers balisés et remporter tous ses déchets",
          "Laisser ses emballages sous les arbres",
          "Cueillir toutes les fleurs rares du rivage",
        ],
        correctIndex: 0,
        hint: "Un vrai explorateur laisse la nature aussi propre qu'à son arrivée.",
        explanation: "Félicitations ! Vous avez réuni les 10 trésors avec l'esprit d'un vrai explorateur.",
      },
      grands: {
        question:
          "Quel village ou hameau voisin, rattaché au territoire de Pont-de-Salars et mentionné dans notre parcours lacustre, borde la rive près des sentiers ?",
        options: [
          "Saint-Georges-de-Camboulas",
          "Saint-Malo-sur-Mer",
          "Saint-Véran-en-Queyras",
        ],
        correctIndex: 0,
        hint: "Son nom associe Saint-Georges à Camboulas !",
        explanation: "Bravo ! Vous achevez la grande boucle entre centre-bourg, patrimoine et rives du lac.",
      },
    },
  },
];

export const PARTNER_SHOPS = ADVENTURE_STOPS.filter((s) => s.partnerName);
