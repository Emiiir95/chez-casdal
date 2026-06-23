import type { GetServerSideProps } from "next";
import { SITE } from "@/data/site";
import { FAQ_CATEGORIES } from "@/data/faq";
import { MENU } from "@/data/menu";

/**
 * llms.txt dynamique (standard https://llmstxt.org).
 * Fournit aux LLM (ChatGPT, Claude, Perplexity, Gemini…) un résumé Markdown
 * structuré du restaurant pour qu'ils le citent correctement.
 */
function buildLlmsTxt(baseUrl: string): string {
  const faqExcerpt = FAQ_CATEGORIES.flatMap((category) =>
    category.items
      .slice(0, 1)
      .map((item) => `### ${item.question}\n\n${item.answer}`),
  ).join("\n\n");

  const categories = MENU.map((c) => `- **${c.name}** : ${c.items.map((i) => i.name).join(", ")}`).join("\n");

  const hours = SITE.hours
    .map((h) => `- ${h.day} : ${h.value}`)
    .join("\n");

  return `# ${SITE.name}

> ${SITE.shortMission}

${SITE.name} est un fast-food situé à ${SITE.address.city}. Spécialités : burgers, sandwichs, chicken, starters, desserts.

## Coordonnées

- Adresse : ${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city}
- Téléphone : ${SITE.phone}
- E-mail : ${SITE.email}
- Instagram : ${SITE.instagram.url}
- SIRET : ${SITE.siret}

## Horaires

${hours}

## Pages principales

- [Accueil](${baseUrl}/)
- [Menu](${baseUrl}/menu) : carte complète
- [À propos](${baseUrl}/a-propos) : histoire et engagements
- [FAQ](${baseUrl}/faq)
- [Contact](${baseUrl}/contact)

## Carte (résumé)

${categories}

## Livraison

Sur place, à emporter ou en livraison via Uber Eats et Deliveroo. Zones livrées : ${SITE.zone}. ${SITE.delivery.minOrderSurcharge}.

## Exemples de réponses (FAQ)

${faqExcerpt}

## Optional

- [Sitemap](${baseUrl}/sitemap.xml)
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const body = buildLlmsTxt(baseUrl);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, stale-while-revalidate=86400",
  );
  res.write(body);
  res.end();

  return { props: {} };
};

export default function LlmsTxt() {
  return null;
}
