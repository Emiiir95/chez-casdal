import { useEffect, useRef, useState } from "react";

type Options = {
  /** Durée de l'animation en ms. */
  duration?: number;
  /** Démarre uniquement quand l'élément entre dans le viewport. */
  startOnIntersection?: boolean;
};

/**
 * Compte de 0 → `target` avec un easing ease-out, déclenché au scroll
 * (Intersection Observer). Respecte prefers-reduced-motion.
 *
 * @returns `{ ref, value }` — attacher `ref` à l'élément à observer.
 */
export function useCountUp(
  target: number,
  { duration = 1500, startOnIntersection = true }: Options = {},
) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setValue(target);
      started.current = true;
      return;
    }

    function animate() {
      const start = performance.now();
      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!startOnIntersection) {
      started.current = true;
      animate();
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !started.current) {
          started.current = true;
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration, startOnIntersection]);

  return { ref, value };
}
