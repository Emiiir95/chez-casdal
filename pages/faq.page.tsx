import Head from "next/head";
import Seo from "@/components/layouts/Seo";
import Reveal from "@/components/atoms/Reveal";
import PageHeader from "@/components/molecules/PageHeader";
import FaqList from "@/components/organisms/FaqList";
import CTASection from "@/components/organisms/CTASection";
import { FAQ_CATEGORIES } from "@/data/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  ),
};

export default function FaqPage() {
  return (
    <Seo
      title="FAQ — Livraison, commande, horaires & halal"
      description="Toutes les réponses sur Chez Casdal : zones de livraison, horaires, modes de commande, viande halal, paiement et tarifs à Saint-Ouen-l'Aumône, Pontoise, Cergy."
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <PageHeader
        eyebrow="FAQ"
        title="Vos questions, nos réponses"
        subtitle="Commande, livraison, horaires : on a regroupé ici les questions qu'on nous pose le plus souvent."
      />

      <FaqList categories={FAQ_CATEGORIES} />

      <CTASection
        title="Vous ne trouvez pas votre réponse ?"
        text="Appelez-nous ou écrivez via le formulaire de contact, on revient vers vous rapidement."
      />
    </Seo>
  );
}
