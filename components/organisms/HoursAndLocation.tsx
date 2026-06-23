import {
  FaClock as Clock,
  FaLocationDot as MapPin,
  FaPhone as Phone,
} from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";
import Button from "@/components/atoms/Button";
import IconBadge from "@/components/atoms/IconBadge";
import { SITE } from "@/data/site";

const CARD_CLASS =
  "rounded-4xl border border-charbon-700 bg-charbon-800 p-8 shadow-deep";

export default function HoursAndLocation() {
  const mapsQuery = encodeURIComponent(
    `${SITE.address.street}, ${SITE.address.zip} ${SITE.address.city}`,
  );

  return (
    <section className="bg-charbon-900 py-20 text-white">
      <Container>
        <SectionTitle
          eyebrow="Nous trouver"
          title="Adresse & horaires"
          subtitle="Au cœur de Saint-Ouen-l'Aumône, à deux pas de la zone d'activité des Béthunes."
          light
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className={CARD_CLASS}>
            <div className="flex items-start gap-3">
              <IconBadge icon={MapPin} />
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-charbon-300">
                  Adresse
                </p>
                <p className="mt-1 text-lg font-semibold text-white">
                  {SITE.address.street}
                </p>
                <p className="text-charbon-200">
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

            <hr className="my-8 border-charbon-700" />

            <div className="flex items-start gap-3">
              <IconBadge icon={Phone} />
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-charbon-300">
                  Téléphone
                </p>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="mt-1 inline-block text-lg font-semibold text-white hover:text-flamme-500"
                >
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>

          <div className={CARD_CLASS}>
            <div className="flex items-start gap-3">
              <IconBadge icon={Clock} />
              <div className="flex-1">
                <p className="text-sm font-bold uppercase tracking-wider text-charbon-300">
                  Horaires d&apos;ouverture
                </p>
                <ul className="mt-3 divide-y divide-charbon-700">
                  {SITE.hours.map((h) => (
                    <li
                      key={h.day}
                      className={`flex items-center justify-between py-2.5 text-sm ${
                        h.closed ? "text-charbon-500" : "text-charbon-100"
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
    </section>
  );
}
