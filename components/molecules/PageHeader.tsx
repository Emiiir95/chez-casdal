import type { ReactNode } from "react";
import Container from "@/components/atoms/Container";
import SectionTitle from "@/components/atoms/SectionTitle";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  subtitle,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-charbon-900 py-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,107,26,0.2),transparent_55%)]"
      />
      <Container className="relative">
        <SectionTitle
          eyebrow={eyebrow}
          title={title}
          subtitle={subtitle}
          light
        />
      </Container>
    </section>
  );
}
