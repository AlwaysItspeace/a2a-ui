import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputGroupProps {
  prefixAddon?: React.ReactNode;
  suffixAddon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function InputGroup({
  prefixAddon,
  suffixAddon,
  children,
  className,
}: InputGroupProps) {
  return (
    <div
      className={cn(
        "flex items-center w-full rounded-2xl border border-zinc-800/80 bg-[#1c1c21] focus-within:border-zinc-500 transition-colors overflow-hidden",
        className
      )}
    >
      {prefixAddon && (
        <div className="flex items-center px-4 h-10 text-xs font-mono text-zinc-400 select-none shrink-0 bg-[#16161b] border-r border-zinc-800/80">
          {prefixAddon}
        </div>
      )}
      <div className="flex-1 min-w-0 [&_input]:border-none [&_input]:bg-transparent [&_input]:rounded-none [&_input]:h-10 [&_input]:px-3 [&_input]:focus-visible:ring-0 [&_input]:text-xs">
        {children}
      </div>
      {suffixAddon && (
        <div className="flex items-center pr-2 shrink-0">
          {suffixAddon}
        </div>
      )}
    </div>
  );
}
