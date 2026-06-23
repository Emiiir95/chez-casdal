import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaBars as Menu,
  FaXmark as X,
  FaInstagram as Instagram,
  FaPhone as Phone,
} from "react-icons/fa6";
import Container from "@/components/atoms/Container";
import Logo from "@/components/atoms/Logo";
import Button from "@/components/atoms/Button";
import { NAV_LINKS, SITE } from "@/data/site";

export default function Header() {
  const { pathname } = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      if (currentY > lastY && currentY > 60) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`${isHome ? "fixed left-0 right-0" : "sticky"} top-0 z-40 transition-all duration-300 ${
          isHome && !scrolled && !mobileOpen
            ? "border-b border-transparent bg-transparent"
            : "border-b border-flamme-500/20 bg-charbon-900/95 backdrop-blur-md"
        } ${hidden && !mobileOpen ? "-translate-y-full" : "translate-y-0"}`}
      >
        <Container as="nav" className="flex items-center justify-between py-1">
          <Logo size={88} hideText />

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive(link.href)
                    ? "bg-flamme-500 text-white"
                    : "text-creme-50 hover:bg-flamme-500/15 hover:text-flamme-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Button href={`tel:${SITE.phoneTel}`}>
              <Phone className="h-4 w-4" /> Commander
            </Button>
          </div>

          <button
            type="button"
            className="relative h-10 w-10 rounded-full text-creme-50 hover:bg-flamme-500/15 lg:hidden"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                mobileOpen
                  ? "opacity-0 rotate-90 scale-50"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            >
              <Menu className="h-6 w-6" />
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                mobileOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50"
              }`}
            >
              <X className="h-6 w-6" />
            </span>
          </button>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-charbon-900 px-6 pb-10 pt-6 transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Logo size={72} hideText />
          <button
            type="button"
            className="relative h-10 w-10 rounded-full text-creme-50 hover:bg-flamme-500/15"
            aria-label="Fermer le menu"
            onClick={() => setMobileOpen(false)}
          >
            <span className="absolute inset-0 flex items-center justify-center">
              <X className="h-6 w-6" />
            </span>
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
              className={`rounded-2xl px-4 py-3 text-base font-bold uppercase tracking-wider transition-colors ${
                isActive(link.href)
                  ? "bg-flamme-500 text-white"
                  : "text-creme-50 hover:bg-flamme-500/15"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            href={`tel:${SITE.phoneTel}`}
            size="lg"
            className="w-full"
          >
            <Phone className="h-4 w-4" /> Commander
          </Button>
          <Button
            href={SITE.instagram.url}
            external
            variant="outlineLight"
            size="lg"
            className="w-full"
          >
            <Instagram className="h-5 w-5" /> {SITE.instagram.handle}
          </Button>
        </div>
      </div>
    </>
  );
}
