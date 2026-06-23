import Link from "next/link";
import Image from "next/image";
import { FaArrowRight as ArrowRight } from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import { SITE } from "@/data/site";

export default function AboutPreview() {
  return (
    <Container as="section" className="py-20">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="relative order-2 md:order-1">
          <div className="absolute -inset-3 -z-10 rounded-[2.5rem] bg-flame-gradient opacity-30 blur-2xl" />
          <Image
            src="/images/devanture.png"
            alt={`Devanture du restaurant ${SITE.name}`}
            width={900}
            height={900}
            className="w-full rounded-4xl shadow-deep"
          />
        </div>
        <div className="order-1 md:order-2">
          <SectionTitle
            align="left"
            eyebrow="Notre maison"
            title="Du bon, du généreux."
          />
          <p className="mt-6 text-lg leading-relaxed text-charbon-600">
            Chez Casdal, c&apos;est le fast-food de quartier qu&apos;on aurait
            tous voulu à deux pas de chez soi. Burgers maison, sandwichs XXL,
            chicken croustillant&nbsp;: tout est préparé à la commande, avec
            des produits frais.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-charbon-600">
            Ouvert du mardi au dimanche, jusqu&apos;à 4h le week-end. Sur place,
            à emporter ou en livraison rapide à Saint-Ouen-l&apos;Aumône,
            Pontoise, Cergy et alentours.
          </p>
          <div className="mt-8">
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-flamme-500 transition-colors hover:text-flamme-600"
            >
              Notre histoire <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
