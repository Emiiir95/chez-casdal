import Seo from "@/components/layouts/Seo";
import DeliveryZonesIntro from "@/components/organisms/DeliveryZonesIntro";
import DeliveryCitiesGrid from "@/components/organisms/DeliveryCitiesGrid";
import DeliverySpecialitiesByCity from "@/components/organisms/DeliverySpecialitiesByCity";
import ClosingCtaBlock from "@/components/organisms/ClosingCtaBlock";
import { CTA_HREF, SITE } from "@/data/site";
import { DELIVERY_ZONES } from "@/data/delivery-zones";

export default function ZonesDeLivraisonPage() {
  return (
    <Seo
      title="Livraison burger halal — Saint-Ouen, Pontoise, Cergy"
      description="Livraison rapide Chez Casdal dans tout le Val-d'Oise : Saint-Ouen-l'Aumône, Pontoise, Cergy, Éragny, Méry-sur-Oise, Pierrelaye. Commandez vos burgers halal."
    >
      <DeliveryZonesIntro />
      <DeliveryCitiesGrid zones={DELIVERY_ZONES} theme="dark" />
      <DeliverySpecialitiesByCity zones={DELIVERY_ZONES} />
      <ClosingCtaBlock
        text={`Toute l'équipe de ${SITE.name} est heureuse de vous accueillir et de vous servir.`}
        primaryHref={CTA_HREF}
        primaryLabel="Commander"
        secondaryHref="/contact"
        secondaryLabel="Nous contacter"
      />
    </Seo>
  );
}
