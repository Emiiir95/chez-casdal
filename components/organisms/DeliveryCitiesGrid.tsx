import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import Reveal from "@/components/atoms/Reveal";
import CityLinkCard from "@/components/molecules/CityLinkCard";
import type { DeliveryZone } from "@/data/delivery-zones";

type DeliveryCitiesGridProps = {
  zones: DeliveryZone[];
  theme?: "dark" | "light";
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function DeliveryCitiesGrid({
  zones,
  theme = "dark",
  eyebrow = "Nos villes desservies",
  title = "Voici les zones de livraison",
  subtitle = "Cliquez sur votre ville pour découvrir le détail de la livraison près de chez vous.",
}: DeliveryCitiesGridProps) {
  const sectionBg = theme === "dark" ? "bg-charbon-900 text-white" : "";

  return (
    <section className={`py-20 ${sectionBg}`}>
      <Container>
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          light={theme === "dark"}
        />

        <Reveal>
          <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {zones.map((zone) => (
              <li key={zone.slug}>
                <CityLinkCard zone={zone} theme={theme} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
