import * as React from "react";
import { cn } from "@/lib/utils";

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number | "16/9" | "4/3" | "1/1" | "21/9";
}

export function AspectRatio({
  ratio = 16 / 9,
  className,
  children,
  style,
  ...props
}: AspectRatioProps) {
  let computedRatio = 16 / 9;
  if (typeof ratio === "number") {
    computedRatio = ratio;
  } else if (ratio === "16/9") {
    computedRatio = 16 / 9;
  } else if (ratio === "4/3") {
    computedRatio = 4 / 3;
  } else if (ratio === "1/1") {
    computedRatio = 1;
  } else if (ratio === "21/9") {
    computedRatio = 21 / 9;
  }

  const paddingBottom = `${(1 / computedRatio) * 100}%`;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121215]",
        className
      )}
      style={{ paddingBottom, ...style }}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>video]:w-full [&>video]:h-full [&>video]:object-cover">
        {children}
      </div>
    </div>
  );
}
