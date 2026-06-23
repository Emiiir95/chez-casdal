type BlogTagFilterProps = {
  tags: string[];
  active: string | null;
  onSelect: (tag: string | null) => void;
};

const ALL_LABEL = "Tous";

export default function BlogTagFilter({
  tags,
  active,
  onSelect,
}: BlogTagFilterProps) {
  return (
    <nav
      aria-label="Filtrer les articles par tag"
      className="mb-10 flex flex-wrap justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onSelect(null)}
        aria-current={active === null ? "true" : undefined}
        className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
          active === null
            ? "border-flamme-500 bg-flamme-500 text-white shadow-flame"
            : "border-charbon-200 bg-white text-charbon-700 hover:border-flamme-500 hover:text-flamme-500"
        }`}
      >
        {ALL_LABEL}
      </button>
      {tags.map((tag) => {
        const isActive = active === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onSelect(tag)}
            aria-current={isActive ? "true" : undefined}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
              isActive
                ? "border-flamme-500 bg-flamme-500 text-white shadow-flame"
                : "border-charbon-200 bg-white text-charbon-700 hover:border-flamme-500 hover:text-flamme-500"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </nav>
  );
}
