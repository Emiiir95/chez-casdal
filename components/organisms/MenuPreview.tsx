import Link from "next/link";
import { FaArrowRight as ArrowRight } from "react-icons/fa6";
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
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-flamme-500 transition-colors hover:text-flamme-400"
          >
            Voir la carte complète <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
