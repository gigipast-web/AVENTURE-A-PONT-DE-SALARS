import noelPontDeSalarsImg from "../assets/images/noel_pont_de_salars_1795200710390.jpg";

export const CHRISTMAS_HERO_IMAGE = noelPontDeSalarsImg;

export type ChristmasLevelId = "lutins" | "rennes";

export interface ChristmasLevelInfo {
  id: ChristmasLevelId;
  title: string;
  ageRange: string;
  description: string;
  multiplier: number;
}

export interface ChristmasRiddle {
  id: string;
  ornamentName: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export const CHRISTMAS_LEVELS: ChristmasLevelInfo[] = [
  {
    id: "lutins",
    title: "Petits Lutins",
    ageRange: "4 à 9 ans",
    description: "Questions joyeuses sur le Père Noël, les rennes et la magie du sapin.",
    multiplier: 1,
  },
  {
    id: "rennes",
    title: "Rennes Experts",
    ageRange: "10 ans et adultes",
    description: "Traditions de Noël en Aveyron, chants d'hiver et défis malins (4 choix).",
    multiplier: 1.3,
  },
];

export const CHRISTMAS_QUESTIONS: Record<ChristmasLevelId, ChristmasRiddle[]> = {
  lutins: [
    {
      id: "lutin-1",
      ornamentName: "Étoile dorée du sommet",
      question:
        "Quel renne célèbre du Père Noël a un grand nez rouge lumineux pour éclairer la nuit enneigée ?",
      options: ["Blanche-Neige", "Rudolphe", "Léon le Poisson"],
      correctIndex: 1,
      hint: "Son nom commence par la lettre R !",
      explanation: "Bravo ! Rudolphe guide le traîneau même dans les nuits les plus brumeuses.",
    },
    {
      id: "lutin-2",
      ornamentName: "Boule rouge écarlate",
      question:
        "Quel arbre reste tout vert même sous la neige en hiver et reçoit boules et guirlandes à Noël ?",
      options: ["Le sapin", "Le bananier", "Le cactus"],
      correctIndex: 0,
      hint: "Il sent bon la forêt et garde ses aiguilles toute l'année !",
      explanation: "Exact ! Le sapin est le roi de la fête de Noël.",
    },
    {
      id: "lutin-3",
      ornamentName: "Sucre d'orge rayé",
      question:
        "Quelle friandise blanche et rouge en forme de petite canne accroche-t-on souvent aux branches du sapin ?",
      options: ["Un cornichon", "Une carotte", "Un sucre d'orge"],
      correctIndex: 2,
      hint: "Elle est sucrée, rayée rouge et blanc, et rappelle un bâton de berger !",
      explanation: "Miam ! Le sucre d'orge décore le sapin avant d'être croqué.",
    },
    {
      id: "lutin-4",
      ornamentName: "Clochette dorée",
      question:
        "Dans la célèbre chanson de Noël, que demande-t-on au Père Noël quand « il descendra du ciel avec des jouets par milliers » ?",
      options: [
        "D'apporter des bottes de pluie",
        "De ne pas oublier notre petit soulier",
        "De réparer le vélo du voisin",
      ],
      correctIndex: 1,
      hint: "On les pose sagement au pied du sapin ou devant la cheminée !",
      explanation: "Oui ! « N'oublie pas mon petit soulier… »",
    },
    {
      id: "lutin-5",
      ornamentName: "Flocon scintillant",
      question:
        "Quand la neige tombe sur le pont de Pont-de-Salars, combien de branches principales possède un vrai flocon de neige ?",
      options: ["6 branches", "2 branches", "15 branches"],
      correctIndex: 0,
      hint: "C'est le même nombre que les faces d'un dé ou les pattes d'une abeille !",
      explanation: "Parfait ! Chaque flocon de neige forme un cristal unique à 6 branches.",
    },
    {
      id: "lutin-6",
      ornamentName: "Chaussette de cheminée",
      question:
        "Qui aide le Père Noël toute l'année à fabriquer et emballer les cadeaux dans son grand atelier ?",
      options: ["Les dinosaures", "Les lutins", "Les pirates"],
      correctIndex: 1,
      hint: "Ce sont de petits personnages malicieux aux chapeaux pointus avec grelots !",
      explanation: "Bravo ! Les lutins travaillent dans la bonne humeur jusqu'au 24 décembre.",
    },
    {
      id: "lutin-7",
      ornamentName: "Boule dorée du lac",
      question:
        "Quel bonhomme rigolo fabrique-t-on avec trois boules de neige, deux cailloux pour les yeux et une carotte ?",
      options: ["Un bonhomme de sable", "Un bonhomme de neige", "Un épouvantail d'été"],
      correctIndex: 1,
      hint: "On lui met souvent une écharpe chaude et un chapeau sur la tête !",
      explanation: "Super ! Le bonhomme de neige veille sur le village pendant l'hiver.",
    },
    {
      id: "lutin-8",
      ornamentName: "Ruban des cadeaux",
      question:
        "Quel gâteau roulé traditionnel en forme de morceau de bois mange-t-on en dessert pour le réveillon de Noël ?",
      options: ["La bûche de Noël", "La tarte aux poireaux", "La crêpe au fromage"],
      correctIndex: 0,
      hint: "Son nom rappelle le bois qu'on mettait autrefois dans la cheminée !",
      explanation: "Hourra ! Votre sapin brille de toutes ses décorations de Noël !",
    },
  ],
  rennes: [
    {
      id: "renne-1",
      ornamentName: "Étoile dorée du sommet",
      question:
        "Dans la tradition du Sud de la France et de l'Occitanie voisine, combien de desserts symboliques sert-on parfois sur la table de Noël ?",
      options: ["Les 3 desserts", "Les 7 desserts", "Les 13 desserts", "Les 24 desserts"],
      correctIndex: 2,
      hint: "On retrouve ce nombre avec la pompe à l'huile, les noix, figues, amandes et raisins secs.",
      explanation: "Exact ! Les 13 desserts symbolisent la Cène (Jésus et les douze apôtres).",
    },
    {
      id: "renne-2",
      ornamentName: "Boule rouge écarlate",
      question:
        "Avant les arbres de Noël modernes, quelle coutume ancienne consistait en Aveyron et dans les campagnes à faire brûler une grosse souche la nuit du 24 décembre ?",
      options: [
        "La bûche de Noël (la *còfa* ou *tison de Nadal*)",
        "Le feu de la Saint-Jean",
        "La lampe à huile de mars",
        "Le brasier des moissons",
      ],
      correctIndex: 0,
      hint: "Elle portait chance pour l'année suivante et a donné son nom à notre célèbre gâteau !",
      explanation: "Tout juste ! La bûche pâtissière perpétue le souvenir de cette grosse bûche de foyer.",
    },
    {
      id: "renne-3",
      ornamentName: "Sucre d'orge rayé",
      question:
        "Dans le poème célèbre de 1823 attribué à Clement Clarke Moore, combien de rennes tirent à l'origine le traîneau du Père Noël (avant l'arrivée de Rudolphe) ?",
      options: ["4 rennes", "6 rennes", "8 rennes", "12 rennes"],
      correctIndex: 2,
      hint: "Tornade, Danseur, Furie, Fringant, Comète, Cupidon, Tonnerre et Éclair…",
      explanation: "8 rennes ! Rudolphe s'y est ajouté bien plus tard, en 1939.",
    },
    {
      id: "renne-4",
      ornamentName: "Clochette dorée",
      question:
        "Comment dit-on traditionnellement « Joyeux Noël » en langue occitane (parlée autrefois dans tout le Rouergue) ?",
      options: ["Bòn jorn", "Bon Nadal", "Adieu siatz", "Mercés plan"],
      correctIndex: 1,
      hint: "Le second mot commence par N et vient du latin *Natalis* (la naissance).",
      explanation: "Bon Nadal ! Une belle formule occitane encore entendue sur les marchés d'hiver.",
    },
    {
      id: "renne-5",
      ornamentName: "Flocon scintillant",
      question:
        "Pourquoi les anciennes boules de Noël artisanales (comme à Meisenthal) étaient-elles soufflées en verre plutôt qu'en plastique ?",
      options: [
        "Elles remplaçaient les pommes rouges venues à manquer lors d'une sécheresse en 1858",
        "Pour pouvoir flotter sur les rivières gelées",
        "Parce que le verre fondait à la chaleur des bougies",
        "Uniquement pour servir de loupes de lecture",
      ],
      correctIndex: 0,
      hint: "Une mauvaise récolte de fruits dans les Vosges poussa un souffleur de verre à imiter des pommes brillantes.",
      explanation: "Exact ! Dès 1858, les souffleurs de verre ont inventé les premières boules de Noël.",
    },
    {
      id: "renne-6",
      ornamentName: "Chaussette de cheminée",
      question:
        "À l'origine, quel grand plat chaud du terroir aveyronnais aime-t-on souvent partager en famille au cœur de l'hiver après une balade autour du lac ?",
      options: [
        "Une salade niçoise glacée",
        "Un aligot filant ou une soupe au fromage gratinée",
        "Un gaspacho andalou",
        "Des sushis au melon",
      ],
      correctIndex: 1,
      hint: "Fromage fondu, chaleur et convivialité au rendez-vous !",
      explanation: "Bien sûr ! Rien de tel qu'un aligot ou une soupe au fromage quand il gèle sur le Lévézou.",
    },
    {
      id: "renne-7",
      ornamentName: "Boule dorée du lac",
      question:
        "Quelle plante d'hiver aux feuilles piquantes et aux petites baies rouges symbolise la chance et la décoration des portes à Noël ?",
      options: ["Le houx", "Le coquelicot", "Le tournesol", "La lavande"],
      correctIndex: 0,
      hint: "Ses feuilles vert foncé restent brillantes en décembre ; attention à ne pas le confondre avec le gui à baies blanches !",
      explanation: "Le houx ! Avec le sapin et le gui, il compose les couronnes de porte traditionnelles.",
    },
    {
      id: "renne-8",
      ornamentName: "Ruban des cadeaux",
      question:
        "En quelle langue le chant célèbre « Douce nuit, sainte nuit » (*Stille Nacht*) a-t-il été composé et chanté pour la première fois en 1818 près de Salzbourg ?",
      options: ["En italien", "En allemand", "En anglais", "En suédois"],
      correctIndex: 1,
      hint: "Salzbourg se situe en Autriche !",
      explanation: "En allemand (*Stille Nacht*) ! Et maintenant votre sapin de Noël scintille au complet.",
    },
  ],
};
