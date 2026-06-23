/**
 * Carte du restaurant Chez Casdal.
 *
 * 👉 POUR AJOUTER / MODIFIER UN ITEM :
 *    - Ajoutez un objet dans le tableau `items` de la catégorie concernée.
 *    - Les champs `priceMenu` et `priceAlone` sont optionnels (en euros).
 *    - Pour la photo, déposez le fichier dans `public/images/menu/`
 *      puis renseignez son chemin dans `image`. Si vide, une photo
 *      temporaire est utilisée.
 *
 * 👉 POUR AJOUTER UNE CATÉGORIE :
 *    - Dupliquez un bloc et changez `id`, `name`, `description`.
 */

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  ingredients?: string[];
  priceMenu?: number;
  priceAlone?: number;
  /** Prix unique (boissons, desserts, starters par quantité) */
  price?: number;
  /** Variantes de prix (ex : 8 pièces 5,50€ / 16 pièces 10€) */
  variants?: { label: string; price: number }[];
  image?: string;
  tags?: ("nouveau" | "best" | "épicé")[];
};

export type MenuCategory = {
  id: string;
  name: string;
  description?: string;
  note?: string;
  items: MenuItem[];
};

/** Image temporaire utilisée quand un item n'a pas encore de photo. */
export const PLACEHOLDER_IMAGE = "/images/menu/placeholder.svg";

export const MENU: MenuCategory[] = [
  {
    id: "burgers",
    name: "Burgers",
    description: "Pain brioché, steak haché et cheddar fondant.",
    items: [
      {
        id: "cheese",
        name: "Cheese",
        ingredients: [
          "Steak 45g",
          "Cheddar",
          "Oignons",
          "Cornichon",
          "Ketchup",
          "Moutarde",
        ],
        priceMenu: 5.6,
        priceAlone: 5,
      },
      {
        id: "double-cheese",
        name: "Double Cheese",
        ingredients: [
          "2 steaks 45g",
          "Cheddar",
          "Oignons",
          "Cornichon",
          "Ketchup",
          "Moutarde",
        ],
        priceMenu: 6.5,
        priceAlone: 6,
      },
      {
        id: "triple-cheese",
        name: "Triple Cheese",
        ingredients: [
          "3 steaks 45g",
          "Cheddar",
          "Oignons",
          "Cornichon",
          "Ketchup",
          "Moutarde",
        ],
        priceMenu: 7.5,
        priceAlone: 7,
      },
      {
        id: "le-big",
        name: "Le Big",
        ingredients: [
          "2 steaks 45g",
          "Salade",
          "Oignons",
          "Cornichons",
          "Cheddar",
          "Sauce Biggy",
        ],
        priceMenu: 7.5,
        priceAlone: 7,
        tags: ["best"],
      },
      {
        id: "giant",
        name: "Giant",
        ingredients: [
          "2 steaks 45g",
          "Salade",
          "Oignons",
          "Cheddar",
          "Sauce Giant",
        ],
        priceMenu: 7.5,
        priceAlone: 7,
      },
      {
        id: "kiri",
        name: "Kiri",
        ingredients: [
          "2 steaks 45g",
          "Salade",
          "Kiri",
          "Cheddar",
          "Sauce mayo",
        ],
        priceMenu: 7.5,
        priceAlone: 7,
      },
      {
        id: "le-180",
        name: "Le 180",
        ingredients: ["Steak 180g", "Cheddar", "Sauces et crudités au choix"],
        priceMenu: 9,
        priceAlone: 8.5,
      },
      {
        id: "le-monster",
        name: "Le Monster",
        ingredients: [
          "Steak 180g",
          "Cheddar",
          "Œuf",
          "Bacon de dinde",
          "Galette de pomme de terre",
          "Sauces et crudités au choix",
        ],
        priceMenu: 12,
        priceAlone: 10.5,
        tags: ["best"],
      },
      {
        id: "le-360",
        name: "Le 360",
        ingredients: ["Steak 360g", "Cheddar", "Sauces et crudités au choix"],
        priceMenu: 12,
        priceAlone: 10.5,
      },
    ],
  },
  {
    id: "chicken",
    name: "Chicken",
    description: "Pour les amateurs de poulet pané maison.",
    items: [
      {
        id: "chicken-burger",
        name: "Chicken Burger",
        ingredients: [
          "Poulet pané",
          "Salade",
          "Sauce chicken",
          "Sauce cheddar",
        ],
        priceMenu: 7.5,
        priceAlone: 7,
      },
    ],
  },
  {
    id: "sandwich",
    name: "Sandwich",
    description: "Tortilla, pain normal ou baguette / tradition (+0,50€).",
    note: "Choisissez votre pain : tortilla, pain normal ou baguette / tradition (+0,50€).",
    items: [
      {
        id: "le-rouge",
        name: "Le Rouge",
        ingredients: ["Chicken tandoorie", "Sauces et crudités au choix"],
        priceMenu: 10,
        priceAlone: 9.5,
      },
      {
        id: "curry",
        name: "Curry",
        ingredients: ["Chicken curry", "Sauces et crudités au choix"],
        priceMenu: 10,
        priceAlone: 9.5,
      },
      {
        id: "trio",
        name: "Trio",
        ingredients: ["3 steaks", "3 cheddars", "Sauces et crudités au choix"],
        priceMenu: 8.5,
        priceAlone: 8,
      },
      {
        id: "quattro",
        name: "Quattro",
        ingredients: ["4 steaks", "4 cheddars", "Sauces et crudités au choix"],
        priceMenu: 9.5,
        priceAlone: 9,
      },
      {
        id: "mixte",
        name: "Mixte",
        ingredients: [
          "Chicken tandoorie & curry",
          "Sauces et crudités au choix",
        ],
        priceMenu: 10.5,
        priceAlone: 9.5,
      },
      {
        id: "extreme",
        name: "Extrême",
        ingredients: [
          "2 steaks",
          "Œuf",
          "Galette de pomme de terre",
          "Cheddar",
          "Sauces et crudités au choix",
        ],
        priceMenu: 10.5,
        priceAlone: 9.5,
      },
      {
        id: "phenomene",
        name: "Phénomène",
        ingredients: [
          "2 steaks",
          "Cordon bleu",
          "Cheddar",
          "Sauces et crudités au choix",
        ],
        priceMenu: 10.5,
        priceAlone: 9.5,
      },
      {
        id: "steak-boursin",
        name: "Steak Boursin",
        ingredients: [
          "2 steaks",
          "Œuf",
          "Boursin",
          "Cheddar",
          "Sauces et crudités au choix",
        ],
        priceMenu: 9.5,
        priceAlone: 9,
      },
      {
        id: "le-balaize",
        name: "Le Balaize",
        ingredients: [
          "3 steaks",
          "3 cheddars",
          "Œuf",
          "Poulet fumé grillé",
          "Sauces et crudités au choix",
        ],
        priceMenu: 10.5,
        priceAlone: 9.5,
        tags: ["best"],
      },
    ],
  },
  {
    id: "starters",
    name: "Starters",
    description: "À partager ou pour accompagner votre menu.",
    items: [
      {
        id: "nuggets",
        name: "Nuggets",
        variants: [
          { label: "8 pièces", price: 5.5 },
          { label: "16 pièces", price: 10 },
        ],
      },
      {
        id: "calamar-frit",
        name: "Calamar frit",
        variants: [{ label: "10 pièces", price: 5 }],
      },
      {
        id: "chili-cheese",
        name: "Chili Cheese",
        variants: [{ label: "5 pièces", price: 5.5 }],
      },
    ],
  },
  {
    id: "boissons",
    name: "Boissons",
    description: "Toutes nos boissons à 1,50€ (sauf Cristaline 1€).",
    items: [
      { id: "coca", name: "Coca-Cola", price: 1.5 },
      { id: "coca-cherry", name: "Coca Cherry", price: 1.5 },
      { id: "coca-zero", name: "Coca Zéro", price: 1.5 },
      { id: "oasis-tropical", name: "Oasis Tropical", price: 1.5 },
      { id: "oasis-fraise", name: "Oasis Fraise Framboise", price: 1.5 },
      { id: "oasis-pomme", name: "Oasis Pomme Poire", price: 1.5 },
      { id: "fanta-orange", name: "Fanta Orange", price: 1.5 },
      { id: "fanta-citron", name: "Fanta Citron", price: 1.5 },
      { id: "perrier", name: "Perrier", price: 1.5 },
      { id: "ice-tea", name: "Ice Tea", price: 1.5 },
      { id: "cristaline", name: "Cristaline", price: 1 },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Pour finir sur une note sucrée.",
    items: [
      { id: "tarte-daims", name: "Tarte au Daims", price: 3 },
      { id: "tiramisu", name: "Tiramisu chocolat / caramel", price: 3.5 },
    ],
  },
];
