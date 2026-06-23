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
        image: "/images/menu/burgers/cheese.webp",
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
        image: "/images/menu/burgers/double_cheese.webp",
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
        image: "/images/menu/burgers/triple_cheese.webp",
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
        image: "/images/menu/burgers/le_big.webp",
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
        image: "/images/menu/burgers/giant.webp",
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
        image: "/images/menu/burgers/kiri.webp",
      },
      {
        id: "le-180",
        name: "Le 180",
        ingredients: ["Steak 180g", "Cheddar", "Sauces et crudités au choix"],
        priceMenu: 9,
        priceAlone: 8.5,
        image: "/images/menu/burgers/le_180.webp",
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
        image: "/images/menu/burgers/le_monster.webp",
      },
      {
        id: "le-360",
        name: "Le 360",
        ingredients: ["Steak 360g", "Cheddar", "Sauces et crudités au choix"],
        priceMenu: 12,
        priceAlone: 10.5,
        image: "/images/menu/burgers/le_360.webp",
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
        image: "/images/menu/chicken%20burger/chicken_burger.webp",
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
        image: "/images/menu/sandwichs/le_rouge.webp",
      },
      {
        id: "curry",
        name: "Curry",
        ingredients: ["Chicken curry", "Sauces et crudités au choix"],
        priceMenu: 10,
        priceAlone: 9.5,
        image: "/images/menu/sandwichs/curry.webp",
      },
      {
        id: "trio",
        name: "Trio",
        ingredients: ["3 steaks", "3 cheddars", "Sauces et crudités au choix"],
        priceMenu: 8.5,
        priceAlone: 8,
        image: "/images/menu/sandwichs/trio.webp",
      },
      {
        id: "quattro",
        name: "Quattro",
        ingredients: ["4 steaks", "4 cheddars", "Sauces et crudités au choix"],
        priceMenu: 9.5,
        priceAlone: 9,
        image: "/images/menu/sandwichs/quattro.webp",
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
        image: "/images/menu/sandwichs/mixte.webp",
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
        image: "/images/menu/sandwichs/extreme.webp",
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
        image: "/images/menu/sandwichs/phenomene.webp",
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
        image: "/images/menu/sandwichs/steak_boursin.webp",
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
        image: "/images/menu/sandwichs/le_balaize.webp",
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
        image: "/images/starters/nugget.webp",
      },
      {
        id: "calamar-frit",
        name: "Calamar frit",
        variants: [{ label: "10 pièces", price: 5 }],
        image: "/images/starters/calamar_frit.webp",
      },
      {
        id: "chili-cheese",
        name: "Chili Cheese",
        variants: [{ label: "5 pièces", price: 5.5 }],
        image: "/images/starters/chili_cheese.webp",
      },
      {
        id: "mozza-stick",
        name: "Mozza Stick",
        variants: [{ label: "6 pièces", price: 5 }],
        image: "/images/starters/mozza_sick.webp",
      },
    ],
  },
  {
    id: "boissons",
    name: "Boissons",
    description: "Toutes nos boissons à 1,50€ (sauf Cristaline 1€).",
    items: [
      {
        id: "coca",
        name: "Coca-Cola",
        price: 1.5,
        image: "/images/boissons/coca.webp",
      },
      {
        id: "coca-cherry",
        name: "Coca Cherry",
        price: 1.5,
        image: "/images/boissons/coca_cherry.webp",
      },
      {
        id: "coca-zero",
        name: "Coca Zéro",
        price: 1.5,
        image: "/images/boissons/coca_z%C3%A9ro.webp",
      },
      {
        id: "oasis-tropical",
        name: "Oasis Tropical",
        price: 1.5,
        image: "/images/boissons/oasis_tropical.webp",
      },
      {
        id: "oasis-fraise",
        name: "Oasis Fraise Framboise",
        price: 1.5,
        image: "/images/boissons/oasis_fraise_framboise.webp",
      },
      {
        id: "oasis-pomme",
        name: "Oasis Pomme Poire",
        price: 1.5,
        image: "/images/boissons/oasis_pomme_poire.webp",
      },
      {
        id: "fanta-orange",
        name: "Fanta Orange",
        price: 1.5,
        image: "/images/boissons/fanta_orange.webp",
      },
      {
        id: "fanta-citron",
        name: "Fanta Citron",
        price: 1.5,
        image: "/images/boissons/fanta_citron.webp",
      },
      {
        id: "perrier",
        name: "Perrier",
        price: 1.5,
        image: "/images/boissons/perrier.webp",
      },
      {
        id: "ice-tea",
        name: "Ice Tea",
        price: 1.5,
        image: "/images/boissons/ice_tea.webp",
      },
      {
        id: "cristaline",
        name: "Cristaline",
        price: 1,
        image: "/images/boissons/cristaline.webp",
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Pour finir sur une note sucrée.",
    items: [
      {
        id: "tarte-daims",
        name: "Tarte au Daims",
        price: 3,
        image: "/images/desserts/tarte_au_daim.webp",
      },
      {
        id: "tiramisu-chocolat",
        name: "Tiramisu chocolat",
        price: 3.5,
        image: "/images/desserts/tiramisu_chocolat.webp",
      },
      {
        id: "tiramisu-caramel",
        name: "Tiramisu caramel",
        price: 3.5,
        image: "/images/desserts/tiramisu_caramel.webp",
      },
    ],
  },
];
