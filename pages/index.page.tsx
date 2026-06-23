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

export default function HomePage() {
  return (
    <Seo
      title="Fast-food halal à Saint-Ouen-l'Aumône"
      description="Chez Casdal : burgers, sandwichs, chicken et starters 100% halal. Sur place, à emporter ou en livraison rapide à Saint-Ouen-l'Aumône, Pontoise, Cergy et alentours."
    >
      <Hero />
      <Reveal>
        <Categories />
      </Reveal>
      <Reveal>
        <MenuPreview />
      </Reveal>
      <Reveal>
        <Banner />
      </Reveal>
      <Reveal>
        <DeliverySection />
      </Reveal>
      <Reveal>
        <AboutPreview />
      </Reveal>
      <Reveal>
        <HoursAndLocation />
      </Reveal>
      <Reveal>
        <CTASection />
      </Reveal>
    </Seo>
  );
}
