import { Link } from "@/i18n/navigation";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-montserrat uppercase tracking-widest mt-4 mb-1 text-foreground/50">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-(--green) transition-colors duration-150">
              {item.label}
            </Link>
          ) : (
            <span className={index === items.length - 1 ? "text-foreground/80" : ""}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
