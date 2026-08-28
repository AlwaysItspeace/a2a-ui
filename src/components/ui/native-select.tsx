import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  NativeSelectProps
>(({ className, error, children, ...props }, ref) => {
  return (
    <div className="relative inline-flex items-center w-full">
      <select
        ref={ref}
        className={cn(
          "flex h-10 w-full appearance-none rounded-2xl border px-4 py-2 text-xs font-semibold transition-colors duration-150 cursor-pointer pr-10",
          "bg-[#1c1c21] border-zinc-800/80 text-zinc-100",
          "focus-visible:outline-none focus-visible:border-zinc-500",
          "disabled:cursor-not-allowed disabled:opacity-40",
          error && "border-zinc-500 ring-1 ring-zinc-500",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3.5 h-4 w-4 pointer-events-none text-zinc-400" />
    </div>
  );
});
NativeSelect.displayName = "NativeSelect";
