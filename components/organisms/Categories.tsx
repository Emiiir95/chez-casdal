import Link from "next/link";
import {
  FaBurger as Burger,
  FaDrumstickBite as Drumstick,
  FaBreadSlice as Bread,
  FaPepperHot as Pepper,
  FaIceCream as IceCream,
  FaMugHot as Mug,
  FaArrowRight as ArrowRight,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";

type Category = {
  id: string;
  name: string;
  description: string;
  Icon: IconType;
};

const CATEGORIES: Category[] = [
  {
    id: "burgers",
    name: "Burgers",
    description: "Pain brioché, steak fondant, cheddar généreux.",
    Icon: Burger,
  },
  // {
  //   id: "chicken",
  //   name: "Chicken",
  //   description: "Tendres et croustillants à souhait.",
  //   Icon: Drumstick,
  // },
  {
    id: "sandwich",
    name: "Sandwichs",
    description: "Tassots, kebabs et galettes XXL.",
    Icon: Bread,
  },
  // {
  //   id: "starters",
  //   name: "Starters",
  //   description: "Nuggets, calamars, chili cheese et plus.",
  //   Icon: Pepper,
  // },
  // {
  //   id: "boissons",
  //   name: "Boissons",
  //   description: "Sodas, eaux et boissons fraîches.",
  //   Icon: Mug,
  // },
  {
    id: "desserts",
    name: "Desserts",
    description: "Pour finir sur une note gourmande.",
    Icon: IceCream,
  },
];

export default function Categories() {
  return (
    <Container as="section" className="py-20">
      <SectionTitle
        eyebrow="Notre carte"
        title="Quelques catégories qui vont t'ouvrir l'appétit"
        subtitle="Des classiques aux créations maison — y'en a forcément un qui t'appelle."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map(({ id, name, description, Icon }) => (
          <Link
            key={id}
            href={`/menu#${id}`}
            className="group relative overflow-hidden rounded-3xl border border-charbon-900/5 bg-creme-50 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-flamme-500/30 hover:shadow-flame"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-flamme-500/10 blur-2xl transition-opacity group-hover:bg-flamme-500/20"
            />
            <div className="relative flex items-start gap-4">
              <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-flamme-500/10 text-flamme-500 transition-colors group-hover:bg-flamme-500 group-hover:text-white">
                <Icon className="h-7 w-7" />
              </span>
              <div className="flex-1">
                <h3 className="font-display text-2xl tracking-wider text-charbon-900">
                  {name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-charbon-500">
                  {description}
                </p>
              </div>
              <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-charbon-400 transition-all group-hover:translate-x-1 group-hover:text-flamme-500" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/menu"
          className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-flamme-500 transition-colors hover:text-flamme-600"
        >
          Voir toute la carte <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  );
}
