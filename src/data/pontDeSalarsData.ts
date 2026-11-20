export type AvatarId = "renard" | "chouette" | "loutre";
export type LevelId = "petits" | "aventuriers" | "grands" | "experts";
export type SeriesId = "decouverte" | "pimentee";
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
  shortTitle: string;
  ageRange: string;
  description: string;
  pointMultiplier: number;
}

export interface QuestionSeriesInfo {
  id: SeriesId;
  title: string;
  subtitle: string;
  description: string;
  bonusPerFastAnswer: number;
}

export interface LevelRiddle {
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  twistLabel?: string;
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
  spicyIntro: string;
  treasureName: string;
  badgeTitle: string;
  heritageFact: string;
  riddles: Record<LevelId, LevelRiddle>;
  spicyRiddles: Record<LevelId, LevelRiddle>;
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

export const QUESTION_SERIES: QuestionSeriesInfo[] = [
  {
    id: "decouverte",
    title: "Série 1 · Grande Découverte",
    subtitle: "Classique · 10 étapes",
    description:
      "Le grand parcours familial pour explorer le bourg, les commerces et les rives du lac à votre rythme.",
    bonusPerFastAnswer: 0,
  },
  {
    id: "pimentee",
    title: "Série 2 · Défis Pimentés",
    subtitle: "Nouvelle série · Pièges & Chrono",
    description:
      "40 nouvelles énigmes corsées du Farfadet : fausses pistes, devinettes d'observation, chrono éclair (+20 pts) et bonus sans faute !",
    bonusPerFastAnswer: 20,
  },
];

export const LEVELS: DifficultyLevel[] = [
  {
    id: "petits",
    title: "Les petits explorateurs",
    shortTitle: "Petits (4-7)",
    ageRange: "4 à 7 ans",
    description: "Énigmes visuelles et ludiques, indices simples à lire en famille.",
    pointMultiplier: 1,
  },
  {
    id: "aventuriers",
    title: "Les aventuriers",
    shortTitle: "Aventuriers",
    ageRange: "8 à 12 ans",
    description: "Observation des lieux, spécialités aveyronnaises et défis malins.",
    pointMultiplier: 1.15,
  },
  {
    id: "grands",
    title: "Les grands explorateurs",
    shortTitle: "Grands",
    ageRange: "Ados et adultes",
    description: "Patrimoine du Lévézou, gastronomie et secrets d'histoire locale.",
    pointMultiplier: 1.3,
  },
  {
    id: "experts",
    title: "Maîtres du Lévézou",
    shortTitle: "Maîtres",
    ageRange: "Défi corsé",
    description: "4 choix, pièges du Farfadet, chrono bonus (+20 pts) et multiplicateur 1,5x.",
    pointMultiplier: 1.5,
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
    spicyIntro:
      "Alerte au centre-bourg ! Le Farfadet a brouillé les panneaux et glissé de faux indices dans la rue. Gardez l'œil vif et déjouez son premier piège !",
    treasureName: "La Boussole de la Place",
    badgeTitle: "Œil de Lynx du Bourg",
    heritageFact:
      "Situé à environ 730 m d'altitude sur le plateau du Lévézou, le centre de Pont-de-Salars s'anime toute l'année autour de ses commerces de proximité.",
    riddles: {
      petits: {
        question:
          "En vous promenant devant les vitrines du centre, quel animal porte un chapeau ou une couronne sur l'affiche du jeu des commerçants ?",
        options: ["Un éléphant bleu", "Un petit renard malicieux", "Un poisson rouge"],
        correctIndex: 1,
        hint: "C'est un animal roux à longue queue qui vit dans les bois de l'Aveyron !",
        explanation: "Bravo ! Le renard explorateur vous met sur la piste des 10 trésors du village.",
      },
      aventuriers: {
        question:
          "Regardez bien les façades du centre : quel matériau traditionnel de l'Aveyron recouvre souvent les toits et les anciens murs du bourg ?",
        options: [
          "Des plaques de bambou tressé",
          "Du corail blanc de Méditerranée",
          "La lauze ou la tuile et le granit du pays",
        ],
        correctIndex: 2,
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
      experts: {
        question:
          "À quelle altitude approximative se trouve le bourg de Pont-de-Salars sur le plateau du Lévézou ?",
        options: ["Environ 210 mètres", "Environ 480 mètres", "Environ 730 mètres", "Environ 1 420 mètres"],
        correctIndex: 2,
        hint: "On est déjà en moyenne montagne, bien au-dessus de la vallée du Tarn.",
        explanation: "Exact ! Pont-de-Salars culmine autour de 730 mètres d'altitude.",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Devinette piégée",
        question:
          "Le Farfadet dit : « Sur la place du village, je suis rond, je rafraîchis les oiseaux l'été et l'eau y danse parfois. » Qui suis-je ?",
        options: ["Un toboggan en neige", "Une fontaine", "Un panier à linge"],
        correctIndex: 1,
        hint: "On y trouve souvent de l'eau claire au milieu des places de village !",
        explanation: "Bien joué ! Pas facile de piéger vos yeux d'explorateurs.",
      },
      aventuriers: {
        twistLabel: "Défi calcul du bourg",
        question:
          "Roux le Renard compte 4 vitrines sur le trottoir de gauche, chacune avec 3 affiches. Léon en voit 2 de moins à droite. Combien d'affiches en tout ?",
        options: ["14 affiches", "22 affiches", "18 affiches", "26 affiches"],
        correctIndex: 1,
        hint: "À gauche : 4 × 3 = 12. À droite : 12 − 2 = 10. Additionnez les deux !",
        explanation: "12 + 10 = 22 affiches ! Calcul éclair validé.",
      },
      grands: {
        twistLabel: "Vrai ou Faux piégé",
        question:
          "Le Farfadet affirme que Pont-de-Salars est la sous-préfecture de l'Aveyron avec Millau et Villefranche-de-Rouergue. Est-ce vrai ?",
        options: [
          "Oui, depuis 1952 lors de la mise en eau du lac",
          "Non, Rodez est préfecture et la ville se trouve dans son arrondissement",
          "Oui, mais uniquement pendant la saison estivale",
          "Non, le village appartient au département du Tarn",
        ],
        correctIndex: 1,
        hint: "Rodez n'est qu'à une vingtaine de minutes au nord-ouest !",
        explanation: "Piège déjoué ! Pont-de-Salars dépend bien de l'arrondissement de Rodez.",
      },
      experts: {
        twistLabel: "Code postal & géographie",
        question:
          "Quel code postal identifie la commune de Pont-de-Salars et ses alentours immédiats sur le Lévézou ?",
        options: ["12110", "12400", "12290", "12850"],
        correctIndex: 2,
        hint: "12110 est vers Aubin/Cransac, 12400 est Saint-Affrique, 12850 est Onet-le-Château...",
        explanation: "12290 ! C'est le code postal de Pont-de-Salars, Arques, Canet-de-Salars et Le Vibal.",
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
    spicyIntro:
      "Attention, gourmandise sous haute surveillance ! Le Farfadet a caché deux faux ingrédients dans la recette du boulanger. Saurez-vous trier le vrai du faux ?",
    treasureName: "La Couronne de Fouace Dorée",
    badgeTitle: "Apprenti Boulanger",
    heritageFact:
      "La fouace aveyronnaise est une brioche traditionnelle parfumée à la fleur d'oranger, souvent en forme de couronne, partagée en famille depuis des générations.",
    riddles: {
      petits: {
        question:
          "Quelle délicieuse brioche en forme de couronne sent bon la fleur d'oranger chez le boulanger ?",
        options: ["La pizza aux anchois", "La fouace", "La soupe de cailloux"],
        correctIndex: 1,
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
        options: ["Le kouign-amann", "Le canelé bordelais", "Le gâteau à la broche"],
        correctIndex: 2,
        hint: "Sa forme conique hérissée rappelle un sapin doré cuit à la flamme.",
        explanation: "Bravo ! Le gâteau à la broche demande patience et savoir-faire artisanal.",
      },
      experts: {
        question:
          "Traditionnellement, dans quelle région voisine de l'Aveyron trouve-t-on une autre fouace très proche, parfois cuite en pain plat ou en couronne ?",
        options: [
          "En Alsace-Moselle",
          "Dans le Rouergue et l'Auvergne voisine (Cantal)",
          "Dans le Cotentin normand",
          "Dans les Flandres maritimes",
        ],
        correctIndex: 1,
        hint: "Cherchez juste au nord de l'Aubrac et de l'Aveyron !",
        explanation: "Parfait ! Le Rouergue et la Haute-Auvergne partagent cette tradition briochée ancestrale.",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Chasse à l'intrus",
        question:
          "Pour préparer une bonne fouace dorée, le boulanger utilise des œufs, du beurre, de la farine… Mais quel ingrédient N'EST PAS dans la recette ?",
        options: ["Du sucre", "De la fleur d'oranger", "De la moutarde forte"],
        correctIndex: 2,
        hint: "Un de ces trois goûts piquerait drôlement la langue au goûter !",
        explanation: "Ouf ! Pas de moutarde dans la fouace, le boulanger est sauvé.",
      },
      aventuriers: {
        twistLabel: "Énigme du fournil",
        question:
          "À 6h30, la fournée compte 18 fouaces. Une famille en achète un tiers, puis un client en prend 4. Combien en reste-t-il sur l'étal ?",
        options: ["6 fouaces", "8 fouaces", "10 fouaces", "12 fouaces"],
        correctIndex: 1,
        hint: "Un tiers de 18 fait 6. Retirez d'abord 6, puis encore 4 !",
        explanation: "18 − 6 = 12, puis 12 − 4 = 8 fouaces encore tièdes !",
      },
      grands: {
        twistLabel: "Piège du pâtissier",
        question:
          "Pourquoi fait-on souvent cuire un « gâteau à la broche » devant un feu ouvert plutôt que dans un four fermé classique ?",
        options: [
          "Pour faire couler la pâte liquide en stalactites dorées à mesure que la broche tourne",
          "Parce qu'il contient des glaçons qui ne doivent pas fondre",
          "Pour qu'il reste tout plat comme une crêpe dentelle",
          "Uniquement pour cuire la farine sans œufs",
        ],
        correctIndex: 0,
        hint: "Chaque couche versée à la louche se fige à la chaleur et forme des pointes.",
        explanation: "Exact ! C'est ce mouvement rotatif devant la flamme qui crée ses fameuses pointes croustillantes.",
      },
      experts: {
        twistLabel: "Vocabulaire occitan",
        question:
          "D'où vient le mot « fouace » (ou *foaça* en occitan) qui désigne notre brioche aveyronnaise ?",
        options: [
          "Du latin *focacia*, pain cuit sous la cendre ou au foyer (*focus*)",
          "Du nom d'un roi wisigoth de Rodez",
          "D'un ancien moulin à vent de Saint-Georges",
          "Du mot grec désignant le miel de châtaignier",
        ],
        correctIndex: 0,
        hint: "C'est la même racine latine que la focaccia italienne ou la fougasse !",
        explanation: "Bravo maître ! *Focus* (le foyer) a donné *focacia*, puis fougasse et fouace.",
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
    spicyIntro:
      "Le Farfadet a mélangé toutes les caisses à outils de l'atelier ! Reliez vite le bon geste au bon artisan avant qu'il ne referme le coffre.",
    treasureName: "Le Compas du Compagnon",
    badgeTitle: "Curieux des Métiers",
    heritageFact:
      "À Pont-de-Salars et dans tout le Lévézou, menuisiers, tailleurs de pierre, ferronniers et artisans de bouche transmettent des gestes précis.",
    riddles: {
      petits: {
        question:
          "Quel outil utilise l'artisan menuisier pour couper une planche de bois bien droit ?",
        options: ["Une louche à soupe", "Une raquette de tennis", "Une scie"],
        correctIndex: 2,
        hint: "Elle a plein de petites dents en métal et fait « cric-crac » sur le bois !",
        explanation: "Gagné ! Avec une scie et un rabot, le menuisier fabrique portes et meubles.",
      },
      aventuriers: {
        question:
          "Quel artisan travaille la pierre locale avec un ciseau et une massette pour restaurer murets et linteaux ?",
        options: ["Le souffleur de verre", "Le tailleur de pierre", "L'horloger"],
        correctIndex: 1,
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
      experts: {
        question:
          "En Aveyron, comment appelle-t-on l'outil plat et large utilisé par les couvreurs pour tailler et poser les lourdes pierres plates de toiture (lauzes) ?",
        options: [
          "Le bistouri d'ardoise",
          "Le marteau de couvreur (ou asseau / marteau à lauze)",
          "Le rabot à tenon",
          "La navette de tisserand",
        ],
        correctIndex: 1,
        hint: "C'est un marteau spécial dont la panne tranchante sert aussi à fendre et percer la pierre.",
        explanation: "Exact ! Le marteau de couvreur permet de calibrer la lauze directement sur le chantier.",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Qui fait quoi ?",
        question:
          "Cling ! Clang ! Je tape sur du fer rouge avec un gros marteau pour fabriquer des portails et des fers à cheval. Qui suis-je ?",
        options: ["Le forgeron", "Le facteur", "Le maître-nageur"],
        correctIndex: 0,
        hint: "Mon atelier s'appelle une forge et il y a des étincelles !",
        explanation: "Cling-clang ! Le forgeron maîtrise le feu et le métal.",
      },
      aventuriers: {
        twistLabel: "Intrus à l'établi",
        question:
          "Dans la boîte du menuisier, le Farfadet a glissé un outil de maçon. Lequel n'est PAS fait pour travailler le bois ?",
        options: ["Le rabot", "La truelle", "Le ciseau à bois", "L'équerre"],
        correctIndex: 1,
        hint: "On s'en sert pour étaler du mortier ou du ciment entre deux pierres.",
        explanation: "Bien repéré ! La truelle appartient au maçon.",
      },
      grands: {
        twistLabel: "Architecture rurale",
        question:
          "Dans une charpente traditionnelle en chêne du Rouergue, quel assemblage évite d'utiliser des clous métalliques ?",
        options: [
          "Tenon, mortaise et cheville en bois",
          "La soudure à l'étain",
          "La colle de résine de pin seule",
          "Des sangles de cuir bouilli",
        ],
        correctIndex: 0,
        hint: "Une pièce mâle s'emboîte dans un trou rectangulaire, puis une tige de bois verrouille le tout.",
        explanation: "Parfait ! Tenon, mortaise et cheville bois assurent la souplesse et la solidité séculaire.",
      },
      experts: {
        twistLabel: "Chef-d'œuvre d'artisan",
        question:
          "Chez les Compagnons du Tour de France, quel nom porte l'ouvrage complexe que l'aspirant réalise pour devenir Compagnon ?",
        options: [
          "Le brevet d'atelier",
          "Le chef-d'œuvre de réception",
          "La maquette royale",
          "L'épure d'argent",
        ],
        correctIndex: 1,
        hint: "L'expression est même passée dans le langage courant pour désigner une œuvre d'art accomplie !",
        explanation: "C'est bien le « chef-d'œuvre » ! Chaque métier possède ses propres défis techniques.",
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
    spicyIntro:
      "Panier piégé chez Combo by Dia ! Le Farfadet a glissé des fromages d'autres régions dans le panier 100 % Aveyron. À vous de faire le tri !",
    treasureName: "Le Panier du Terroir",
    badgeTitle: "Dénicheur de Saveurs",
    heritageFact:
      "L'Aveyron est réputé pour ses fromages (Roquefort, Laguiole, Pérail), ses charcuteries sèches et ses miels de bruyère du Lévézou.",
    riddles: {
      petits: {
        question:
          "Dans notre panier pique-nique de Pont-de-Salars, quel fromage célèbre de l'Aveyron est fabriqué avec du lait de brebis ?",
        options: ["La barbe à papa", "Le chocolat chaud", "Le Roquefort"],
        correctIndex: 2,
        hint: "C'est un fromage à pâte persillée très célèbre dans tout le pays !",
        explanation: "Bravo ! Le Roquefort est l'un des plus célèbres fromages d'Aveyron.",
      },
      aventuriers: {
        question:
          "Comment s'appelle le petit fromage rond et crémeux au lait de brebis, très apprécié sur du pain frais en Aveyron ?",
        options: ["Le Parmesan", "Le Pérail", "La Feta grecque"],
        correctIndex: 1,
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
      experts: {
        question:
          "En quelle année le Roquefort est-il devenu le tout premier fromage français à obtenir une Appellation d'Origine (ancêtre de l'AOP) ?",
        options: ["En 1789", "En 1875", "En 1925", "En 1968"],
        correctIndex: 2,
        hint: "Cela vient tout juste de fêter son centenaire en 2025 !",
        explanation: "1925 ! Une loi spéciale a consacré le Roquefort comme première appellation fromagère.",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Odeur mystère",
        question:
          "Les abeilles du Lévézou butinent les fleurs violettes des collines pour fabriquer un trésor doré dans un pot. Qu'est-ce que c'est ?",
        options: ["Du miel", "De la colle verte", "De l'huile de moteur"],
        correctIndex: 0,
        hint: "C'est sucré, doré et délicieux sur une tartine ou dans le yaourt !",
        explanation: "Miam ! Le miel de bruyère et de fleurs sauvages du Lévézou est un régal.",
      },
      aventuriers: {
        twistLabel: "Chasse à l'intrus",
        question:
          "Lequel de ces produits NE vient PAS traditionnellement du département de l'Aveyron ?",
        options: [
          "Le Laguiole AOP",
          "Le Roquefort AOP",
          "Le Reblochon de Savoie",
          "Le Pérail",
        ],
        correctIndex: 2,
        hint: "L'un d'entre eux porte le nom d'une célèbre région des Alpes !",
        explanation: "Bien vu ! Le Reblochon est savoyard, les trois autres sont bien aveyronnais.",
      },
      grands: {
        twistLabel: "Caves naturelles",
        question:
          "Quel champignon microscopique naturel donne ses veines bleu-vert caractéristiques au Roquefort dans les caves du Combalou ?",
        options: [
          "Penicillium roqueforti",
          "Boletus edulis (cèpe)",
          "Saccharomyces cerevisiae",
          "Tuber melanosporum (truffe)",
        ],
        correctIndex: 0,
        hint: "Son nom scientifique contient directement le nom du village aveyronnais !",
        explanation: "Exact ! *Penicillium roqueforti* se développe grâce aux courants d'air frais des fleurines.",
      },
      experts: {
        twistLabel: "Label du terroir",
        question:
          "En plus de l'AOP Roquefort et Laguiole, quel fromage de vache à croûte lavée ou fleurie des gorges de la Truyère et du Nord-Aveyron est aussi un AOP ?",
        options: [
          "Le Bleu des Causses",
          "Le Bleu d'Auvergne exclusivement",
          "L'Écume de Salars",
          "La Tomme de Vendée",
        ],
        correctIndex: 0,
        hint: "Son cousin au lait de brebis est le Roquefort, mais lui est au lait de vache et affiné dans les caves calcaires des causses.",
        explanation: "Le Bleu des Causses AOP ! Il complète magnifiquement le plateau des fromages d'Aveyron.",
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
    spicyIntro:
      "Le Farfadet joue les inspecteurs agricoles ! À vous de reconnaître les races locales et les astuces des éleveurs du Lévézou.",
    treasureName: "La Médaille des Producteurs",
    badgeTitle: "Ami des Fermes",
    heritageFact:
      "L'élevage ovin et bovin du Lévézou façonne les prairies verdoyantes autour de Pont-de-Salars et alimente les marchés et magasins locaux.",
    riddles: {
      petits: {
        question:
          "Dans les prés verts autour de Pont-de-Salars, quels animaux produisent le bon lait pour les yaourts et fromages locaux ?",
        options: ["Les girafes", "Les vaches et les brebis", "Les pingouins"],
        correctIndex: 1,
        hint: "On les voit brouter l'herbe dans les collines tout autour du village !",
        explanation: "Bravo ! Les vaches et brebis du Lévézou donnent un lait très parfumé.",
      },
      aventuriers: {
        question:
          "Pourquoi préfère-t-on acheter des produits marqués « Origine Aveyron » ou « Circuit court » lors du pique-nique ?",
        options: [
          "Pour que les légumes viennent en fusée",
          "Pour payer deux fois plus de plastique",
          "Pour soutenir les producteurs voisins et limiter les transports",
        ],
        correctIndex: 2,
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
      experts: {
        question:
          "Quelle race de brebis rustique, majoritaire sur les plateaux aveyronnais, fournit l'essentiel du lait destiné aux filières Roquefort et Pérail ?",
        options: [
          "La brebis Mérinos d'Arles",
          "La brebis Lacaune",
          "La brebis Ouessant",
          "La brebis Texel",
        ],
        correctIndex: 1,
        hint: "Elle porte le nom d'un massif situé juste à la frontière du Tarn et de l'Aveyron !",
        explanation: "La brebis Lacaune ! Reconnaissable à sa tête fine dépourvue de laine et ses grandes oreilles.",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Défi des prés",
        question:
          "Les vaches d'Aubrac ont de jolis yeux tout noirs comme si elles portaient du maquillage. De quelle couleur est leur pelage ?",
        options: ["Vert pomme", "Fauve (marron clair doré)", "À rayures roses"],
        correctIndex: 1,
        hint: "C'est une belle couleur chaude comme la noisette ou le blé doré !",
        explanation: "Super ! Les vaches d'Aubrac sont célèbres pour leur robe fauve et leurs yeux cernés de noir.",
      },
      aventuriers: {
        twistLabel: "Logique du marché",
        question:
          "Si un producteur de Pont-de-Salars vend 250 ml de crème fraîche et 3 petits pots de 100 g de yaourt de brebis, quel label garantit une marque officielle européenne de qualité ?",
        options: [
          "AOP / IGP (Appellation ou Indication Géographique Protégée)",
          "Code barre 000",
          "Étiquette « Super Rapide »",
          "Tampon « Bleu Ciel »",
        ],
        correctIndex: 0,
        hint: "Ces trois lettres garantissent l'origine du territoire et le savoir-faire !",
        explanation: "Exact ! L'Aveyron compte de nombreux produits sous AOP, IGP et Label Rouge.",
      },
      grands: {
        twistLabel: "Saisonnalité du lac",
        question:
          "Dans un panier 100 % local d'été en Aveyron, lequel de ces fruits pousse en abondance dans les vergers du département plutôt que sous les tropiques ?",
        options: [
          "L'ananas",
          "La cerise, la framboise ou la prune",
          "La noix de coco",
          "La mangue sauvage",
        ],
        correctIndex: 1,
        hint: "Les coteaux et jardins du Lévézou regorgent de petits fruits rouges et de vergers !",
        explanation: "Gagné ! Privilégier les fruits de saison locaux rend le pique-nique encore meilleur.",
      },
      experts: {
        twistLabel: "Élevage d'Aveyron",
        question:
          "Quel Label Rouge emblématique distingue une viande jeune élevée sous la mère en plein air dans les fermes du département ?",
        options: [
          "Le Veau d'Aveyron et du Ségala (IGP / Label Rouge)",
          "L'Agneau des Fjords",
          "Le Bœuf de Camargue exclusif",
          "Le Volaille des Dunes",
        ],
        correctIndex: 0,
        hint: "Il associe le nom du département au plateau voisin du Ségala !",
        explanation: "C'est le Veau d'Aveyron et du Ségala, élevé selon un cahier des charges très strict.",
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
    spicyIntro:
      "Coup de chaud en cuisine ! Le Farfadet a remplacé les recettes du chef par des énigmes pimentées. Prouvez que vous connaissez la vraie table aveyronnaise !",
    treasureName: "La Cuillère d'Argent du Chef",
    badgeTitle: "Gourmet de l'Aveyron",
    heritageFact:
      "Les auberges de Pont-de-Salars célèbrent l'aligot, les farçous aux herbes du jardin, le veau d'Aveyron et les truites des rivières.",
    riddles: {
      petits: {
        question:
          "Quel plat rigolo fait de longs fils de fromage fondu avec de la purée de pommes de terre ?",
        options: ["Les spaghettis à la fraise", "L'aligot", "La glace à la vanille"],
        correctIndex: 1,
        hint: "Plus on soulève la cuillère en bois, plus il s'étire comme un ruban !",
        explanation: "Oui, c'est l'aligot ! Un plat chaleureux que toute la famille adore.",
      },
      aventuriers: {
        question:
          "Que sont les « farçous », ces délicieuses petites galettes vertes servies en Aveyron ?",
        options: [
          "Des bonbons à la menthe",
          "Des biscuits secs au chocolat",
          "Des beignets salés aux herbes (blettes, persil) dorés à la poêle",
        ],
        correctIndex: 2,
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
      experts: {
        question:
          "Quelle est la différence majeure entre l'aligot (Aubrac/Aveyron) et la truffade (Auvergne) ?",
        options: [
          "La truffade utilise de la truffe noire à la place du fromage",
          "L'aligot est une purée lisse filante à la tome fraîche ; la truffade est faite de pommes de terre en lamelles rissolées avec du cantal/tome",
          "L'aligot se sert glacé en dessert",
          "Aucune différence, ce sont deux orthographes du même plat",
        ],
        correctIndex: 1,
        hint: "L'un est une purée bien battue, l'autre garde des rondelles de pommes de terre dorées à la poêle !",
        explanation: "Exactement ! Purée filante pour l'aligot, lamelles poêlées pour la truffade.",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Menu rigolo",
        question:
          "Le Farfadet sert un faux menu : « Truite du Viaur, Fouace sucrée, Chaussure grillée, Aligot filant ». Quel plat doit-on vite rayer ?",
        options: ["La Fouace sucrée", "La Chaussure grillée", "L'Aligot filant"],
        correctIndex: 1,
        hint: "On la met aux pieds pour marcher jusqu'au lac, surtout pas dans l'assiette !",
        explanation: "Haha ! Le chef vous remercie d'avoir sauvé le menu du jour.",
      },
      aventuriers: {
        twistLabel: "Défi du chef",
        question:
          "Pour réussir un aligot de compétition, quel geste est INDISPENSABLE avec la cuillère en bois quand la tome fond dans la purée ?",
        options: [
          "Travailler énergiquement de bas en haut pour aérer et étirer le fromage",
          "Laisser reposer au congélateur 3 heures",
          "Ajouter deux litres d'eau glacée",
          "Passer le tout au grille-pain",
        ],
        correctIndex: 0,
        hint: "Il faut de l'huile de coude et soulever la pâte vers le haut !",
        explanation: "Bravo ! C'est ce mouvement soulevé qui forme le fameux ruban élastique.",
      },
      grands: {
        twistLabel: "Patrimoine culinaire",
        question:
          "À l'origine, qu'est-ce que les « tripoux » servis dans de nombreuses auberges traditionnelles d'Aveyron ?",
        options: [
          "Des petits paquets mijotés de panse de veau ou d'agneau farcie, cuits longuement en sauce parfumée",
          "Trois boules de sorbet aux myrtilles",
          "Des tartines grillées à l'ail et au miel",
          "Une soupe froide de châtaignes",
        ],
        correctIndex: 0,
        hint: "Un plat rustique emblématique que certains amateurs dégustent même dès le matin lors des foires !",
        explanation: "Bien joué ! Les tripoux font partie des grands classiques des foires aveyronnaises.",
      },
      experts: {
        twistLabel: "Histoire d'auberge",
        question:
          "Selon la tradition historique, qui préparait autrefois l'ancêtre de l'aligot (« aliquid ») pour réconforter les pèlerins traversant l'Aubrac ?",
        options: [
          "Les moines de la Domerie d'Aubrac (au départ avec du pain, puis avec des pommes de terre)",
          "Les marins du port de Sète",
          "Les mineurs de Decazeville au XXe siècle",
          "Les troupes romaines de Jules César",
        ],
        correctIndex: 0,
        hint: "Les pèlerins de Saint-Jacques-de-Compostelle faisaient halte dans ce grand hôpital monastique d'altitude !",
        explanation: "Exact ! La Domerie d'Aubrac servait *aliquid* (« quelque chose ») aux voyageurs transis de froid.",
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
    spicyIntro:
      "Sur le pont du Viaur, le courant murmure une énigme plus coriace ! Observez bien l'eau, les pierres et la direction de la rivière.",
    treasureName: "La Clé d'Or des Arches",
    badgeTitle: "Gardien du Viaur",
    heritageFact:
      "La rivière du Viaur prend sa source dans le Lévézou et a donné son nom à Pont-de-Salars, lieu de passage historique entre les rives.",
    riddles: {
      petits: {
        question:
          "Comment s'appelle la jolie rivière qui passe sous les arches en pierre du pont du village ?",
        options: ["La Seine", "Le Viaur", "Le Nil"],
        correctIndex: 1,
        hint: "Son nom est court et commence par la lettre V !",
        explanation: "Bravo ! Le Viaur chante sous le pont avant de rejoindre le Tarn plus loin.",
      },
      aventuriers: {
        question:
          "Pourquoi les bâtisseurs d'autrefois construisaient-ils des ponts avec des arches arrondies en pierre ?",
        options: [
          "Pour faire joli sur les cartes postales uniquement",
          "Pour empêcher les poissons de nager",
          "Pour répartir le poids vers les piliers et résister aux crues",
        ],
        correctIndex: 2,
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
      experts: {
        question:
          "Plus en aval dans sa vallée, dans quelle autre rivière majeure le Viaur finit-il par se jeter près de Laguépie ?",
        options: ["La Loire", "L'Aveyron", "Le Lot", "La Garonne"],
        correctIndex: 1,
        hint: "Elle porte exactement le nom de notre département !",
        explanation: "Exact ! Le Viaur est un affluent de l'Aveyron (qui rejoint ensuite le Tarn).",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Observation au bord de l'eau",
        question:
          "Quand on lance une toute petite feuille depuis le pont, dans quel sens part-elle sur le Viaur ?",
        options: [
          "Elle s'envole dans les nuages",
          "Elle suit le courant vers l'aval (le bas de la rivière)",
          "Elle remonte toute seule vers la source",
        ],
        correctIndex: 1,
        hint: "L'eau coule toujours du haut vers le bas !",
        explanation: "Bien observé ! La feuille voyage au fil de l'eau vers l'aval.",
      },
      aventuriers: {
        twistLabel: "Piège d'architecture",
        question:
          "Regardez les piliers d'un vieux pont en pierre dans l'eau : pourquoi leur côté face au courant est-il souvent pointu (avant-bec) ?",
        options: [
          "Pour fendre l'eau et dévier les troncs d'arbres lors des crues",
          "Pour que les grenouilles fassent du toboggan",
          "Pour accrocher des guirlandes de Noël",
          "Pour cacher des trésors sous l'eau",
        ],
        correctIndex: 0,
        hint: "Comme la proue d'un bateau, la pointe coupe le courant !",
        explanation: "Gagné ! Les avant-becs triangulaires protègent le pont contre la force de l'eau.",
      },
      grands: {
        twistLabel: "Géographie fluviale",
        question:
          "Sur quel massif voisin du Lévézou la rivière Viaur prend-elle sa source avant de traverser Pont-de-Salars ?",
        options: [
          "Dans le massif du Lévézou lui-même, sur la commune de Vézins-de-Lévézou (Puech du Pal)",
          "Dans les Pyrénées ariégeoises",
          "Dans le Mont-Blanc",
          "Au bord de l'Atlantique",
        ],
        correctIndex: 0,
        hint: "Sa source est tout près d'ici, sur les hauteurs orientales du plateau du Lévézou !",
        explanation: "Exact ! Le Viaur naît à plus de 1 000 m d'altitude au pied du Puech du Pal, sur le Lévézou.",
      },
      experts: {
        twistLabel: "Défi du génie civil",
        question:
          "Beaucoup plus loin en aval entre Tarn et Aveyron, quel célèbre ouvrage métallique de l'ingénieur Paul Bodin franchit le Viaur à 116 m de hauteur ?",
        options: [
          "Le Viaduc de Millau",
          "Le Viaduc du Viaur (ligne Carmaux-Rodez)",
          "Le Pont du Gard",
          "Le Viaduc de Garabit",
        ],
        correctIndex: 1,
        hint: "Il porte le nom de la rivière elle-même et fut achevé en 1902 pour le train !",
        explanation: "Le Viaduc du Viaur ! Un chef-d'œuvre d'acier en arc articulé (cantilever) de 1902.",
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
    spicyIntro:
      "Arrivés là-haut, reprenez votre souffle ! Le Farfadet garde les vieilles pierres de Salars avec des devinettes d'histoire et de panorama.",
    treasureName: "Le Sceau de la Colline",
    badgeTitle: "Veilleur du Patrimoine",
    heritageFact:
      "La chapelle de Salars témoigne de l'ancien village perché originel et offre un point de vue remarquable sur le Lévézou.",
    riddles: {
      petits: {
        question:
          "Tout en haut du toit de la chapelle, que fait-on sonner pour prévenir les habitants lors des fêtes ?",
        options: ["Une trompette de plage", "Un réveil-matin géant", "La cloche"],
        correctIndex: 2,
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
          "Une flèche gothique de 140 mètres",
          "Un clocher-mur (ou clocher-peigne) ajouré",
          "Un minaret en brique vernissée",
        ],
        correctIndex: 1,
        hint: "La cloche est logée directement dans une baie au sommet du mur de façade.",
        explanation: "Exact ! Le clocher-peigne est caractéristique de nombreuses chapelles de l'Aveyron.",
      },
      experts: {
        question:
          "Dans l'ancien Rouergue médiéval, comment désignait-on une haute pierre levée ou une croix de pierre sculptée plantée aux carrefours des chemins ruraux ?",
        options: [
          "Une croix de chemin (ou croix discoïdale / de rogations)",
          "Un phare côtier",
          "Un beffroi flamand",
          "Une borie provençale",
        ],
        correctIndex: 0,
        hint: "On en croise encore beaucoup au bord des vieux chemins autour de Salars et du Lévézou !",
        explanation: "Exact ! Les croix de chemin jalonnaient les parcours de pèlerins et les limites de paroisses.",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Panorama magique",
        question:
          "Depuis la colline de la chapelle, si vous regardez tout autour de vous, que voit-on principalement à perte de vue ?",
        options: [
          "Des gratte-ciels de 100 étages",
          "Les collines vertes, les toits du village et le lac",
          "Un désert de cactus géants",
        ],
        correctIndex: 1,
        hint: "C'est le beau paysage vert et bleu de Pont-de-Salars !",
        explanation: "Bravo ! Depuis Salars, la vue sur le plateau du Lévézou est magnifique.",
      },
      aventuriers: {
        twistLabel: "Chasse aux indices de pierre",
        question:
          "De quel côté du ciel se lève le soleil le matin quand vous observez la chapelle et la vallée ?",
        options: ["À l'Ouest", "Au Sud", "À l'Est", "Tout droit vers le Nord"],
        correctIndex: 2,
        hint: "Pensez au moyen mnémotechnique : on s'oriente vers l'Orient…",
        explanation: "À l'Est ! Et le soir il se couche à l'Ouest.",
      },
      grands: {
        twistLabel: "Histoire des pierres",
        question:
          "Pourquoi beaucoup d'anciens édifices ruraux du Lévézou ont-ils des murs très épais et de petites ouvertures ?",
        options: [
          "Pour conserver la chaleur l'hiver face au vent du plateau et renforcer la solidité du granit",
          "Parce que le verre transparent n'avait pas encore été découvert en France",
          "Pour empêcher le son des cloches de sortir",
          "Uniquement pour économiser la peinture blanche",
        ],
        correctIndex: 0,
        hint: "À plus de 730 m d'altitude, l'hiver plateau peut être venteux et frais !",
        explanation: "Bien vu ! L'inertie de la pierre et les fenêtres étroites protègent du vent et du froid.",
      },
      experts: {
        twistLabel: "Toponymie du Rouergue",
        question:
          "Que désigne le terme ancien « puech » (ou *puèg* en occitan) fréquent dans les noms de collines du Lévézou ?",
        options: [
          "Une source souterraine chaude",
          "Un sommet arrondi, une colline ou une butte",
          "Un pont en bois flottant",
          "Une prairie marécageuse",
        ],
        correctIndex: 1,
        hint: "On le retrouve dans Le Puy-en-Velay ou le Puech du Pal tout proche !",
        explanation: "Du latin *podium*, « puech » signifie colline ou éminence — tout à fait adapté à notre plateau.",
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
    spicyIntro:
      "Dernier virage avant la plage ! Le Farfadet teste vos talents d'ingénieurs du lac avec des chiffres et des secrets de barrage.",
    treasureName: "La Turbine Cristalline",
    badgeTitle: "Ingénieur du Lac",
    heritageFact:
      "Mis en service en 1952 sur le Viaur, le barrage de Pont-de-Salars retient un lac de près de 190 hectares destiné à la production hydroélectrique et aux loisirs.",
    riddles: {
      petits: {
        question:
          "Grâce à l'eau retenue par le grand barrage du lac, qu'est-ce qu'on fabrique pour allumer les lampes des maisons ?",
        options: ["De la confiture de framboise", "Du papier journal", "De l'électricité"],
        correctIndex: 2,
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
          "Les canaux royaux du Midi",
          "Le complexe hydroélectrique des lacs du Lévézou",
          "Les lagunes naturelles du Golfe du Lion",
        ],
        correctIndex: 1,
        hint: "Ces grands lacs artificiels des années 1950 sont reliés entre eux pour produire de l'électricité.",
        explanation: "Parfait ! Les lacs du Lévézou forment un vaste réseau hydroélectrique et touristique.",
      },
      experts: {
        question:
          "En quelle année le barrage de Pont-de-Salars sur le Viaur a-t-il été mis en service ?",
        options: ["En 1912", "En 1952", "En 1978", "En 1998"],
        correctIndex: 1,
        hint: "Juste après la Seconde Guerre mondiale, au début des années 1950 !",
        explanation: "1952 ! Comme Pareloup et Bage, il fait partie du grand chantier hydroélectrique du Lévézou.",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Défi de la goutte d'eau",
        question:
          "Pour faire tourner la grande turbine sous l'eau, de quoi le barrage a-t-il besoin ?",
        options: [
          "De la force de l'eau qui descend",
          "De 1 000 ballons de baudruche",
          "D'un grand sèche-cheveux",
        ],
        correctIndex: 0,
        hint: "C'est l'eau du lac qui pousse les pales en descendant dans les tuyaux !",
        explanation: "Oui ! La force de l'eau fait tourner la turbine comme un moulin moderne.",
      },
      aventuriers: {
        twistLabel: "Chiffre choc du lac",
        question:
          "Le lac de Pont-de-Salars couvre environ 190 hectares. Sachant qu'1 hectare vaut à peu près la taille d'un grand terrain de foot, le lac équivaut à combien de terrains ?",
        options: [
          "Environ 15 terrains",
          "Environ 190 terrains de foot",
          "Environ 2 500 terrains",
          "Seulement 2 terrains",
        ],
        correctIndex: 1,
        hint: "1 hectare = environ 1 grand terrain de sport… la réponse est cachée dans la question !",
        explanation: "Eh oui, près de 190 terrains de foot d'eau bleue et de nature !",
      },
      grands: {
        twistLabel: "Ingénierie hydraulique",
        question:
          "Quelle pièce tournante entraîne l'alternateur à l'intérieur d'une centrale hydroélectrique pour transformer la force de l'eau en courant ?",
        options: ["La turbine", "Le carburateur", "La boussole aimantée", "Le gouvernail"],
        correctIndex: 0,
        hint: "Son nom commence comme « tourbillon » et c'est aussi le nom de notre trésor #9 !",
        explanation: "La turbine ! Elle convertit l'énergie mécanique de l'eau en rotation électrique.",
      },
      experts: {
        twistLabel: "Réseau du Lévézou",
        question:
          "Vers quel grand lac voisin l'eau du complexe du Lévézou est-elle notamment pompée ou conduite avant de chuter vers l'usine du Pouget dans la vallée du Tarn ?",
        options: [
          "Le lac de Pareloup",
          "Le lac du Salagou (Hérault)",
          "Le lac de Vassivière",
          "Le lac d'Annecy",
        ],
        correctIndex: 0,
        hint: "C'est le plus grand lac du Lévézou (~1 260 ha), juste au sud-est de Pont-de-Salars !",
        explanation: "Le lac de Pareloup ! L'eau de Bage et Pont-de-Salars participe à ce système ingénieux vers le Pouget.",
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
    spicyIntro:
      "Ultime épreuve au bord du lac ! Le Farfadet joue son va-tout sur les rives des Rousselleries. Débloquez ce 10e trésor pour décrocher votre diplôme !",
    treasureName: "Le Diamant des Rousselleries",
    badgeTitle: "Grand Explorateur de Pont-de-Salars",
    heritageFact:
      "La plage aménagée des Rousselleries offre baignade, canoë et balades au bord du lac, avec les sentiers menant vers Saint-Georges-de-Camboulas.",
    riddles: {
      petits: {
        question:
          "Au bord de la plage des Rousselleries, quelle activité calme et amusante permet de glisser sur le lac sans bruit ?",
        options: ["Le camion de pompiers", "Le canoë ou le paddle", "Le patin à glace"],
        correctIndex: 1,
        hint: "On utilise une rame ou une pagaie pour avancer doucement sur l'eau bleue !",
        explanation: "Hourra ! Les 10 trésors de Pont-de-Salars sont réunis. Votre diplôme vous attend !",
      },
      aventuriers: {
        question:
          "En explorant les abords du lac du côté des Rousselleries vers Saint-Georges-de-Camboulas, comment protéger ce bel endroit naturel ?",
        options: [
          "Laisser ses emballages sous les arbres",
          "Cueillir toutes les fleurs rares du rivage",
          "Rester sur les sentiers balisés et remporter tous ses déchets",
        ],
        correctIndex: 2,
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
      experts: {
        question:
          "Avant d'être l'espace de baignade et de loisirs actuel autour de Pont-de-Salars, quel était le statut de Saint-Georges-de-Camboulas dans l'histoire locale ?",
        options: [
          "Une ancienne commune rattachée à Pont-de-Salars dès le XIXe siècle",
          "Un port de pêche construit en 1995",
          "Une station de ski alpin",
          "Une île volcanique du plateau",
        ],
        correctIndex: 0,
        hint: "Son clocher et ses hameaux existaient bien avant la création du lac en 1952.",
        explanation: "Exact ! Saint-Georges-de-Camboulas fut rattaché à la commune de Pont-de-Salars au XIXe siècle.",
      },
    },
    spicyRiddles: {
      petits: {
        twistLabel: "Bouquetin final !",
        question:
          "Sur la plage des Rousselleries, quel oiseau adore plonger dans l'eau ou glisser sur le lac au coucher du soleil ?",
        options: ["Un canard colvert", "Une autruche", "Un manchot empereur"],
        correctIndex: 0,
        hint: "Il fait « Coin-coin ! » et a souvent une belle tête verte brillante !",
        explanation: "Coin-coin ! Le 10e coffre s'ouvre en grand. Bravo à toute la famille !",
      },
      aventuriers: {
        twistLabel: "Règle d'or de la plage",
        question:
          "Sur une plage de lac surveillée l'été aux Rousselleries, quelle couleur de drapeau signifie que la baignade est surveillée et sans danger particulier ?",
        options: ["Drapeau vert", "Drapeau violet à pois jaunes", "Drapeau noir", "Drapeau gris"],
        correctIndex: 0,
        hint: "C'est exactement la même couleur que « feu passe » !",
        explanation: "Drapeau vert = baignade surveillée ! Rouge = interdit, jaune = danger.",
      },
      grands: {
        twistLabel: "Grand quiz du parcours",
        question:
          "En additionnant l'ordre des 3 étapes nature/patrimoine autour de l'eau (Pont #7 + Barrage #9 + Rousselleries #10), quel score symbolique obtient-on ?",
        options: ["22", "24", "26", "30"],
        correctIndex: 2,
        hint: "7 + 9 + 10 = …",
        explanation: "26 ! Toute la famille garde le cap jusqu'au bout du parcours.",
      },
      experts: {
        twistLabel: "Défi final du Lévézou",
        question:
          "Parmi ces 4 lacs du Lévézou, lequel est situé le plus directement sur le cours de la rivière Viaur juste à la sortie du bourg de Pont-de-Salars ?",
        options: [
          "Le lac de Pareloup (sur le Vioulou)",
          "Le lac de Pont-de-Salars",
          "Le lac de Villefranche-de-Panat (sur l'Alrance)",
          "Le lac de la Gourde-Noire",
        ],
        correctIndex: 1,
        hint: "Bage est sur le ruisseau du Bage, Pareloup sur le Vioulou, Villefranche sur l'Alrance…",
        explanation: "Le lac de Pont-de-Salars, bien sûr ! Vous maîtrisez la géographie du Lévézou sur le bout des doigts.",
      },
    },
  },
];

export const PARTNER_SHOPS = ADVENTURE_STOPS.filter((s) => s.partnerName);

export function getStopRiddle(
  stop: AdventureStop,
  seriesId: SeriesId = "decouverte",
  levelId: LevelId = "aventuriers",
): LevelRiddle {
  const bank = seriesId === "pimentee" ? stop.spicyRiddles : stop.riddles;
  return bank[levelId] ?? bank.aventuriers;
}
