import Head from "next/head";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { SITE } from "@/data/site";

type SeoProps = {
  title: string;
  description?: string;
  noindex?: boolean;
  children: ReactNode;
};

export default function Seo({
  title,
  description = SITE.shortMission,
  noindex = false,
  children,
}: SeoProps) {
  const router = useRouter();
  const fullTitle = `${title} — ${SITE.name}`;
  const ogImage = `${SITE.url}/api/og`;
  const ogImageAlt = `${SITE.name} — Fast-food à Saint-Ouen-l'Aumône`;
  const canonicalUrl = `${SITE.url}${router.asPath.split("?")[0].split("#")[0]}`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        {noindex && <meta name="robots" content="noindex, follow" />}
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE.name} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={ogImageAlt} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={ogImageAlt} />
      </Head>
      {children}
    </>
  );
}
