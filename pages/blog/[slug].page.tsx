import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft as ArrowLeft } from "react-icons/fa6";
import Seo from "@/components/layouts/Seo";
import Container from "@/components/atoms/Container";
import CTASection from "@/components/organisms/CTASection";
import { getAllSlugs, getPostBySlug, type BlogPost } from "@/lib/blog";

type Props = {
  post: BlogPost;
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllSlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);
  if (!post) return { notFound: true };
  return { props: { post } };
};

export default function BlogPostPage({ post }: Props) {
  const dateFmt = new Date(post.date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <Seo title={post.title} description={post.description}>
      <Container as="article" className="py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-flamme-500 hover:underline"
        >
          <ArrowLeft className="h-3 w-3" />
          Tous les articles
        </Link>

        <header className="mx-auto mt-8 max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-flamme-500">
            {dateFmt}
          </p>
          <h1 className="mt-4 font-display text-4xl tracking-wider text-charbon-900 sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-charbon-600">
            {post.description}
          </p>
          {post.tags && post.tags.length > 0 && (
            <ul className="mt-6 flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-flamme-500/30 bg-flamme-500/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-flamme-600"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.image && (
          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-4xl overflow-hidden rounded-4xl bg-charbon-100">
            <Image
              src={post.image}
              alt={post.imageAlt ?? post.title}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              priority
              className="object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-charbon mx-auto mt-12 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </Container>

      <CTASection />
    </Seo>
  );
}
