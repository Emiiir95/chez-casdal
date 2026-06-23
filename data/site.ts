/**
 * Informations générales du restaurant Chez Casdal.
 * 👉 Modifiez ici coordonnées, horaires et liens de livraison.
 */

export const SITE = {
  name: "Chez Casdal",
  slogan: "Quand t'as la dalle, pense Casdal !",
  shortMission:
    "Fast-food à Saint-Ouen-l'Aumône : burgers, sandwichs, chicken, starters et desserts. Sur place, à emporter ou en livraison rapide.",
  url: "https://www.chez-casdal.fr",
  logo: "/images/logo_chez_casdal.png",
  email: "contact@chez-casdal.fr",
  phone: "09 82 31 48 06",
  phoneTel: "+33982314806",
  address: {
    street: "Chez Casdal, 27 Av. des Béthunes 72",
    zip: "95310",
    city: "Saint-Ouen-l'Aumône",
    country: "France",
  },
  siret: "106 017 809",
  zone: "Saint-Ouen-l'Aumône, Pontoise, Cergy, Eragny, Méry-sur-Oise, Méry, Pierrelaye, Auvers-sur-Oise et alentours",
  // Horaires : lundi fermé, mardi/mercredi/jeudi/dimanche 18h-03h, vendredi/samedi 18h-04h
  hours: [
    { day: "Lundi", value: "Fermé", closed: true },
    { day: "Mardi", value: "18h – 03h", closed: false },
    { day: "Mercredi", value: "18h – 03h", closed: false },
    { day: "Jeudi", value: "18h – 03h", closed: false },
    { day: "Vendredi", value: "18h – 04h", closed: false },
    { day: "Samedi", value: "18h – 04h", closed: false },
    { day: "Dimanche", value: "18h – 03h", closed: false },
  ] as const,
  delivery: {
    minOrderSurcharge: "2€ supplémentaires sur chaque menu en livraison",
    ubereats: "https://www.ubereats.com/",
    deliveroo: "https://deliveroo.fr/",
  },
  instagram: {
    handle: "casdal953",
    url: "https://www.instagram.com/casdal953",
  },
  snapchat: {
    handle: "casdal953",
    url: "https://www.snapchat.com/add/casdal953",
  },
} as const;

/** Liens de navigation principaux (header + footer). */
export const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "À propos", href: "/a-propos" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

/** CTA principal : commander / appeler. */
export const CTA_HREF = "/menu";
