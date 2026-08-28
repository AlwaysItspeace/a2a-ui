import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps {
  value?: number;
  max?: number;
  className?: string;
}

export function Progress({
  value = 0,
  max = 100,
  className,
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={cn(
        "relative w-full h-2.5 rounded-full bg-[#1c1c21] border border-zinc-800/80 overflow-hidden select-none",
        className
      )}
    >
      <div
        style={{ width: `${percentage}%` }}
        className="h-full bg-white rounded-full transition-all duration-300 ease-out"
      />
    </div>
  );
}
