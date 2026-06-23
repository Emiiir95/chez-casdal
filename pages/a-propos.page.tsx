import {
  FaUtensils as Utensils,
  FaBowlFood as Bowl,
  FaMotorcycle as Bike,
  FaHeart as Heart,
} from "react-icons/fa6";
import Seo from "@/components/atoms/Seo";
import Container from "@/components/atoms/Container";
import Reveal from "@/components/atoms/Reveal";
import SectionTitle from "@/components/atoms/SectionTitle";
import PageHeader from "@/components/molecules/PageHeader";
import Card from "@/components/molecules/Card";
import CTASection from "@/components/organisms/CTASection";

const VALUES = [
  {
    title: "100% Halal",
    icon: Bowl,
    description:
      "Toutes nos viandes sont rigoureusement sélectionnées et certifiées halal.",
  },
  {
    title: "Fait à la commande",
    icon: Utensils,
    description:
      "Chaque burger, sandwich et chicken est préparé minute, jamais à l'avance.",
  },
  {
    title: "Livraison rapide",
    icon: Bike,
    description:
      "Saint-Ouen-l'Aumône, Pontoise, Cergy et alentours — livrés au plus vite.",
  },
  {
    title: "Du local, du bon",
    icon: Heart,
    description:
      "Un fast-food de quartier, fait pour les gens du quartier. Simple et généreux.",
  },
];

export default function AProposPage() {
  return (
    <Seo
      title="Notre histoire, notre maison"
      description="Découvrez Chez Casdal : un fast-food halal à Saint-Ouen-l'Aumône, simple, généreux et préparé minute."
    >
      <PageHeader
        eyebrow="À propos"
        title="Chez Casdal, c'est notre maison."
        subtitle="Quand t'as la dalle, pense Casdal !"
      />

      <Reveal>
        <Container as="section" className="py-16">
          <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-charbon-600">
            <div>
              <h2 className="font-display text-3xl tracking-wider text-charbon-900">
                L&apos;histoire
              </h2>
              <p className="mt-3">
                Chez Casdal est né d&apos;une envie simple&nbsp;: proposer aux
                habitants de Saint-Ouen-l&apos;Aumône et des alentours un
                fast-food halal de qualité, généreux et préparé minute. Pas de
                chichi, juste de bons produits, des recettes qui régalent et
                l&apos;ambiance d&apos;un resto de quartier où l&apos;on se sent
                bien.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl tracking-wider text-charbon-900">
                Notre carte
              </h2>
              <p className="mt-3">
                Burgers, sandwichs XXL, chicken croustillant, starters à
                partager, desserts maison et boissons fraîches. Le tout autour
                de prix doux, parce que se faire plaisir ne devrait pas coûter
                un bras.
              </p>
            </div>

            <div>
              <h2 className="font-display text-3xl tracking-wider text-charbon-900">
                Où nous trouver
              </h2>
              <p className="mt-3">
                27 avenue des Béthunes, 95310 Saint-Ouen-l&apos;Aumône. Sur
                place, à emporter ou en livraison via Uber Eats et Deliveroo.
                Appelez-nous au 09 82 31 48 06 pour passer commande directement.
              </p>
            </div>
          </div>
        </Container>
      </Reveal>

      <section className="bg-creme-100 py-20">
        <Container>
          <Reveal>
            <SectionTitle
              eyebrow="Notre signature"
              title="Ce qui fait Casdal"
              subtitle="Quatre engagements qui guident chaque commande."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <Card title={value.title} icon={value.icon}>
                  {value.description}
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <Reveal>
        <CTASection />
      </Reveal>
    </Seo>
  );
}
