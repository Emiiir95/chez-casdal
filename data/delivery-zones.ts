/**
 * Zones de livraison desservies par Chez Casdal.
 * Utilisé pour la page /zones-de-livraison et les pages par ville (SEO local).
 */

export type DeliveryZone = {
  slug: string;
  city: string;
  zip: string;
};

export const DELIVERY_ZONES: DeliveryZone[] = [
  { slug: "saint-ouen-l-aumone", city: "Saint-Ouen-l'Aumône", zip: "95310" },
  { slug: "pontoise", city: "Pontoise", zip: "95300" },
  { slug: "cergy", city: "Cergy", zip: "95000" },
  { slug: "eragny", city: "Éragny", zip: "95610" },
  { slug: "mery-sur-oise", city: "Méry-sur-Oise", zip: "95540" },
  { slug: "pierrelaye", city: "Pierrelaye", zip: "95480" },
  { slug: "auvers-sur-oise", city: "Auvers-sur-Oise", zip: "95430" },
  { slug: "osny", city: "Osny", zip: "95520" },
  { slug: "jouy-le-moutier", city: "Jouy-le-Moutier", zip: "95280" },
  { slug: "neuville-sur-oise", city: "Neuville-sur-Oise", zip: "95000" },
  { slug: "vaureal", city: "Vauréal", zip: "95490" },
  { slug: "boisemont", city: "Boisemont", zip: "95000" },
];

/** Spécialités mises en avant pour les liens SEO par ville. */
export const DELIVERY_SPECIALITIES = [
  { label: "Burger", anchor: "burgers" },
  { label: "Sandwich", anchor: "sandwich" },
  { label: "Starters", anchor: "starters" },
] as const;
