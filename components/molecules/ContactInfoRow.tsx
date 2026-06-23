import type { IconType } from "react-icons";
import type { ReactNode } from "react";
import IconBadge from "@/components/atoms/IconBadge";

type ContactInfoRowProps = {
  icon: IconType;
  title: string;
  children: ReactNode;
};

export default function ContactInfoRow({
  icon,
  title,
  children,
}: ContactInfoRowProps) {
  return (
    <li className="flex items-start gap-3">
      <IconBadge icon={icon} />
      <div>
        <p className="font-bold">{title}</p>
        {children}
      </div>
    </li>
  );
}
