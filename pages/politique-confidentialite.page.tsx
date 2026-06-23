import Seo from "@/components/layouts/Seo";
import Container from "@/components/atoms/Container";
import PageHeader from "@/components/molecules/PageHeader";
import { SITE } from "@/data/site";

export default function PolitiqueConfidentialitePage() {
  return (
    <Seo
      title="Politique de confidentialité"
      description="Politique de confidentialité de Chez Casdal : données collectées, finalités, durées de conservation et vos droits RGPD."
      noindex
    >
      <PageHeader
        eyebrow="Vos données"
        title="Politique de confidentialité"
        subtitle="Comment nous traitons vos données personnelles, conformément au RGPD."
      />

      <Container as="section" className="pb-20 pt-8">
        <article className="prose prose-charbon mx-auto max-w-3xl">
          <h2>Responsable du traitement</h2>
          <p>
            Le responsable du traitement des données collectées sur ce site est{" "}
            <strong>{SITE.name}</strong>, dont les coordonnées figurent dans nos{" "}
            <a href="/mentions-legales">mentions légales</a>.
          </p>

          <h2>Données collectées</h2>
          <p>
            Nous collectons les données personnelles que vous nous communiquez
            volontairement, notamment via le formulaire de contact :
          </p>
          <ul>
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Numéro de téléphone (optionnel)</li>
            <li>Contenu du message</li>
          </ul>
          <p>
            Aucune donnée bancaire n&apos;est collectée par notre site. Les
            paiements de livraison sont gérés par nos partenaires (Uber Eats,
            Deliveroo) selon leurs propres politiques.
          </p>

          <h2>Finalités du traitement</h2>
          <p>Vos données sont utilisées uniquement pour :</p>
          <ul>
            <li>Répondre à vos demandes via le formulaire de contact</li>
            <li>Traiter vos commandes téléphoniques</li>
            <li>
              Améliorer la qualité de notre service et de notre communication
            </li>
          </ul>
          <p>
            Nous ne revendons ni ne partageons vos données avec des tiers à des
            fins commerciales.
          </p>

          <h2>Durée de conservation</h2>
          <p>
            Les données collectées via le formulaire de contact sont conservées
            pendant une durée maximale de <strong>3 ans</strong> à compter du
            dernier contact, puis automatiquement supprimées.
          </p>

          <h2>Cookies</h2>
          <p>
            Notre site utilise uniquement des cookies strictement nécessaires à
            son fonctionnement. Aucun cookie de traçage ou publicitaire
            n&apos;est utilisé sans votre consentement explicite.
          </p>

          <h2>Vos droits</h2>
          <p>
            Conformément au Règlement Général sur la Protection des Données
            (RGPD) et à la loi « Informatique et Libertés », vous disposez des
            droits suivants sur vos données personnelles :
          </p>
          <ul>
            <li>
              <strong>Droit d&apos;accès</strong> : obtenir une copie de vos
              données
            </li>
            <li>
              <strong>Droit de rectification</strong> : corriger des données
              inexactes
            </li>
            <li>
              <strong>Droit à l&apos;effacement</strong> : demander la
              suppression de vos données
            </li>
            <li>
              <strong>Droit à la limitation</strong> : restreindre le
              traitement
            </li>
            <li>
              <strong>Droit à la portabilité</strong> : récupérer vos données
              dans un format structuré
            </li>
            <li>
              <strong>Droit d&apos;opposition</strong> : vous opposer au
              traitement de vos données
            </li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> ou par téléphone
            au <a href={`tel:${SITE.phoneTel}`}>{SITE.phone}</a>. Une réponse
            vous sera apportée dans un délai d&apos;un mois.
          </p>

          <h2>Réclamation</h2>
          <p>
            Si vous estimez que vos droits ne sont pas respectés, vous pouvez
            adresser une réclamation à la CNIL (Commission Nationale de
            l&apos;Informatique et des Libertés) via{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.cnil.fr
            </a>
            .
          </p>

          <h2>Mise à jour</h2>
          <p>
            La présente politique de confidentialité peut être mise à jour à
            tout moment. Nous vous invitons à la consulter régulièrement.
          </p>
        </article>
      </Container>
    </Seo>
  );
}
