import Seo from "@/components/atoms/Seo";
import Reveal from "@/components/atoms/Reveal";
import Hero from "@/components/organisms/Hero";
import Categories from "@/components/organisms/Categories";
import AboutPreview from "@/components/organisms/AboutPreview";
import MenuPreview from "@/components/organisms/MenuPreview";
import DeliverySection from "@/components/organisms/DeliverySection";
import HoursAndLocation from "@/components/organisms/HoursAndLocation";
import Banner from "@/components/organisms/Banner";
import CTASection from "@/components/organisms/CTASection";
import AboutValues from "@/components/organisms/AboutValues";

export default function HomePage() {
  return (
    <Seo
      title="Fast-food à Saint-Ouen-l'Aumône"
      description="Chez Casdal : burgers, sandwichs, chicken et starters. Sur place, à emporter ou en livraison rapide à Saint-Ouen-l'Aumône, Pontoise, Cergy et alentours."
    >
      <Hero />
      <Categories />
      <MenuPreview />
      <Banner />
      <DeliverySection />
      <AboutPreview />
      <HoursAndLocation />
      <AboutValues />
      <CTASection />
    </Seo>
  );
}
