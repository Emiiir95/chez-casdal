import type { GetServerSideProps } from "next";
import { SITE } from "@/data/site";

const ROUTES: { path: string; priority: string }[] = [
  { path: "/", priority: "1.0" },
  { path: "/menu", priority: "0.9" },
  { path: "/a-propos", priority: "0.7" },
  { path: "/faq", priority: "0.6" },
  { path: "/contact", priority: "0.7" },
];

function buildSitemap(baseUrl: string, lastmod: string): string {
  const urls = ROUTES.map(
    ({ path, priority }) =>
      `  <url>\n    <loc>${baseUrl}${path === "/" ? "/" : path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
  ).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = SITE.url.replace(/\/$/, "");
  const lastmod = new Date().toISOString().split("T")[0];
  const xml = buildSitemap(baseUrl, lastmod);

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, max-age=3600, stale-while-revalidate=86400",
  );
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
