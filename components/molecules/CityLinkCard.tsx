import Link from "next/link";
import { FaLocationDot as MapPin } from "react-icons/fa6";
import type { DeliveryZone } from "@/data/delivery-zones";

type CityLinkCardProps = {
  zone: DeliveryZone;
  theme?: "dark" | "light";
};

const THEMES = {
  dark: {
    base: "border-charbon-700 bg-charbon-800 hover:border-flamme-500 hover:bg-charbon-700",
    city: "text-white",
    zip: "text-charbon-300 group-hover:text-flamme-400",
  },
  light: {
    base: "border-charbon-200 bg-white hover:border-flamme-500 hover:bg-flamme-500/5",
    city: "text-charbon-900",
    zip: "text-charbon-500 group-hover:text-flamme-500",
  },
} as const;

export default function CityLinkCard({
  zone,
  theme = "dark",
}: CityLinkCardProps) {
  const t = THEMES[theme];
  return (
    <Link
      href={`/zones-de-livraison/${zone.slug}`}
      className={`group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 transition-all ${t.base}`}
    >
      <span className="flex items-center gap-3">
        <MapPin className="h-4 w-4 shrink-0 text-flamme-500" />
        <span className={`font-semibold ${t.city}`}>{zone.city}</span>
      </span>
      <span className={`text-sm ${t.zip}`}>{zone.zip}</span>
    </Link>
  );
}
