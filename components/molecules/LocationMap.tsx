import { SITE } from "@/data/site";

type Props = {
  className?: string;
  height?: string;
};

export default function LocationMap({
  className = "rounded-4xl border border-charbon-700 bg-charbon-800 shadow-deep",
  height = "h-[400px]",
}: Props) {
  const mapsQuery = encodeURIComponent(
    `${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city}`,
  );

  return (
    <div className={`overflow-hidden ${className}`}>
      <iframe
        title={`Carte ${SITE.name}`}
        src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className={`block w-full border-0 ${height}`}
        allowFullScreen
      />
    </div>
  );
}
