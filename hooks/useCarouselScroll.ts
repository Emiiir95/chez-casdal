import { useRef } from "react";

/**
 * Gère le défilement d'un carousel mobile à base de scroll natif + snap.
 *
 * Corrige le bug du « spam de flèches » : au lieu d'enchaîner des
 * `scrollBy` relatifs (qui se cumulent au milieu de l'animation et font
 * atterrir entre deux cartes), on vise une cible discrète calculée à partir
 * de la cible en attente. Chaque clic avance donc d'exactement une carte,
 * même si l'animation précédente n'est pas terminée.
 *
 * Usage :
 *   const { scrollerRef, scroll, handleScroll } = useCarouselScroll();
 *   <button onClick={() => scroll(-1)} />
 *   <div ref={scrollerRef} onScroll={handleScroll}>…</div>
 *
 * Les cartes défilées doivent porter l'attribut `data-card`.
 */
export function useCarouselScroll() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  // Cible de défilement en cours (null = aucune animation déclenchée par les flèches).
  const targetRef = useRef<number | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scroll = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card ? card.offsetWidth + gap : el.clientWidth * 0.9;
    if (step <= 0) return;

    const max = el.scrollWidth - el.clientWidth;

    // On part de la cible en attente si une animation est en cours, sinon de
    // la position réelle. C'est ce qui empêche le spam de flèches de cumuler
    // des deltas relatifs et de finir entre deux cartes.
    const base = targetRef.current ?? el.scrollLeft;
    const index = Math.round(base / step);
    const next = Math.max(0, Math.min(max, (index + dir) * step));

    targetRef.current = next;
    el.scrollTo({ left: next, behavior: "smooth" });
  };

  // Une fois le défilement stabilisé (flèche ou swipe manuel), on oublie la
  // cible pour que le prochain clic reparte de la position réelle.
  const handleScroll = () => {
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      targetRef.current = null;
    }, 120);
  };

  return { scrollerRef, scroll, handleScroll };
}
