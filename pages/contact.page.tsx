import Seo from "@/components/atoms/Seo";
import Container from "@/components/atoms/Container";
import Reveal from "@/components/atoms/Reveal";
import PageHeader from "@/components/molecules/PageHeader";
import ContactInfo from "@/components/molecules/ContactInfo";
import ContactForm from "@/components/molecules/ContactForm";

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
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <aside>
              <ContactInfo />
            </aside>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3">
            <div className="rounded-4xl border border-charbon-100 bg-white p-8 shadow-flame sm:p-10">
              <h2 className="font-display text-2xl tracking-wider">
                Formulaire de contact
              </h2>
              <p className="mt-2 text-sm text-charbon-500">
                Remplissez les champs ci-dessous, on revient vers vous
                rapidement.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Seo>
  );
}
