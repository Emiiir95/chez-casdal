import { useMemo, useState } from "react";
import type { GetStaticProps } from "next";
import Seo from "@/components/layouts/Seo";
import Container from "@/components/atoms/Container";
import PageHeader from "@/components/molecules/PageHeader";
import BlogPostCard from "@/components/molecules/BlogPostCard";
import BlogTagFilter from "@/components/molecules/BlogTagFilter";
import CTASection from "@/components/organisms/CTASection";
import { getAllPosts, type BlogPostSummary } from "@/lib/blog";

type Props = {
  posts: BlogPostSummary[];
  tags: string[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts();
  const tagCounts = new Map<string, number>();
  for (const p of posts) {
    for (const tag of p.tags ?? []) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }
  const tags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => t);
  return { props: { posts, tags } };
};

export default function BlogPage({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((p) => p.tags?.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <Seo
      title="Blog Casdal — Burger halal, fast-food & actu locale"
      description="Le blog Chez Casdal : conseils burger, guides livraison à Saint-Ouen-l'Aumône, Pontoise, Cergy. Astuces, recettes et nouveautés du fast-food halal."
    >
      <PageHeader
        eyebrow="Blog"
        title="Le blog Casdal"
        subtitle="Conseils, actualités et bonnes adresses autour du fast-food à Saint-Ouen-l'Aumône."
      />

      <Container as="section" className="pb-20 pt-12">
        {tags.length > 0 && (
          <BlogTagFilter
            tags={tags}
            active={activeTag}
            onSelect={setActiveTag}
          />
        )}

        {filtered.length === 0 ? (
          <p className="text-center text-charbon-500">
            Aucun article {activeTag ? `pour le tag « ${activeTag} »` : ""}.
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </Container>

      <CTASection />
    </Seo>
  );
}
