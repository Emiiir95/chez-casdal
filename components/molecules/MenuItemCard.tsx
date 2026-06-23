import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { PLACEHOLDER_IMAGE } from "@/data/menu";

type MenuItemCardProps = {
  item: MenuItem;
};

function formatPrice(price: number) {
  return price.toFixed(2).replace(".", ",") + "€";
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-charbon-800/70 bg-charbon-800 text-creme-50 shadow-deep transition-all duration-300 hover:-translate-y-1 border-flamme-500/60">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black p-4">
        <Image
          src={item.image || PLACEHOLDER_IMAGE}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {item.tags && item.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-flamme-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl tracking-wider text-white">
          {item.name}
        </h3>

        {item.ingredients && item.ingredients.length > 0 && (
          <p className="mt-2 text-sm leading-relaxed text-creme-100/70">
            {item.ingredients.join(", ")}
          </p>
        )}

        {item.description && !item.ingredients && (
          <p className="mt-2 text-sm leading-relaxed text-creme-100/70">
            {item.description}
          </p>
        )}

        <div className="mt-auto pt-4">
          {item.priceMenu !== undefined && item.priceAlone !== undefined ? (
            <div className="flex items-center gap-2">
              <span className="price-tag">
                Menu {formatPrice(item.priceMenu)}
              </span>
              <span className="price-tag-ghost">
                Seul {formatPrice(item.priceAlone)}
              </span>
            </div>
          ) : item.variants ? (
            <div className="flex flex-wrap gap-2">
              {item.variants.map((v) => (
                <span key={v.label} className="price-tag">
                  {v.label} · {formatPrice(v.price)}
                </span>
              ))}
            </div>
          ) : item.price !== undefined ? (
            <span className="price-tag">{formatPrice(item.price)}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
