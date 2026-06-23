import type { IconType } from "react-icons";
import {
  FaBurger,
  FaDrumstickBite,
  FaBreadSlice,
  FaPepperHot,
  FaBottleWater,
  FaIceCream,
  FaUtensils,
} from "react-icons/fa6";
import type { MenuCategory } from "@/data/menu";

type MenuCategoryNavProps = {
  categories: MenuCategory[];
  activeId: string;
  onSelect: (id: string) => void;
};

const CATEGORY_ICONS: Record<string, IconType> = {
  burgers: FaBurger,
  chicken: FaDrumstickBite,
  sandwich: FaBreadSlice,
  starters: FaPepperHot,
  boissons: FaBottleWater,
  desserts: FaIceCream,
};

export default function MenuCategoryNav({
  categories,
  activeId,
  onSelect,
}: MenuCategoryNavProps) {
  return (
    <nav
      aria-label="Catégories du menu"
      className="sticky top-[72px] z-30 -mx-4 px-4 py-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-charbon-800/80 to-charbon-900/80 p-1.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {/* Halo orange subtil derrière */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-12 h-24 bg-flamme-500/10 blur-3xl"
        />

        <ul className="sm:justify-center relative flex gap-1.5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((cat) => {
            const isActive = cat.id === activeId;
            const Icon = CATEGORY_ICONS[cat.id] ?? FaUtensils;
            return (
              <li key={cat.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onSelect(cat.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-creme-100/70 hover:text-white"
                  }`}
                >
                  {/* Fond actif : gradient + glow */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-xl bg-gradient-to-br from-flamme-500 to-flamme-600 shadow-[0_8px_24px_-6px_rgba(255,107,26,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]"
                    />
                  )}

                  {/* Fond hover (inactif) */}
                  {!isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-xl bg-white/0 transition-colors duration-300 group-hover:bg-white/[0.06]"
                    />
                  )}

                  <Icon
                    className={`relative h-4 w-4 transition-all duration-300 ${
                      isActive
                        ? "scale-110 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
                        : "text-flamme-500/70 group-hover:scale-110 group-hover:text-flamme-400"
                    }`}
                  />
                  <span className="relative">{cat.name}</span>

                  {/* Petit point indicateur en bas pour l'actif */}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
