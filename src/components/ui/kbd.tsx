import * as React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys?: string[];
}

export function Kbd({ className, keys, children, ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center gap-0.5 rounded-[3px] border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 font-mono text-[11px] font-medium text-zinc-700 dark:text-zinc-300 shadow-[0_1px_0_1px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_1px_rgba(255,255,255,0.04)] select-none",
        className
      )}
      {...props}
    >
      {keys ? (
        keys.map((k, i) => (
          <span key={i} className="inline-block">
            {k}
          </span>
        ))
      ) : (
        children
      )}
    </kbd>
  );
}
