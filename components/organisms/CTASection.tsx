import { FaPhone as Phone, FaUtensils as Utensils } from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import { CTA_HREF, SITE } from "@/data/site";

type CTASectionProps = {
  title?: string;
  text?: string;
};

export default function CTASection({
  title = "Une petite faim ?",
  text = "Commandez directement par téléphone ou parcourez la carte. On vous prépare ça en quelques minutes — sur place, à emporter ou en livraison.",
}: CTASectionProps) {
  return (
    <Container as="section" className="py-20">
      <div className="relative overflow-hidden rounded-4xl bg-charbon-900 px-6 py-16 text-center shadow-deep sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-flamme-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-or-500/15 blur-3xl"
        />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-4xl tracking-wider text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-creme-100/85">
            {text}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href={CTA_HREF} size="lg">
              <Utensils className="h-5 w-5" /> Voir la carte
            </Button>
            <Button
              href={`tel:${SITE.phoneTel}`}
              variant="outlineLight"
              size="lg"
            >
              <Phone className="h-5 w-5" /> {SITE.phone}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
