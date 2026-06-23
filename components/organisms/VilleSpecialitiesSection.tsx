import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrderLinkCard from "@/components/molecules/OrderLinkCard";
import type { DeliveryZone } from "@/data/delivery-zones";
import { DELIVERY_SPECIALITIES } from "@/data/delivery-zones";

type VilleSpecialitiesSectionProps = {
  zone: DeliveryZone;
};

export default function VilleSpecialitiesSection({
  zone,
}: VilleSpecialitiesSectionProps) {
  return (
    <section className="bg-charbon-900 py-20 text-white">
      <Container>
        <SectionTitle
          eyebrow="Commander"
          title={`Spécialités livrées à ${zone.city}`}
          subtitle="N'hésitez pas une seconde de plus et passez commande de votre plat préféré dans votre ville."
          light
        />
        <ul className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2">
          {DELIVERY_SPECIALITIES.map((spec) => (
            <li key={spec.anchor}>
              <OrderLinkCard
                label={spec.label}
                anchor={spec.anchor}
                zone={zone}
                theme="dark"
                showZip
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
