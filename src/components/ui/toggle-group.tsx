import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ToggleOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface ToggleGroupProps {
  options: ToggleOption[];
  value?: string;
  onChange?: (val: string) => void;
  className?: string;
}

export function ToggleGroup({
  options,
  value,
  onChange,
  className,
}: ToggleGroupProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full p-1 border border-zinc-800/80 bg-[#16161a] shadow-sm select-none gap-1",
        className
      )}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange?.(opt.value)}
            className={cn(
              "relative px-4 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1.5 z-10 active:scale-95",
              isSelected ? "text-black" : "text-zinc-400 hover:text-white"
            )}
          >
            {opt.icon}
            <span>{opt.label}</span>
            {isSelected && (
              <motion.div
                layoutId="toggle-group-active"
                className="absolute inset-0 rounded-full bg-white shadow-xs -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 20, bounce: 0.35 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
