import Link from "next/link";
import { FaTruck as Truck } from "react-icons/fa6";
import type { DeliveryZone } from "@/data/delivery-zones";

type OrderLinkCardProps = {
  label: string;
  anchor: string;
  zone: DeliveryZone;
  theme?: "dark" | "light";
  showZip?: boolean;
};

const THEMES = {
  dark: {
    base: "border-charbon-700 bg-charbon-800 hover:border-flamme-500 hover:bg-charbon-700",
    text: "text-white",
  },
  light: {
    base: "border-charbon-200 bg-creme-50 hover:border-flamme-500 hover:bg-flamme-500/5",
    text: "text-charbon-900",
  },
} as const;

export default function OrderLinkCard({
  label,
  anchor,
  zone,
  theme = "light",
  showZip = false,
}: OrderLinkCardProps) {
  const t = THEMES[theme];
  return (
    <Link
      href={`/menu#cat-${anchor}`}
      className={`group flex items-center justify-between gap-2 rounded-2xl border px-4 py-3 transition-all ${t.base}`}
      aria-label={`Commander ${label} à ${zone.city} ${zone.zip}`}
    >
      <span className={`text-sm font-semibold ${t.text}`}>
        {label} à {zone.city}
        {showZip && `, ${zone.zip}`}
      </span>
      <Truck className="h-4 w-4 shrink-0 text-flamme-500 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
