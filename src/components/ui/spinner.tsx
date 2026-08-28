import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "ring" | "dots" | "orbit" | "bars";
  size?: "sm" | "default" | "lg";
}

export function Spinner({
  className,
  variant = "ring",
  size = "default",
  ...props
}: SpinnerProps) {
  const sizeMap = {
    sm: "h-3.5 w-3.5",
    default: "h-5 w-5",
    lg: "h-8 w-8",
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-1", className)} {...props}>
        <div className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-bounce [animation-delay:-0.3s]" />
        <div className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-bounce [animation-delay:-0.15s]" />
        <div className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-bounce" />
      </div>
    );
  }

  if (variant === "bars") {
    return (
      <div className={cn("flex items-center gap-0.5 h-4", className)} {...props}>
        <div className="w-1 bg-zinc-900 dark:bg-zinc-100 animate-pulse h-full [animation-delay:-0.4s]" />
        <div className="w-1 bg-zinc-900 dark:bg-zinc-100 animate-pulse h-full [animation-delay:-0.2s]" />
        <div className="w-1 bg-zinc-900 dark:bg-zinc-100 animate-pulse h-full" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] text-zinc-900 dark:text-zinc-100",
        sizeMap[size],
        className
      )}
      role="status"
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
