import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import ProseStack from "@/components/atoms/ProseStack";
import { SITE } from "@/data/site";

const DOMAIN = SITE.url.replace("https://www.", "");

export default function DeliveryZonesIntro() {
  return (
    <Container as="section" className="py-20">
      <SectionTitle
        eyebrow="Livraison rapide"
        title="Zones de livraison"
        subtitle={`${SITE.name} livre ses spécialités dans toute la zone du Val-d'Oise autour de Saint-Ouen-l'Aumône.`}
      />

      <ProseStack className="mt-12">
        <p>
          Commander dans votre restaurant préféré directement en ligne sur
          notre site :{" "}
          <a
            href={SITE.url}
            className="font-semibold text-flamme-500 hover:underline"
          >
            {DOMAIN}
          </a>
          .
        </p>
        <p>
          Vous habitez à Saint-Ouen-l&apos;Aumône, Pontoise, Cergy ou alentours
          et cherchez un restaurant qui vous livre des plats de qualité ?
          Prenez quelques secondes pour passer commande et laissez-vous tenter
          par l&apos;un de nos burgers, sandwichs ou chicken.
        </p>
        <p>
          Le site vous permet de commander directement en ligne. Vous y
          retrouvez toutes nos spécialités, les prix de vos plats préférés et
          bien sûr le récapitulatif de votre commande. {SITE.name} vous livre
          à domicile ou au bureau.
        </p>
        <p>
          Vous travaillez en entreprise et souhaitez déjeuner au bureau de
          bons plats confectionnés avec soin ? Passez commande sur notre site
          en quelques clics.
        </p>
        <p>
          Vous êtes à la maison et vous aimeriez qu&apos;on vous livre
          rapidement nos spécialités ? Notre équipe saura vous offrir un
          service de qualité tout en vous livrant le plus rapidement possible.
        </p>
        <p>
          C&apos;est le match de l&apos;année et vous voulez vous retrouver
          entre amis pour le regarder à la maison ? Passez commande sur{" "}
          {DOMAIN} et profitez d&apos;une livraison rapide.
        </p>
        <p>
          Tous les jours, votre restaurant fait le maximum pour vous assurer
          une livraison rapide, à votre domicile, au bureau ou chez vos amis.
        </p>
        <p>
          {SITE.name} vous livre ses spécialités : burgers, chicken,
          sandwichs, starters, boissons et desserts.
        </p>
      </ProseStack>
    </Container>
  );
}
