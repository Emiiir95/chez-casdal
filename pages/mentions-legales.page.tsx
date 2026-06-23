import Seo from "@/components/layouts/Seo";
import Container from "@/components/atoms/Container";
import PageHeader from "@/components/molecules/PageHeader";
import { SITE } from "@/data/site";

export default function MentionsLegalesPage() {
  return (
    <Seo
      title="Mentions légales"
      description="Mentions légales de Chez Casdal : éditeur, hébergeur, propriété intellectuelle et coordonnées."
      noindex
    >
      <PageHeader
        eyebrow="Informations légales"
        title="Mentions légales"
        subtitle="Conformément à la loi française, voici les informations légales relatives au site et à l'éditeur."
      />

      <Container as="section" className="pb-20 pt-8">
        <article className="prose prose-charbon mx-auto max-w-3xl">
          <h2>Éditeur du site</h2>
          <p>
            Le site <strong>{SITE.url.replace("https://www.", "")}</strong> est
            édité par :
          </p>
          <ul>
            <li>
              <strong>Raison sociale</strong> : {SITE.name}
            </li>
            <li>
              <strong>Adresse</strong> : {SITE.address.street},{" "}
              {SITE.address.zip} {SITE.address.city}
            </li>
            <li>
              <strong>Téléphone</strong> : {SITE.phone}
            </li>
            <li>
              <strong>E-mail</strong> :{" "}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <strong>SIRET</strong> : {SITE.siret}
            </li>
          </ul>

          <h2>Directeur de la publication</h2>
          <p>
            Le directeur de la publication est le représentant légal de{" "}
            {SITE.name}.
          </p>

          <h2>Hébergement</h2>
          <p>
            Le site est hébergé par <strong>Vercel Inc.</strong>, 440 N Barranca
            Ave #4133, Covina, CA 91723, États-Unis.
          </p>

          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, images,
            logos, photographies, graphismes, structure du site) sont la
            propriété exclusive de {SITE.name} ou de ses partenaires, et sont
            protégés par les lois françaises et internationales relatives à la
            propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication,
            adaptation totale ou partielle du site, par quelque procédé que ce
            soit, est interdite sans l&apos;autorisation écrite préalable de{" "}
            {SITE.name}.
          </p>

          <h2>Liens hypertextes</h2>
          <p>
            Le site peut contenir des liens vers d&apos;autres sites internet.{" "}
            {SITE.name} décline toute responsabilité quant au contenu de ces
            sites externes.
          </p>

          <h2>Limitation de responsabilité</h2>
          <p>
            {SITE.name} s&apos;efforce d&apos;assurer au mieux de ses possibilités
            l&apos;exactitude et la mise à jour des informations diffusées sur
            ce site, mais ne peut garantir leur exactitude, précision ou
            exhaustivité. En conséquence, {SITE.name} décline toute responsabilité
            pour toute imprécision, inexactitude ou omission portant sur des
            informations disponibles sur le site.
          </p>

          <h2>Droit applicable</h2>
          <p>
            Le présent site est soumis au droit français. Tout litige relatif à
            son utilisation est de la compétence exclusive des tribunaux
            français.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative à ces mentions légales, vous pouvez
            nous contacter à <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
            ou par téléphone au{" "}
            <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>.
          </p>
        </article>
      </Container>
    </Seo>
  );
}
