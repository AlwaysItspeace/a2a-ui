import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "segmented";
}

export function ButtonGroup({
  children,
  variant = "segmented",
  className,
  ...props
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full p-1 bg-[#141418] border border-zinc-800/80 shadow-sm select-none gap-1",
        className
      )}
      role="group"
      {...props}
    >
      {children}
    </div>
  );
}
