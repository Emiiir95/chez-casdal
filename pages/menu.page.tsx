import Seo from "@/components/layouts/Seo";
import PageHeader from "@/components/molecules/PageHeader";
import MenuSection from "@/components/organisms/MenuSection";
import CTASection from "@/components/organisms/CTASection";

export default function MenuPage() {
  return (
    <Seo
      title="Menu burger, chicken & sandwich halal — la carte"
      description="Découvrez la carte Chez Casdal : burgers maison, chicken pané, sandwichs XXL, starters, boissons et desserts. 100% halal, à emporter ou en livraison."
    >
      <PageHeader
        eyebrow="Notre carte"
        title="Le menu Casdal"
        subtitle="Burgers, sandwichs, chicken, starters, boissons et desserts. Tout est préparé à la commande."
      />
      <MenuSection />
      <CTASection
        title="Prêt à commander ?"
        text="Appelez-nous pour passer votre commande ou retrouvez-nous sur Uber Eats et Deliveroo."
      />
    </Seo>
  );
}
