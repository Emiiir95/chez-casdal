import Container from "@/components/atoms/Container";
import FaqItem from "@/components/molecules/FaqItem";
import type { FaqCategory } from "@/data/faq";

type FaqListProps = {
  categories: FaqCategory[];
};

export default function FaqList({ categories }: FaqListProps) {
  return (
    <Container as="section" className="space-y-14 py-12">
      {categories.map((category) => (
        <div key={category.title}>
          <h2 className="font-display text-3xl tracking-wider text-flamme-500 sm:text-4xl">
            {category.title}
          </h2>
          <ul className="mt-6 space-y-3">
            {category.items.map((item) => (
              <li key={item.question}>
                <FaqItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
}
