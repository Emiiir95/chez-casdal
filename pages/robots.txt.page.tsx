import type { GetServerSideProps } from "next";
import { SITE } from "@/data/site";

/**
 * robots.txt dynamique.
 * - Autorise tous les crawlers classiques (SEO)
 * - Autorise explicitement les bots IA (GEO — Generative Engine Optimization)
 *   pour que ChatGPT, Claude, Perplexity, Gemini & co puissent citer le site.
 */
function buildRobots(baseUrl: string): string {
  const aiBots = [
    "GPTBot", // OpenAI / ChatGPT
    "OAI-SearchBot", // OpenAI search index
    "ChatGPT-User", // ChatGPT browse mode
    "ClaudeBot", // Anthropic / Claude
    "anthropic-ai", // Anthropic legacy
    "Claude-Web", // Anthropic
    "PerplexityBot", // Perplexity
    "Google-Extended", // Google Gemini / AI Overviews
    "Applebot-Extended", // Apple Intelligence
    "Bingbot", // Bing & Copilot
    "Bytespider", // Doubao / TikTok
    "CCBot", // Common Crawl (alimente beaucoup de LLM)
    "DuckAssistBot", // DuckDuckGo
    "Meta-ExternalAgent", // Meta AI
    "FacebookBot", // Meta
    "Amazonbot", // Amazon / Alexa
    "YouBot", // You.com
    "Diffbot", // Diffbot
  ];

  const aiBlocks = aiBots
    .map((bot) => `User-agent: ${bot}\nAllow: /\n`)
    .join("\n");

  return `# Crawlers classiques (SEO)
User-agent: *
Allow: /

# Bots IA (GEO) — autorisés pour citation par les assistants IA
${aiBlocks}
Sitemap: ${baseUrl}/sitemap.xml
`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const body = buildRobots(baseUrl);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, stale-while-revalidate=86400",
  );
  res.write(body);
  res.end();

  return { props: {} };
};

export default function Robots() {
  return null;
}
