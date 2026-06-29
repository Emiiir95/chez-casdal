import {
  FaUtensils as Utensils,
  FaBowlFood as Bowl,
  FaMotorcycle as Bike,
  FaHeart as Heart,
  FaChevronLeft as ChevronLeft,
  FaChevronRight as ChevronRight,
} from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import Card from "@/components/molecules/Card";
import { useCarouselScroll } from "@/hooks/useCarouselScroll";

const VALUES = [
  {
    title: "Produits frais",
    icon: Bowl,
    description:
      "Des produits rigoureusement sélectionnés pour des plats généreux et savoureux.",
  },
  {
    title: "Fait à la commande",
    icon: Utensils,
    description:
      "Chaque burger, sandwich et chicken est préparé minute, jamais à l'avance.",
  },
  {
    title: "Livraison rapide",
    icon: Bike,
    description:
      "Saint-Ouen-l'Aumône, Pontoise, Cergy et alentours — livrés au plus vite.",
  },
  {
    title: "Du local, du bon",
    icon: Heart,
    description:
      "Un fast-food de quartier, fait pour les gens du quartier. Simple et généreux.",
  },
];

type AboutValuesProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function AboutValues({
  eyebrow = "Notre signature",
  title = "Ce qui fait Casdal",
  subtitle = "Quatre engagements qui guident chaque commande.",
}: AboutValuesProps) {
  const { scrollerRef, scroll, handleScroll } = useCarouselScroll();

  return (
    <section className="bg-creme-100 pt-20 pb-10">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            align="left"
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
          />
          <div className="flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Précédent"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charbon-200 bg-white text-flamme-500 transition-colors hover:border-flamme-500"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Suivant"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charbon-200 bg-white text-flamme-500 transition-colors hover:border-flamme-500"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={handleScroll}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4"
        >
          {VALUES.map((value) => (
            <div
              key={value.title}
              data-card
              className="w-[80%] shrink-0 snap-center sm:w-auto sm:shrink pb-10"
            >
              <Card title={value.title} icon={value.icon}>
                {value.description}
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
