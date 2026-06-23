import type { MenuCategory } from "@/data/menu";

type MenuCategoryNavProps = {
  categories: MenuCategory[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function MenuCategoryNav({
  categories,
  activeId,
  onSelect,
}: MenuCategoryNavProps) {
  return (
    <nav
      aria-label="Catégories du menu"
      className="sticky top-[72px] z-30 -mx-4 border-y border-flamme-500/20 bg-charbon-900/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:mx-0 lg:rounded-2xl lg:border lg:px-4"
    >
      <ul className="flex gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <li key={cat.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(cat.id)}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-flamme-500 text-white shadow-flame"
                    : "text-creme-100/80 hover:bg-flamme-500/15 hover:text-flamme-400"
                }`}
              >
                {cat.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
