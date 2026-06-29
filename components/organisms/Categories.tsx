import Link from "next/link";
import Image from "next/image";
import {
  FaArrowRight as ArrowRight,
  FaChevronLeft as ChevronLeft,
  FaChevronRight as ChevronRight,
} from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import { useCarouselScroll } from "@/hooks/useCarouselScroll";

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
};

const CATEGORIES: Category[] = [
  {
    id: "burgers",
    name: "Burgers",
    description: "Pain brioché, steak fondant, cheddar généreux.",
    image: "/images/categories/categorie_burger.webp",
    imageAlt: "Burger maison Chez Casdal",
  },
  {
    id: "sandwich",
    name: "Sandwichs",
    description: "Tassots, kebabs et galettes XXL.",
    image: "/images/categories/categorie_sandwich.webp",
    imageAlt: "Sandwich généreux",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Pour finir sur une note gourmande.",
    image: "/images/categories/categorie_dessert.webp",
    imageAlt: "Dessert gourmand",
  },
];

export default function Categories() {
  const { scrollerRef, scroll, handleScroll } = useCarouselScroll();

  return (
    <Container as="section" className="py-20">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionTitle
          align="left"
          eyebrow="Notre carte"
          title="Quelques catégories qui vont t'ouvrir l'appétit"
          subtitle="Des classiques aux créations maison — y'en a forcément un qui t'appelle."
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
        className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
      >
        {CATEGORIES.map(({ id, name, description, image, imageAlt }) => (
          <Link
            key={id}
            href={`/menu#cat-${id}`}
            data-card
            className="group relative block aspect-[4/5] w-[80%] shrink-0 snap-center overflow-hidden rounded-3xl shadow-deep transition-all duration-300 hover:-translate-y-1 hover:shadow-flame sm:w-auto sm:shrink"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 80vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-charbon-900/95 via-charbon-900/55 to-charbon-900/20 transition-opacity duration-300 group-hover:via-charbon-900/65 group-hover:to-charbon-900/35"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-flamme-500/0 to-transparent transition-all duration-500 group-hover:from-flamme-500/20"
            />

            <div className="relative flex h-full flex-col justify-end p-6">
              <h3 className="font-display text-3xl tracking-wider text-white drop-shadow-lg sm:text-4xl">
                {name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-creme-100/90 drop-shadow">
                {description}
              </p>
              <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-flamme-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-flame transition-transform duration-300 group-hover:translate-x-1">
                Découvrir <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/menu"
          className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-flamme-500 transition-colors hover:text-flamme-600"
        >
          Voir toute la carte <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}
