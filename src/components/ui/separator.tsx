import * as React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  label?: React.ReactNode;
}

export function Separator({
  className,
  orientation = "horizontal",
  label,
  ...props
}: SeparatorProps) {
  if (label && orientation === "horizontal") {
    return (
      <div className={cn("flex items-center my-3 w-full select-none", className)} {...props}>
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
        <span className="px-2.5 text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {label}
        </span>
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      className={cn(
        "shrink-0 bg-zinc-200 dark:bg-zinc-800",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  );
}
