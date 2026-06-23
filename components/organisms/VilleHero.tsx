import Link from "next/link";
import {
  FaLocationDot as MapPin,
  FaArrowLeft as ArrowLeft,
} from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import { SITE, CTA_HREF } from "@/data/site";
import type { DeliveryZone } from "@/data/delivery-zones";

const DOMAIN = SITE.url.replace("https://www.", "");

type VilleHeroProps = {
  zone: DeliveryZone;
};

export default function VilleHero({ zone }: VilleHeroProps) {
  return (
    <Container as="section" className="py-20">
      <Link
        href="/zones-de-livraison"
        className="inline-flex items-center gap-2 text-sm font-semibold text-flamme-500 hover:underline"
      >
        <ArrowLeft className="h-3 w-3" />
        Toutes les zones de livraison
      </Link>

      <SectionTitle
        eyebrow={`Livraison ${zone.zip}`}
        title={`Livraison à ${zone.city}`}
        subtitle={`${SITE.name} vous livre ses spécialités à ${zone.city} (${zone.zip}) et alentours.`}
        align="left"
        className="mt-6"
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-5 text-charbon-700 lg:col-span-2">
          <p>
            Vous habitez à <strong>{zone.city}</strong> ({zone.zip}) et vous
            recherchez un restaurant qui vous livre des plats de qualité ?
            Prenez quelques secondes pour commander sur{" "}
            <a
              href={SITE.url}
              className="font-semibold text-flamme-500 hover:underline"
            >
              {DOMAIN}
            </a>{" "}
            et laissez-vous tenter par l&apos;un de nos burgers, sandwichs ou
            chicken.
          </p>
          <p>
            Le site vous permet de commander directement en ligne. Vous y
            retrouvez toutes nos spécialités, les prix de vos plats préférés
            et bien sûr le récapitulatif de votre commande. Votre restaurant
            vous livre à domicile ou au bureau à {zone.city}.
          </p>
          <p>
            Vous travaillez à {zone.city} et souhaitez déjeuner au bureau de
            bons plats confectionnés avec soin ? Passez commande sur notre
            site en quelques clics.
          </p>
          <p>
            Vous êtes à la maison à {zone.city} et vous aimeriez qu&apos;on
            vous livre rapidement nos spécialités ? Notre équipe saura vous
            offrir un service de qualité tout en vous livrant le plus
            rapidement possible.
          </p>
          <p>
            Aujourd&apos;hui c&apos;est le match de l&apos;année et vous
            souhaitez vous retrouver entre amis à {zone.city} pour le regarder
            et vous faire livrer à domicile ? Passez commande sur notre site
            web.
          </p>
          <p>
            Tous les jours, {SITE.name} fait le maximum pour vous assurer une
            livraison rapide à {zone.city}, à votre domicile, au bureau ou
            chez vos amis.
          </p>
          <p>
            Votre restaurant vous livre dans la ville de {zone.city} ses
            spécialités : burgers, chicken, sandwichs, starters, boissons et
            desserts.
          </p>

          <div className="pt-4">
            <Button href={CTA_HREF} size="lg">
              Commander à {zone.city}
            </Button>
          </div>
        </div>

        <aside className="rounded-4xl border border-charbon-100 bg-creme-50 p-6">
          <p className="text-sm font-bold uppercase tracking-wider text-charbon-500">
            Livraison
          </p>
          <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-charbon-900">
            <MapPin className="h-5 w-5 text-flamme-500" />
            {zone.city}, {zone.zip}
          </p>
          <p className="mt-4 text-sm text-charbon-700">
            Depuis notre restaurant de {SITE.address.city}, nous livrons dans
            toute la zone : {SITE.zone}.
          </p>
          <p className="mt-4 text-sm text-charbon-700">
            {SITE.delivery.minOrderSurcharge}.
          </p>
        </aside>
      </div>
    </Container>
  );
}
