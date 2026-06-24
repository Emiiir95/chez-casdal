import Seo from "@/components/layouts/Seo";
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
      title="Burger halal & fast-food — Saint-Ouen-l'Aumône"
      description="Chez Casdal, fast-food halal à Saint-Ouen-l'Aumône : burgers maison, chicken, sandwichs XXL. Livraison rapide à Pontoise, Cergy, Éragny et alentours du Val-d'Oise."
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
