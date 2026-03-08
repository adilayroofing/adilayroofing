import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-brand-light border-b border-brand-border"
    >
      <div className="container-wide mx-auto px-4 py-3">
        <ol className="flex items-center gap-2 text-sm text-brand-gray">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-brand-gray/40 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-brand-red transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-brand-dark font-medium truncate max-w-[200px] md:max-w-none">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
