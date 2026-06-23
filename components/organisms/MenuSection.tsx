import { useEffect, useState } from "react";
import Container from "@/components/atoms/Container";
import MenuItemCard from "@/components/molecules/MenuItemCard";
import MenuCategoryNav from "@/components/molecules/MenuCategoryNav";
import { MENU } from "@/data/menu";

const ALL_ID = "all";

export default function MenuSection() {
  const [activeId, setActiveId] = useState<string>(ALL_ID);

  useEffect(() => {
    const fromHash = () => {
      const hash = window.location.hash.replace("#cat-", "");
      if (hash && MENU.some((c) => c.id === hash)) setActiveId(hash);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const visible =
    activeId === ALL_ID ? MENU : MENU.filter((c) => c.id === activeId);

  const handleSelect = (id: string) => {
    setActiveId(id);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-charbon-900">
      <Container className="pt-8">
        <MenuCategoryNav
          categories={[{ id: ALL_ID, name: "Tout", items: [] }, ...MENU]}
          activeId={activeId}
          onSelect={handleSelect}
        />
      </Container>

      <div className="mt-12">
        {visible.map((category, idx) => (
          <section
            key={category.id}
            id={`cat-${category.id}`}
            aria-labelledby={`cat-${category.id}-title`}
            className={`scroll-mt-40  py-16 ${
              idx % 2 === 0 ? "bg-[#0a0a0a]" : "bg-[#141618]"
            }`}
          >
            <Container>
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
            </Container>
          </section>
        ))}
      </div>
    </div>
  );
}
