/**
 * Génère un article de blog Chez Casdal selon le pipeline éditorial Plume :
 *   1. Topic combinatoire (DELIVERY_ZONES × MENU × USE_CASES) ou original via Claude.
 *   2. Rédaction (temperature 1) — prompt SEO senior, livrable JSON strict, contenu HTML.
 *   3. Audit qualité (temperature 0) sur 5 axes, scores 0-10.
 *   4. Correction (jusqu'à 2 retries) si un axe critique échoue.
 *   5. Sauvegarde en .md (frontmatter YAML + corps HTML).
 *
 * Aucune maintenance manuelle. Lancer : `npm run generate:blog`.
 */

import fs from "fs";
import path from "path";
import Anthropic from "@anthropic-ai/sdk";
import {
  nextTopic,
  allPossibleTopics,
  type GeneratedTopic,
} from "@/lib/topic-generator";
import { SITE } from "@/data/site";
import { DELIVERY_ZONES } from "@/data/delivery-zones";
import { MENU } from "@/data/menu";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const MODEL = "claude-opus-4-7";
const MAX_AUDIT_RETRIES = 2;
const AUDIT_MIN_SCORE = 7;

const UNSPLASH_IMAGES = [
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&q=80",
  "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=1200&q=80",
  "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&q=80",
  "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=1200&q=80",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80",
  "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=1200&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200&q=80",
  "https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=1200&q=80",
  "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=1200&q=80",
];

type ArticlePayload = {
  title: string;
  slug: string;
  metaDescription: string;
  keywords: string[];
  content: string;
};

type AuditResult = {
  scores: {
    business: number;
    qualite: number;
    seo: number;
    structure: number;
    pertinence: number;
  };
  failedAxes: string[];
  feedback: string;
};

// --- Constantes de marque ----------------------------------------------------

const BRAND = {
  nom: SITE.name,
  urlSite: SITE.url,
  urlContact: `${SITE.url}/contact`,
  resume: SITE.shortMission,
  categories: MENU.map((c) => c.name).join(", "),
  motsClesGeneriques:
    "burger, sandwich, chicken, fast-food, livraison, Val-d'Oise, Saint-Ouen-l'Aumône, Pontoise, Cergy, restaurant",
  ton: "décontracté, chaleureux, ancré local, accessible, jamais corporate",
  langue: "français",
  instructionsPerso:
    "AUCUNE mention du mot « halal ». Mettre en avant la qualité, la générosité et la livraison rapide dans le Val-d'Oise.",
};

// --- Helpers fichier --------------------------------------------------------

function todayIso(): string {
  return new Date().toISOString().split("T")[0];
}

function pickImage(): string {
  return UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)];
}

function publishedSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

// --- Helpers Claude ---------------------------------------------------------

function extractText(res: Anthropic.Message): string {
  return res.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

function extractJson<T>(text: string): T {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error(`JSON introuvable :\n${text.slice(0, 500)}`);
  return JSON.parse(match[0]) as T;
}

// --- Étape 0 : topic original via Claude (fallback quand combinatoire épuisé) -

async function proposeOriginalTopic(
  client: Anthropic,
  published: string[],
): Promise<GeneratedTopic> {
  const cities = DELIVERY_ZONES.map((z) => `${z.city} (${z.zip})`).join(", ");
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 600,
    messages: [
      {
        role: "user",
        content: `Tu es expert SEO local pour ${BRAND.nom}. Propose UN nouveau sujet de blog.

CONTEXTE : Fast-food à ${SITE.address.city}, livraison ${cities}. Catégories carte : ${BRAND.categories}.

ARTICLES DÉJÀ PUBLIÉS (${published.length}) :
${published.join("\n")}

Propose un sujet ORIGINAL non couvert (événements saisonniers, tendances, guides pratiques, anecdotes, comparaisons…).

Réponds STRICTEMENT en JSON brut :
{"slug":"kebab-case-unique","title":"...","angle":"...","keywords":["...","..."],"city":"...","zip":"..."}`,
      },
    ],
  });
  const parsed = extractJson<{
    slug: string;
    title: string;
    angle: string;
    keywords?: string[];
    city?: string;
    zip?: string;
  }>(extractText(res));
  return {
    slug: parsed.slug,
    title: parsed.title,
    angle: parsed.angle,
    keywords: parsed.keywords ?? [],
    city: parsed.city ?? SITE.address.city,
    zip: parsed.zip ?? SITE.address.zip,
  };
}

// --- Étape 1 : rédaction ----------------------------------------------------

function redactionPrompt(
  topic: GeneratedTopic,
  published: string[],
  correctionFeedback?: string,
): string {
  return `Tu es un rédacteur web senior et stratège éditorial SEO, expert en copy-writing B2C et création de contenu 100 % humain (indétectable IA). Tu écris UNIQUEMENT en ${BRAND.langue}.

### MISSION
Rédiger un article de blog complet, utile, SEO-optimisé et conforme aux contraintes business de ${BRAND.nom}, en suivant le workflow : Analyse → Plan → Rédaction → Auto-révision.

---

### CONTEXTE ENTREPRISE
- Nom : ${BRAND.nom}
- Site : ${BRAND.urlSite}
- URL contact (CTA final) : ${BRAND.urlContact}
- Sujet principal : ${topic.angle}
- Résumé de valeur : ${BRAND.resume}
- Catégories : ${BRAND.categories}
- Mots-clés génériques : ${BRAND.motsClesGeneriques}
- Ton de communication : ${BRAND.ton}
- Langue : ${BRAND.langue}
- Instructions personnalisées : ${BRAND.instructionsPerso}

### PARAMÈTRES DE L'ARTICLE
- Titre cible : ${topic.title}
- Angle / description : ${topic.angle}
- Ville cible : ${topic.city} (${topic.zip})
- Mots-clés SEO ciblés : ${topic.keywords.join(", ")}
- Articles déjà publiés (à NE PAS dupliquer) : ${published.length ? published.join(", ") : "(aucun)"}

---

### CONTRAINTES BUSINESS (ABSOLUES — non négociables)
❌ Ne JAMAIS mentionner de prestations non proposées par ${BRAND.nom}
❌ Ne JAMAIS inventer de cas clients
❌ Ne pas nommer de concurrents directs
❌ AUCUNE mention du mot « halal »
✅ Respecter strictement les instructions personnalisées

### EXIGENCES QUALITÉ
- Écriture 100 % humaine : phrases variées (courtes ET longues), connecteurs logiques diversifiés, anecdotes/questions ponctuelles
- Orthographe et grammaire parfaites en français (encodage impeccable : é è à ç ù…)
- Ton cohérent avec « ${BRAND.ton} »
- Citations sources autorisées de manière vague (« selon une étude… ») — mais AUCUNE invention de données précises

### EXIGENCES SEO
- Mot-clé principal présent dans l'intro ET dans au moins un H2
- Densité du mot-clé principal ≈ 1 % (±0,3 %), variations sémantiques naturelles
- Titre ≤ 70 caractères, accrocheur, intégrant le mot-clé principal
- Slug en kebab-case ≤ 8 mots
- Meta-description ≤ 155 caractères
- Structure H2/H3 logique (PAS de H1 dans le contenu)

### STRUCTURE TECHNIQUE HTML
- Balises autorisées : <h2>, <h3>, <ul>, <ol>, <li>, <blockquote>, <strong>, <em>, <code>, <p>
- Pas d'images dans le contenu
- AUCUN lien sortant cliquable
- UN SEUL CTA final pointant vers ${BRAND.urlContact}
- Pas de markdown (-, *, >) — uniquement du HTML propre
- Pas de triple backticks dans le contenu

---

### AUTO-AUDIT AVANT LIVRAISON
Vérifie sur 0-10 chacun des 5 axes :
1. Contraintes business
2. Qualité & authenticité
3. SEO (mot-clé en intro+H2, densité, structure, slug, titre, meta)
4. Structure technique (HTML valide, CTA unique)
5. Pertinence (sujet, angle, valeur ajoutée)

Si un critère critique échoue → corrige avant de livrer.
${correctionFeedback ? `\n### CORRECTION DEMANDÉE (audit précédent)\n${correctionFeedback}\n` : ""}
---

### LIVRABLE (JSON STRICT)
{
  "title": "string (≤ 70 caractères)",
  "slug": "string-kebab-case-max-8-mots",
  "metaDescription": "string (≤ 155 caractères)",
  "keywords": ["mot-clé principal", "secondaire 1", "secondaire 2"],
  "content": "<h2>...</h2><p>...</p>... (HTML complet de l'article)"
}

Caractères spéciaux français correctement encodés. Aucun commentaire hors JSON.
FIN.`;
}

async function redigerArticle(
  client: Anthropic,
  topic: GeneratedTopic,
  published: string[],
  correctionFeedback?: string,
): Promise<ArticlePayload> {
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 3500,
    temperature: 1,
    messages: [
      {
        role: "user",
        content: redactionPrompt(topic, published, correctionFeedback),
      },
    ],
  });
  return extractJson<ArticlePayload>(extractText(res));
}

// --- Étape 2 : audit qualité ------------------------------------------------

async function auditArticle(
  client: Anthropic,
  topic: GeneratedTopic,
  article: ArticlePayload,
): Promise<AuditResult> {
  const auditPrompt = `Tu es éditeur en chef et auditeur SEO. Évalue strictement l'article suivant.

CONTRAINTES À VÉRIFIER :
- Aucune mention du mot « halal »
- Aucun lien sortant cliquable ; UN SEUL CTA final vers ${BRAND.urlContact}
- HTML uniquement (balises <h2><h3><p><ul><ol><li><blockquote><strong><em><code>), pas de h1
- Titre ≤ 70 caractères, meta ≤ 155 caractères, slug kebab-case ≤ 8 mots
- Mot-clé principal en intro ET dans au moins un h2
- Densité ≈ 1 % du mot-clé principal
- Ton décontracté/local, écriture humaine, français parfait
- Ville cible "${topic.city}" mentionnée au moins 2 fois
- Pertinence par rapport à l'angle : "${topic.angle}"

ARTICLE À AUDITER :
TITLE: ${article.title}
SLUG: ${article.slug}
META: ${article.metaDescription}
KEYWORDS: ${article.keywords.join(", ")}
CONTENT:
${article.content}

Évalue chaque axe sur 0-10 et liste les axes qui échouent (< ${AUDIT_MIN_SCORE}).

Réponds STRICTEMENT en JSON brut :
{"scores":{"business":0-10,"qualite":0-10,"seo":0-10,"structure":0-10,"pertinence":0-10},"failedAxes":["..."],"feedback":"Liste précise des corrections à apporter, ou chaîne vide si tout est OK."}`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 1500,
    temperature: 0,
    messages: [{ role: "user", content: auditPrompt }],
  });
  return extractJson<AuditResult>(extractText(res));
}

// --- Étape 3 : sauvegarde ---------------------------------------------------

function buildMarkdownFile(
  article: ArticlePayload,
  topic: GeneratedTopic,
): string {
  const image = pickImage();
  return `---
title: ${JSON.stringify(article.title)}
description: ${JSON.stringify(article.metaDescription)}
date: "${todayIso()}"
slug: "${article.slug}"
image: "${image}"
imageAlt: ${JSON.stringify(article.title)}
tags: ${JSON.stringify(article.keywords)}
city: ${JSON.stringify(topic.city)}
zip: "${topic.zip}"
format: "html"
---

${article.content}
`;
}

// --- Main -------------------------------------------------------------------

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("❌ ANTHROPIC_API_KEY manquant.");
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const published = publishedSlugs();
  const total = allPossibleTopics().length;

  // --- 1. Choix du sujet ----------------------------------------------------
  let topic = nextTopic(published);
  if (topic) {
    console.log(
      `📋 Sujet combinatoire (${published.length + 1}/${total}) : ${topic.slug}`,
    );
  } else {
    console.log(`📭 Combinatoire épuisée (${total}). Sujet original via Claude…`);
    for (let attempt = 1; attempt <= 3; attempt++) {
      const proposed = await proposeOriginalTopic(client, published);
      if (!published.includes(proposed.slug)) {
        topic = proposed;
        console.log(`💡 Sujet original : ${topic.slug}`);
        break;
      }
      console.log(`⚠️  Tentative ${attempt} : slug déjà publié, on retente.`);
    }
    if (!topic) {
      console.error("❌ Pas de sujet unique trouvé après 3 essais.");
      process.exit(1);
    }
  }
  console.log(`   Titre : ${topic.title}`);

  // --- 2. Rédaction + boucle d'audit ---------------------------------------
  let article: ArticlePayload | null = null;
  let correctionFeedback: string | undefined;

  for (let attempt = 0; attempt <= MAX_AUDIT_RETRIES; attempt++) {
    const label = attempt === 0 ? "Rédaction" : `Correction ${attempt}`;
    console.log(`✍️  ${label}…`);
    article = await redigerArticle(client, topic, published, correctionFeedback);

    console.log("🔍 Audit qualité…");
    const audit = await auditArticle(client, topic, article);
    const minScore = Math.min(...Object.values(audit.scores));
    console.log(`   Scores : ${JSON.stringify(audit.scores)} → min ${minScore}`);

    if (minScore >= AUDIT_MIN_SCORE && audit.failedAxes.length === 0) {
      console.log("✅ Audit validé.");
      break;
    }

    if (attempt === MAX_AUDIT_RETRIES) {
      console.warn(
        `⚠️  Audit non validé après ${MAX_AUDIT_RETRIES} retries — on publie quand même.`,
      );
      break;
    }

    correctionFeedback = `Axes échoués : ${audit.failedAxes.join(", ")}. Corrections : ${audit.feedback}`;
    console.log(`🔁 Retry avec feedback : ${audit.feedback}`);
  }

  if (!article) {
    console.error("❌ Aucun article produit.");
    process.exit(1);
  }

  // Force le slug du fichier à correspondre au topic (cohérence avec la queue)
  // ou au slug renvoyé par Claude s'il diffère
  const finalSlug = article.slug || topic.slug;
  article.slug = finalSlug;

  // --- 3. Sauvegarde -------------------------------------------------------
  const markdown = buildMarkdownFile(article, topic);
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
  const filepath = path.join(BLOG_DIR, `${finalSlug}.md`);
  fs.writeFileSync(filepath, markdown, "utf8");

  console.log(`✅ Article publié : ${filepath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
