import * as React from "react";
import { cn } from "@/lib/utils";

export interface ItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  active?: boolean;
}

export function Item({
  icon,
  title,
  description,
  badge,
  action,
  active = false,
  className,
  ...props
}: ItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 rounded-2xl border transition-all duration-150 select-none",
        active
          ? "border-zinc-600 bg-[#1c1c22] shadow-sm"
          : "border-zinc-800/80 bg-[#121215] hover:border-zinc-700 hover:bg-[#16161b]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#1a1a20] text-zinc-300 shrink-0 border border-zinc-800/80">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-100 truncate">
              {title}
            </span>
            {badge}
          </div>
          {description && (
            <p className="text-[11px] text-zinc-400 truncate mt-0.5 font-mono">
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div className="ml-3 shrink-0">{action}</div>}
    </div>
  );
}
