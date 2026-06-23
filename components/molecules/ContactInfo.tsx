import {
  FaEnvelope as Mail,
  FaLocationDot as MapPin,
  FaInstagram as Instagram,
  FaPhone as Phone,
  FaClock as Clock,
} from "react-icons/fa6";
import ContactInfoRow from "@/components/molecules/ContactInfoRow";
import { SITE } from "@/data/site";

const LINK_CLASS =
  "text-charbon-600 transition-colors hover:text-flamme-500";

export default function ContactInfo() {
  return (
    <div className="rounded-4xl border border-charbon-100 bg-white p-8 shadow-flame">
      <h2 className="font-display text-2xl tracking-wider">Nos coordonnées</h2>
      <ul className="mt-6 space-y-5">
        <ContactInfoRow icon={Phone} title="Téléphone">
          <a href={`tel:${SITE.phoneTel}`} className={LINK_CLASS}>
            {SITE.phone}
          </a>
        </ContactInfoRow>
        <ContactInfoRow icon={MapPin} title="Adresse">
          <p className="text-charbon-600">
            {SITE.address.street}
            <br />
            {SITE.address.zip} {SITE.address.city}
          </p>
        </ContactInfoRow>
        <ContactInfoRow icon={Mail} title="E-mail">
          <a href={`mailto:${SITE.email}`} className={LINK_CLASS}>
            {SITE.email}
          </a>
        </ContactInfoRow>
        <ContactInfoRow icon={Instagram} title="Instagram">
          <a
            href={SITE.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            {SITE.instagram.handle}
          </a>
        </ContactInfoRow>
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
