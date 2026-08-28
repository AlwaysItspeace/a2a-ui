import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Slash } from "lucide-react";

export interface BreadcrumbItem {
  label: React.ReactNode;
  href?: string;
  active?: boolean;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: "chevron" | "slash";
}

export function Breadcrumb({
  items,
  separator = "slash",
  className,
  ...props
}: BreadcrumbProps) {
  const renderSeparator = () => {
    if (separator === "slash") {
      return <Slash className="h-3 w-3 text-zinc-400 rotate-[-15deg]" />;
    }
    return <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />;
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-1.5 text-xs select-none", className)}
      {...props}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {item.href && !item.active ? (
              <a
                href={item.href}
                className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors font-medium"
              >
                {item.label}
              </a>
            ) : (
              <span
                className={cn(
                  "font-medium",
                  isLast || item.active
                    ? "text-zinc-950 dark:text-zinc-50 font-semibold"
                    : "text-zinc-500 dark:text-zinc-400"
                )}
              >
                {item.label}
              </span>
            )}
            {!isLast && <span className="mx-1">{renderSeparator()}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
