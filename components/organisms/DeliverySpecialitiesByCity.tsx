import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import OrderLinkCard from "@/components/molecules/OrderLinkCard";
import type { DeliveryZone } from "@/data/delivery-zones";
import { DELIVERY_SPECIALITIES } from "@/data/delivery-zones";

type DeliverySpecialitiesByCityProps = {
  zones: DeliveryZone[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function DeliverySpecialitiesByCity({
  zones,
  eyebrow = "Commander",
  title = "Spécialités livrées dans votre ville",
  subtitle = "Retrouvez nos spécialités directement chez vous, au bureau ou chez vos amis.",
}: DeliverySpecialitiesByCityProps) {
  return (
    <Container as="section" className="py-20">
      <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} />

      <div className="mt-12 space-y-10">
        {zones.map((zone) => (
          <div
            key={zone.slug}
            className="rounded-4xl border border-charbon-100 bg-white p-6 shadow-flame sm:p-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl tracking-wider text-charbon-900">
                Livraison à {zone.city}
              </h2>
              <span className="text-sm font-semibold text-charbon-500">
                {zone.zip}
              </span>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {DELIVERY_SPECIALITIES.map((spec) => (
                <li key={spec.anchor}>
                  <OrderLinkCard
                    label={spec.label}
                    anchor={spec.anchor}
                    zone={zone}
                    theme="light"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
