import { FaMotorcycle as Bike, FaCheck as Check } from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import { SITE } from "@/data/site";

const ZONES = SITE.zone.split(",").map((z) => z.trim());

export default function DeliverySection() {
  return (
    <section className="bg-creme-100/60 py-20">
      <Container>
        <SectionTitle
          eyebrow="Livraison rapide"
          title="On vous livre à domicile"
          subtitle={SITE.delivery.minOrderSurcharge}
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-4xl bg-white p-8 shadow-flame">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-flamme-500 text-white">
                <Bike className="h-6 w-6" />
              </span>
              <h3 className="font-display text-2xl tracking-wider">
                Zones livrées
              </h3>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ZONES.map((z) => (
                <li
                  key={z}
                  className="inline-flex items-center gap-2 text-sm text-charbon-700"
                >
                  <Check className="h-4 w-4 text-flamme-500" /> {z}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-4xl bg-charbon-900 p-8 text-creme-50 shadow-deep">
            <h3 className="font-display text-2xl tracking-wider text-flamme-500">
              Commander en ligne
            </h3>
            <p className="mt-2 text-creme-100/80">
              Retrouvez Chez Casdal sur vos plateformes préférées.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={SITE.delivery.ubereats} external size="lg">
                Uber Eats
              </Button>
              <Button
                href={SITE.delivery.deliveroo}
                external
                variant="outlineLight"
                size="lg"
              >
                Deliveroo
              </Button>
            </div>
            <p className="mt-6 text-xs text-creme-100/60">
              Vous préférez nous appeler ? {SITE.phone}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
