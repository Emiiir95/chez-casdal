import { FaUtensils as Utensils } from "react-icons/fa6";
import Seo from "@/components/atoms/Seo";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";

export default function NotFoundPage() {
  return (
    <Seo title="Page introuvable" noindex>
      <Container className="flex flex-col items-center justify-center py-28 text-center">
        <Utensils className="h-16 w-16 text-flamme-500" />
        <p className="mt-6 font-display text-6xl tracking-wider text-flamme-500">
          404
        </p>
        <h1 className="mt-3 font-display text-3xl tracking-wider">
          Page introuvable
        </h1>
        <p className="mt-3 max-w-md text-charbon-600">
          Cette page n&apos;existe pas (ou plus). Retournons à la carte avant
          que la faim ne se fasse sentir.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Retour à l&apos;accueil
          </Button>
          <Button href="/menu" variant="outline" size="lg">
            Voir le menu
          </Button>
        </div>
      </Container>
    </Seo>
  );
}
