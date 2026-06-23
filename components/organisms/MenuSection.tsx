import { useEffect, useState } from "react";
import Container from "@/components/atoms/Container";
import MenuItemCard from "@/components/molecules/MenuItemCard";
import MenuCategoryNav from "@/components/molecules/MenuCategoryNav";
import { MENU } from "@/data/menu";

export default function MenuSection() {
  const [activeId, setActiveId] = useState<string>(MENU[0]?.id ?? "");

  // Met à jour la catégorie active en fonction du scroll
  useEffect(() => {
    const handler = () => {
      const positions = MENU.map((cat) => {
        const el = document.getElementById(`cat-${cat.id}`);
        if (!el) return { id: cat.id, top: Number.POSITIVE_INFINITY };
        const rect = el.getBoundingClientRect();
        return { id: cat.id, top: rect.top };
      });
      // Catégorie dont le haut est juste passé sous l'offset (180px sticky header + nav)
      const offset = 200;
      const current =
        positions
          .filter((p) => p.top - offset <= 0)
          .sort((a, b) => b.top - a.top)[0] ?? positions[0];
      if (current && current.id !== activeId) setActiveId(current.id);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [activeId]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`cat-${id}`);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="bg-charbon-900 pb-24">
      <Container className="pt-8">
        <MenuCategoryNav
          categories={[...MENU]}
          activeId={activeId}
          onSelect={scrollTo}
        />

        <div className="mt-12 space-y-20">
          {MENU.map((category) => (
            <section
              key={category.id}
              id={`cat-${category.id}`}
              aria-labelledby={`cat-${category.id}-title`}
              className="scroll-mt-40"
            >
              <header className="mb-8">
                <h2
                  id={`cat-${category.id}-title`}
                  className="font-display text-4xl tracking-wider text-flamme-500 sm:text-5xl"
                >
                  {category.name}
                </h2>
                {category.description && (
                  <p className="mt-2 max-w-2xl text-creme-100/70">
                    {category.description}
                  </p>
                )}
                {category.note && (
                  <p className="mt-2 inline-block rounded-full border border-flamme-500/40 bg-flamme-500/10 px-3 py-1 text-xs font-semibold text-flamme-400">
                    {category.note}
                  </p>
                )}
              </header>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
