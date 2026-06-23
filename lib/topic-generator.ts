/**
 * Génère automatiquement le prochain sujet de blog à publier.
 *
 * Stratégie : on croise programmatiquement
 *   DELIVERY_ZONES × MENU.categories × USE_CASES
 * → ce qui donne plusieurs centaines de sujets SEO local cohérents,
 * sans avoir à maintenir manuellement une liste.
 *
 * Le générateur ignore les sujets déjà publiés (via slugs des fichiers .md).
 */

import { DELIVERY_ZONES } from "@/data/delivery-zones";
import { MENU } from "@/data/menu";

export type GeneratedTopic = {
  slug: string;
  title: string;
  angle: string;
  keywords: string[];
  city: string;
  zip: string;
  /** Catégorie de menu cible (optionnelle selon le use-case). */
  category?: string;
};

type UseCase = {
  id: string;
  /** True si le use-case s'applique à une catégorie spécifique (sinon city only). */
  needsCategory: boolean;
  build: (ctx: {
    city: string;
    zip: string;
    citySlug: string;
    category?: string;
    categoryId?: string;
  }) => Omit<GeneratedTopic, "city" | "zip" | "category">;
};

const USE_CASES: UseCase[] = [
  // Catégorie x ville : livraison ciblée
  {
    id: "category-delivery",
    needsCategory: true,
    build: ({ city, citySlug, category, categoryId }) => ({
      slug: `${categoryId}-livres-a-${citySlug}`,
      title: `${category} livrés à ${city} : ce qu'il faut savoir`,
      angle: `Présenter notre gamme de ${category?.toLowerCase()} avec un focus sur la livraison rapide à ${city}.`,
      keywords: [
        category?.toLowerCase() ?? "",
        city.toLowerCase(),
        "livraison",
      ].filter(Boolean),
    }),
  },
  // Catégorie x ville : meilleur ___ à la ville
  {
    id: "category-best",
    needsCategory: true,
    build: ({ city, citySlug, category, categoryId }) => ({
      slug: `meilleur-${categoryId}-a-${citySlug}`,
      title: `Où manger le meilleur ${category?.toLowerCase().replace(/s$/, "")} à ${city} ?`,
      angle: `Mettre en avant la qualité de notre ${category?.toLowerCase()} et donner envie aux habitants de ${city} de tester.`,
      keywords: [
        category?.toLowerCase() ?? "",
        city.toLowerCase(),
        "meilleur",
        "restaurant",
      ].filter(Boolean),
    }),
  },
  // Ville : soirée / vie nocturne
  {
    id: "evening",
    needsCategory: false,
    build: ({ city, citySlug }) => ({
      slug: `soiree-a-${citySlug}-ouvert-tard`,
      title: `Soirée à ${city} : un restaurant ouvert tard pour vous régaler`,
      angle: `Mettre en avant les horaires d'ouverture jusqu'à 3h-4h, livraison nocturne à ${city}.`,
      keywords: [city.toLowerCase(), "ouvert tard", "soirée", "nuit"],
    }),
  },
  // Ville : famille / partage
  {
    id: "family",
    needsCategory: false,
    build: ({ city, citySlug }) => ({
      slug: `repas-famille-${citySlug}`,
      title: `Repas en famille à ${city} : nos formules à partager`,
      angle: `Présenter les menus famille, plats généreux, livraison rapide à ${city}.`,
      keywords: [city.toLowerCase(), "famille", "à partager", "menu"],
    }),
  },
  // Ville : déjeuner au bureau
  {
    id: "office",
    needsCategory: false,
    build: ({ city, citySlug }) => ({
      slug: `dejeuner-bureau-${citySlug}`,
      title: `Déjeuner au bureau à ${city} : on vous livre rapidement`,
      angle: `Cibler les actifs / entreprises à ${city}, mise en avant de la livraison rapide pour la pause déjeuner.`,
      keywords: [city.toLowerCase(), "déjeuner", "bureau", "livraison"],
    }),
  },
  // Ville : weekend / sortie
  {
    id: "weekend",
    needsCategory: false,
    build: ({ city, citySlug }) => ({
      slug: `weekend-${citySlug}-bon-plan-fast-food`,
      title: `Weekend à ${city} : le bon plan fast-food pour se régaler`,
      angle: `Idées pour le weekend à ${city} : commande à emporter ou livraison, bons plans menu.`,
      keywords: [city.toLowerCase(), "weekend", "fast-food", "bon plan"],
    }),
  },
  // Ville : match / sport
  {
    id: "match",
    needsCategory: false,
    build: ({ city, citySlug }) => ({
      slug: `soiree-match-${citySlug}-livraison`,
      title: `Soirée match à ${city} : on livre l'apéro idéal`,
      angle: `Idées de commandes à partager pour regarder un match à ${city} : tenders, wings, sandwichs, burgers.`,
      keywords: [city.toLowerCase(), "match", "soirée", "à partager"],
    }),
  },
];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Énumère TOUS les sujets possibles (sans filtrer les déjà publiés).
 * Permet d'avoir une vue d'ensemble du potentiel SEO.
 */
export function allPossibleTopics(): GeneratedTopic[] {
  const topics: GeneratedTopic[] = [];

  for (const zone of DELIVERY_ZONES) {
    const ctxBase = {
      city: zone.city,
      zip: zone.zip,
      citySlug: zone.slug,
    };

    for (const uc of USE_CASES) {
      if (uc.needsCategory) {
        for (const cat of MENU) {
          const built = uc.build({
            ...ctxBase,
            category: cat.name,
            categoryId: slugify(cat.name),
          });
          topics.push({
            ...built,
            city: zone.city,
            zip: zone.zip,
            category: cat.name,
          });
        }
      } else {
        const built = uc.build(ctxBase);
        topics.push({
          ...built,
          city: zone.city,
          zip: zone.zip,
        });
      }
    }
  }

  return topics;
}

/**
 * Retourne le prochain sujet à publier (premier qui n'est pas dans publishedSlugs).
 * On déterministe l'ordre pour garantir une rotation logique :
 * ville par ville, use-case par use-case.
 */
export function nextTopic(publishedSlugs: string[]): GeneratedTopic | null {
  const published = new Set(publishedSlugs);
  const topics = allPossibleTopics();
  return topics.find((t) => !published.has(t.slug)) ?? null;
}
