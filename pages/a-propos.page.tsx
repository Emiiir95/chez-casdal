import Seo from "@/components/atoms/Seo";
import PageHeader from "@/components/molecules/PageHeader";
import AboutHistory from "@/components/organisms/AboutHistory";
import AboutValues from "@/components/organisms/AboutValues";
import CTASection from "@/components/organisms/CTASection";

export default function AProposPage() {
  return (
    <Seo
      title="Notre histoire, notre maison"
      description="Découvrez Chez Casdal : un fast-food à Saint-Ouen-l'Aumône, simple, généreux et préparé minute."
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
