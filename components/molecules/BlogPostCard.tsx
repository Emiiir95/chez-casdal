import Link from "next/link";
import Image from "next/image";
import { FaArrowRight as ArrowRight } from "react-icons/fa6";
import type { BlogPostSummary } from "@/lib/blog";

type BlogPostCardProps = {
  post: BlogPostSummary;
};

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const dateFmt = new Date(post.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <article className="group overflow-hidden rounded-4xl border border-charbon-100 bg-white shadow-flame transition-all hover:-translate-y-1 hover:shadow-deep">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.image && (
          <div className="relative aspect-[16/9] overflow-hidden bg-charbon-100">
            <Image
              src={post.image}
              alt={post.imageAlt ?? post.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-flamme-500">
            {dateFmt}
          </p>
          <h2 className="mt-3 font-display text-2xl tracking-wider text-charbon-900 group-hover:text-flamme-500">
            {post.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-charbon-600">
            {post.description}
          </p>
          {post.tags && post.tags.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 4).map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-flamme-500/30 bg-flamme-500/5 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-flamme-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-flamme-500">
            Lire l&apos;article <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </Link>
    </article>
  );
}
