import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/data/site";

type LogoProps = {
  size?: number;
  hideText?: boolean;
  src?: string;
};

export default function Logo({
  size = 64,
  hideText = true,
  src = SITE.logo,
}: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label={`${SITE.name} — retour à l'accueil`}
    >
      <Image
        src={src}
        alt={`Logo ${SITE.name}`}
        width={497}
        height={502}
        style={{ width: size, height: "auto" }}
        priority
      />
      {!hideText && (
        <span className="font-display text-2xl tracking-wider text-flamme-500">
          {SITE.name}
        </span>
      )}
    </Link>
  );
}
