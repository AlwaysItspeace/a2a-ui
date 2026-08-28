import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  maxHeight?: number | string;
  horizontal?: boolean;
}

export function ScrollArea({
  children,
  maxHeight = 220,
  horizontal = false,
  className,
  style,
  ...props
}: ScrollAreaProps) {
  return (
    <div
      style={{
        maxHeight: typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight,
        ...style,
      }}
      className={cn(
        "relative overflow-y-auto p-4 rounded-3xl border border-zinc-800/80 bg-[#141418] select-none",
        horizontal && "overflow-x-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
