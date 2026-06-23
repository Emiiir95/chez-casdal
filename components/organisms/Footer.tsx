import Link from "next/link";
import Image from "next/image";
import {
  FaInstagram as Instagram,
  FaSnapchat as Snapchat,
  FaEnvelope as Mail,
  FaLocationDot as MapPin,
  FaPhone as Phone,
  FaClock as Clock,
} from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import { NAV_LINKS, SITE } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-charbon-900 text-creme-50">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Image
              src={SITE.logo}
              alt={`Logo ${SITE.name}`}
              width={140}
              height={140}
              className="h-auto w-32"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-creme-100/70">
              {SITE.shortMission}
            </p>
          </div>

          <nav aria-label="Liens de pied de page">
            <h2 className="font-display text-lg tracking-wider text-flamme-500">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-creme-100/80 transition-colors hover:text-flamme-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/zones-de-livraison"
                  className="text-sm text-creme-100/80 transition-colors hover:text-flamme-400"
                >
                  Zones de livraison
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-lg tracking-wider text-flamme-500">
              Nous trouver
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-creme-100/80">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-flamme-400" />
                <span>
                  {SITE.address.street}
                  <br />
                  {SITE.address.zip} {SITE.address.city}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-flamme-400"
                >
                  <Phone className="h-4 w-4 shrink-0 text-flamme-400" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-flamme-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-flamme-400" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-flamme-400"
                >
                  <Instagram className="h-4 w-4 shrink-0 text-flamme-400" />
                  {SITE.instagram.handle}
                </a>
              </li>
              <li>
                <a
                  href={SITE.snapchat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-flamme-400"
                >
                  <Snapchat className="h-4 w-4 shrink-0 text-flamme-400" />
                  {SITE.snapchat.handle}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg tracking-wider text-flamme-500">
              Horaires
            </h2>
            <ul className="mt-4 space-y-1.5 text-sm">
              {SITE.hours.map((h) => (
                <li
                  key={h.day}
                  className={`flex items-center justify-between gap-3 ${
                    h.closed ? "text-creme-100/40" : "text-creme-100/80"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-flamme-400/70" />
                    {h.day}
                  </span>
                  <span className="font-semibold">{h.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-charbon-700 pt-6 text-xs text-creme-100/60 sm:flex-row">
          <p>
            © {year} {SITE.name}. Tous droits réservés.
          </p>
          <p>SIRET : {SITE.siret}</p>
        </div>
      </Container>
    </footer>
  );
}
