import { useId, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import type { FaqQuestion } from "@/data/faq";

type FaqItemProps = {
  item: FaqQuestion;
};

export default function FaqItem({ item }: FaqItemProps) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div
      className={`group rounded-3xl border bg-white shadow-flame transition-all duration-300 ${
        open
          ? "border-flamme-500/40"
          : "border-charbon-100 hover:border-flamme-500/30"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={contentId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-3xl p-6 text-left font-bold text-charbon-900 transition-colors hover:text-flamme-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flamme-500 focus-visible:ring-offset-2"
      >
        <span className="text-base sm:text-lg">{item.question}</span>
        <span
          aria-hidden="true"
          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-out ${
            open
              ? "rotate-[135deg] bg-flamme-500 text-white shadow-flame"
              : "bg-flamme-500/10 text-flamme-500"
          }`}
        >
          <FaPlus className="h-3.5 w-3.5" />
        </span>
      </button>

      <div
        id={contentId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`px-6 pb-6 text-sm leading-relaxed text-charbon-600 transition-all duration-300 ease-out sm:text-base ${
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            }`}
          >
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}
