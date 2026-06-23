import Image from "next/image";
import { FaPhone as Phone, FaBolt as Bolt } from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import { SITE } from "@/data/site";

export default function Banner() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/banniere_2.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-charbon-900/85 via-charbon-900/65 to-charbon-900/35"
      />
      <Container className="relative py-24 md:py-32">
        <div className="max-w-2xl text-creme-50">
          <span className="inline-flex items-center gap-2 rounded-full border border-flamme-500/40 bg-flamme-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-flamme-400">
            <Bolt className="h-3 w-3" /> Livraison rapide
          </span>
          <h2 className="mt-6 font-display text-4xl leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl">
            Commandez en un appel, <br />
            <span className="text-flamme-500">livré chez vous en un éclair.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-creme-100/85">
            Un coup de fil, et on s&apos;occupe du reste. Burgers, sandwichs et
            chicken préparés à la minute, livrés chauds à Saint-Ouen-l&apos;Aumône,
            Pontoise, Cergy et alentours.
          </p>
          <div className="mt-8">
            <Button href={`tel:${SITE.phoneTel}`} size="lg">
              <Phone className="h-5 w-5" /> Commander maintenant
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
