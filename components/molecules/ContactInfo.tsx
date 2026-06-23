import {
  FaEnvelope as Mail,
  FaLocationDot as MapPin,
  FaInstagram as Instagram,
  FaPhone as Phone,
  FaClock as Clock,
} from "react-icons/fa6";
import { SITE } from "@/data/site";

export default function ContactInfo() {
  return (
    <div className="rounded-4xl border border-charbon-100 bg-white p-8 shadow-flame">
      <h2 className="font-display text-2xl tracking-wider">Nos coordonnées</h2>
      <ul className="mt-6 space-y-5">
        <li className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-flamme-500/10 text-flamme-500">
            <Phone className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold">Téléphone</p>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="text-charbon-600 transition-colors hover:text-flamme-500"
            >
              {SITE.phone}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-flamme-500/10 text-flamme-500">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold">Adresse</p>
            <p className="text-charbon-600">
              {SITE.address.street}
              <br />
              {SITE.address.zip} {SITE.address.city}
            </p>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-flamme-500/10 text-flamme-500">
            <Mail className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold">E-mail</p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-charbon-600 transition-colors hover:text-flamme-500"
            >
              {SITE.email}
            </a>
          </div>
        </li>
        <li className="flex items-start gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-flamme-500/10 text-flamme-500">
            <Instagram className="h-5 w-5" />
          </span>
          <div>
            <p className="font-bold">Instagram</p>
            <a
              href={SITE.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-charbon-600 transition-colors hover:text-flamme-500"
            >
              {SITE.instagram.handle}
            </a>
          </div>
        </li>
      </ul>

      <div className="mt-8 rounded-2xl bg-charbon-900 p-5 text-creme-50">
        <div className="flex items-center gap-2 font-bold text-flamme-400">
          <Clock className="h-5 w-5" /> Horaires
        </div>
        <ul className="mt-3 space-y-1 text-sm">
          {SITE.hours.map((h) => (
            <li
              key={h.day}
              className={`flex items-center justify-between gap-3 ${
                h.closed ? "text-creme-100/40" : "text-creme-100/85"
              }`}
            >
              <span>{h.day}</span>
              <span className="font-semibold">{h.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
