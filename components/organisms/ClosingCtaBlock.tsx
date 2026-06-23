import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";

type ClosingCtaBlockProps = {
  text: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export default function ClosingCtaBlock({
  text,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: ClosingCtaBlockProps) {
  return (
    <section className="bg-creme-50 py-20">
      <Container className="text-center">
        <p className="mx-auto max-w-2xl text-lg text-charbon-700">{text}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button href={primaryHref} size="lg">
            {primaryLabel}
          </Button>
          {secondaryHref && secondaryLabel && (
            <Button href={secondaryHref} variant="outline" size="lg">
              {secondaryLabel}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
