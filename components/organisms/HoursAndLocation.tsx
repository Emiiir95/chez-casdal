import {
  FaClock as Clock,
  FaLocationDot as MapPin,
  FaPhone as Phone,
} from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import { SITE } from "@/data/site";

export default function HoursAndLocation() {
  const mapsQuery = encodeURIComponent(
    `${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city}`,
  );

  return (
    <Container as="section" className="py-20">
      <SectionTitle
        eyebrow="Nous trouver"
        title="Adresse & horaires"
        subtitle="Au cœur de Saint-Ouen-l'Aumône, à deux pas de la zone d'activité des Béthunes."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-4xl border border-charbon-200 bg-white p-8 shadow-flame">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-flamme-500/10 text-flamme-500">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-charbon-500">
                Adresse
              </p>
              <p className="mt-1 text-lg font-semibold text-charbon-900">
                {SITE.address.street}
              </p>
              <p className="text-charbon-600">
                {SITE.address.zip} {SITE.address.city}
              </p>
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                external
                variant="outline"
                className="mt-4"
              >
                Itinéraire Google Maps
              </Button>
            </div>
          </div>

          <hr className="my-8 border-charbon-100" />

          <div className="flex items-start gap-3">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-flamme-500/10 text-flamme-500">
              <Phone className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-charbon-500">
                Téléphone
              </p>
              <a
                href={`tel:${SITE.phoneTel}`}
                className="mt-1 inline-block text-lg font-semibold text-charbon-900 hover:text-flamme-500"
              >
                {SITE.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-4xl border border-charbon-200 bg-white p-8 shadow-flame">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-flamme-500/10 text-flamme-500">
              <Clock className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold uppercase tracking-wider text-charbon-500">
                Horaires d&apos;ouverture
              </p>
              <ul className="mt-3 divide-y divide-charbon-100">
                {SITE.hours.map((h) => (
                  <li
                    key={h.day}
                    className={`flex items-center justify-between py-2.5 text-sm ${
                      h.closed ? "text-charbon-300" : "text-charbon-700"
                    }`}
                  >
                    <span className="font-semibold">{h.day}</span>
                    <span>{h.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
