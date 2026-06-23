import ContactForm from "@/components/molecules/ContactForm";

type ContactFormCardProps = {
  title?: string;
  description?: string;
};

export default function ContactFormCard({
  title = "Formulaire de contact",
  description = "Remplissez les champs ci-dessous, on revient vers vous rapidement.",
}: ContactFormCardProps) {
  return (
    <div className="rounded-4xl border border-charbon-100 bg-white p-8 shadow-flame sm:p-10">
      <h2 className="font-display text-2xl tracking-wider">{title}</h2>
      <p className="mt-2 text-sm text-charbon-500">{description}</p>
      <div className="mt-6">
        <ContactForm />
      </div>
    </div>
  );
}
