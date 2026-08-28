import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarkerProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: "active" | "inactive" | "pending" | "alert";
  pulse?: boolean;
}

export function Marker({
  className,
  status = "active",
  pulse = true,
  children,
  ...props
}: MarkerProps) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center select-none py-1",
        className
      )}
      {...props}
    >
      <span className="relative flex h-3 w-3 items-center justify-center">
        {pulse && (
          <span className="absolute inline-flex h-full w-full animate-gentle-pulse rounded-full bg-white opacity-40" />
        )}
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-black bg-white" />
      </span>
      {children && (
        <span className="ml-2.5 text-xs font-bold text-zinc-200">
          {children}
        </span>
      )}
    </div>
  );
}
