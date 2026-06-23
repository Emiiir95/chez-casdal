import Image from "next/image";
import {
  FaArrowRight as ArrowRight,
  FaPhone as Phone,
  FaUtensils as Utensils,
  FaBowlFood as Halal,
} from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import { CTA_HREF, SITE } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-charbon-900">
      <Image
        src="/images/banniere.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-charbon-900/50 via-charbon-900/45 to-charbon-900/40"
      />
      <Container className="relative py-28 md:py-36 lg:py-44">
        <div className="max-w-2xl animate-fade-up text-creme-50">
          <span className="inline-flex items-center gap-2 rounded-full border border-flamme-500/40 bg-flamme-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-flamme-400">
            <Halal className="h-3 w-3" /> Fast-food · Saint-Ouen-l&apos;Aumône
            <h3></h3>
          </span>

          <h1 className="mt-6 text-white font-display text-5xl leading-[0.95] tracking-wide sm:text-6xl lg:text-7xl">
            Quand t&apos;as la <span className="text-flamme-500">dalle</span>,
            <br />
            pense <span className="text-flamme-500">Casdal !</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-creme-100/85">
            Burgers, sandwichs maison, chicken, starters et desserts. Sur place,
            à emporter ou livrés chez vous — du mardi au dimanche soir.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={CTA_HREF} size="lg">
              Voir la carte <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              href={`tel:${SITE.phoneTel}`}
              variant="outlineLight"
              size="lg"
            >
              <Phone className="h-5 w-5" /> {SITE.phone}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-creme-100/75">
            <span className="inline-flex items-center gap-2">
              <Utensils className="h-4 w-4 text-flamme-400" /> Sur place ou à
              emporter
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 animate-flame-pulse rounded-full bg-flamme-500" />
              Livraison rapide
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
