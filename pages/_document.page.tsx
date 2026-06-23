import { Html, Head, Main, NextScript } from "next/document";
import { SITE } from "@/data/site";

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: SITE.name,
  description: SITE.shortMission,
  slogan: SITE.slogan,
  url: SITE.url,
  logo: `${SITE.url}${SITE.logo}`,
  image: `${SITE.url}${SITE.logo}`,
  telephone: SITE.phoneTel,
  email: SITE.email,
  servesCuisine: ["Burgers", "Sandwichs", "Fast-food"],
  priceRange: "€",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    postalCode: SITE.address.zip,
    addressCountry: "FR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Sunday"],
      opens: "18:00",
      closes: "03:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "18:00",
      closes: "04:00",
    },
  ],
  sameAs: [SITE.instagram.url],
};

export default function Document() {
  return (
    <Html lang="fr" data-scroll-behavior="smooth">
      <Head>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="apple-touch-icon" href="/images/favicon.png" />
        <meta
          name="keywords"
          content="fast-food, burger, sandwich, chicken, Saint-Ouen-l'Aumône, Pontoise, Cergy, livraison, Chez Casdal"
        />
        <meta name="theme-color" content="#0a0a0a" />
        <meta property="og:locale" content="fr_FR" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
