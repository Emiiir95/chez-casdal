import type { GetStaticPaths, GetStaticProps } from "next";
import Seo from "@/components/atoms/Seo";
import VilleHero from "@/components/organisms/VilleHero";
import VilleSpecialitiesSection from "@/components/organisms/VilleSpecialitiesSection";
import DeliveryCitiesGrid from "@/components/organisms/DeliveryCitiesGrid";
import ClosingCtaBlock from "@/components/organisms/ClosingCtaBlock";
import { CTA_HREF, SITE } from "@/data/site";
import { DELIVERY_ZONES, type DeliveryZone } from "@/data/delivery-zones";

type Props = {
  zone: DeliveryZone;
  others: DeliveryZone[];
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: DELIVERY_ZONES.map((z) => ({ params: { ville: z.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.ville as string;
  const zone = DELIVERY_ZONES.find((z) => z.slug === slug);
  if (!zone) return { notFound: true };
  return {
    props: {
      zone,
      others: DELIVERY_ZONES.filter((z) => z.slug !== slug),
    },
  };
};

export default function VillePage({ zone, others }: Props) {
  return (
    <Seo
      title={`Livraison à ${zone.city}, ${zone.zip} — burgers, chicken, sandwichs`}
      description={`${SITE.name} livre ses burgers, chicken et sandwichs à ${zone.city} (${zone.zip}). Commandez en ligne, livraison rapide à domicile ou au bureau.`}
    >
      <VilleHero zone={zone} />
      <VilleSpecialitiesSection zone={zone} />
      <DeliveryCitiesGrid
        zones={others}
        theme="light"
        eyebrow="Autres villes"
        title="Nous livrons aussi"
        subtitle="Découvrez toutes nos zones de livraison autour de Saint-Ouen-l'Aumône."
      />
      <ClosingCtaBlock
        text={`Toute l'équipe de ${SITE.name} est heureuse de vous accueillir et de vous servir à ${zone.city}.`}
        primaryHref={CTA_HREF}
        primaryLabel="Commander"
        secondaryHref="/contact"
        secondaryLabel="Nous contacter"
      />
    </Seo>
  );
}
