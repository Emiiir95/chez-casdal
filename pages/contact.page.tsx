import Seo from "@/components/layouts/Seo";
import Container from "@/components/atoms/Container";
import PageHeader from "@/components/molecules/PageHeader";
import ContactInfo from "@/components/molecules/ContactInfo";
import ContactFormCard from "@/components/molecules/ContactFormCard";
import LocationMap from "@/components/molecules/LocationMap";

export default function ContactPage() {
  return (
    <Seo
      title="Nous contacter"
      description="Une question, une commande, un retour ? Contactez Chez Casdal par téléphone, par mail ou via le formulaire."
    >
      <PageHeader
        eyebrow="Contact"
        title="Une question ? On vous répond."
        subtitle="Pour commander, appelez-nous directement. Pour tout le reste, ce formulaire est fait pour ça."
      />

      <Container as="section" className="pb-16 pt-12">
        <LocationMap className="mb-10 rounded-4xl border border-charbon-100 bg-white shadow-flame" />
        <div className="grid gap-10 lg:grid-cols-5">
          <aside className="lg:col-span-2">
            <ContactInfo />
          </aside>
          <div className="lg:col-span-3">
            <ContactFormCard />
          </div>
        </div>
      </Container>
    </Seo>
  );
}
