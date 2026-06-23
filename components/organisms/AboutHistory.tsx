import Container from "@/components/atoms/Container";

type AboutHistoryProps = {
  className?: string;
};

const SECTIONS = [
  {
    title: "L'histoire",
    body: (
      <>
        Chez Casdal est né d&apos;une envie simple&nbsp;: proposer aux
        habitants de Saint-Ouen-l&apos;Aumône et des alentours un fast-food de
        qualité, généreux et préparé minute. Pas de chichi, juste de bons
        produits, des recettes qui régalent et l&apos;ambiance d&apos;un resto
        de quartier où l&apos;on se sent bien.
      </>
    ),
  },
  {
    title: "Notre carte",
    body: (
      <>
        Burgers, sandwichs XXL, chicken croustillant, starters à partager,
        desserts maison et boissons fraîches. Le tout autour de prix doux,
        parce que se faire plaisir ne devrait pas coûter un bras.
      </>
    ),
  },
  {
    title: "Où nous trouver",
    body: (
      <>
        27 avenue des Béthunes, 95310 Saint-Ouen-l&apos;Aumône. Sur place, à
        emporter ou en livraison via Uber Eats et Deliveroo. Appelez-nous au
        09 82 31 48 06 pour passer commande directement.
      </>
    ),
  },
];

export default function AboutHistory({ className = "" }: AboutHistoryProps) {
  return (
    <Container as="section" className={`py-16 ${className}`}>
      <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-charbon-600">
        {SECTIONS.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-3xl tracking-wider text-charbon-900">
              {s.title}
            </h2>
            <p className="mt-3">{s.body}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
