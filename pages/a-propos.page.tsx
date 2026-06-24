import Seo from "@/components/layouts/Seo";
import PageHeader from "@/components/molecules/PageHeader";
import AboutHistory from "@/components/organisms/AboutHistory";
import AboutValues from "@/components/organisms/AboutValues";
import CTASection from "@/components/organisms/CTASection";

export default function AProposPage() {
  return (
    <Seo
      title="Notre histoire — Fast-food halal à Saint-Ouen"
      description="Chez Casdal, fast-food halal familial à Saint-Ouen-l'Aumône : pain frais, viande sélectionnée, recettes maison. L'équipe et l'histoire derrière vos burgers."
    >
      <PageHeader
        eyebrow="À propos"
        title="Chez Casdal, c'est notre maison."
        subtitle="Quand t'as la dalle, pense Casdal !"
      />
      <AboutHistory />
      <AboutValues />
      <CTASection />
    </Seo>
  );
}
