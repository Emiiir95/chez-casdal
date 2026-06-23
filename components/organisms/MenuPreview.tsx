import { useRef } from "react";
import Link from "next/link";
import {
  FaArrowRight as ArrowRight,
  FaChevronLeft as ChevronLeft,
  FaChevronRight as ChevronRight,
} from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import MenuItemCard from "@/components/molecules/MenuItemCard";
import { MENU } from "@/data/menu";

/** Affiche un aperçu d'items vedettes sur la home. */
const FEATURED_IDS = ["le-monster", "le-balaize", "chicken-burger"];

export default function MenuPreview() {
  const featured = MENU.flatMap((c) => c.items).filter((i) =>
    FEATURED_IDS.includes(i.id),
  );

  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.9;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section className="bg-charbon-900 py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            align="left"
            eyebrow="Notre carte"
            title="Les chouchous du quartier"
            subtitle="Une sélection de nos best-sellers. Toute la carte est servie sur place, à emporter ou en livraison."
            light
          />
          <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-end">
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-flamme-500 transition-colors hover:text-flamme-400"
            >
              Voir la carte complète <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex gap-2 sm:hidden">
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Précédent"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charbon-700 bg-charbon-800 text-flamme-500 transition-colors hover:border-flamme-500 hover:bg-charbon-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Suivant"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-charbon-700 bg-charbon-800 text-flamme-500 transition-colors hover:border-flamme-500 hover:bg-charbon-700"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
        >
          {featured.map((item) => (
            <div
              key={item.id}
              data-card
              className="w-[85%] shrink-0 snap-center sm:w-auto sm:shrink"
            >
              <MenuItemCard item={item} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
