import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  size?: "default" | "sm";
  className?: string;
}

export function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  label,
  size = "default",
  className,
}: SwitchProps) {
  const toggle = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  const isSm = size === "sm";

  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "cursor-not-allowed opacity-40",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
    >
      <div
        className={cn(
          "relative inline-flex items-center shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-out border",
          isSm ? "h-5 w-9" : "h-6 w-11",
          checked
            ? "bg-white border-white"
            : "bg-[#222228] border-zinc-700 hover:border-zinc-500"
        )}
      >
        <motion.div
          animate={{ x: checked ? (isSm ? 16 : 20) : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 28, bounce: 0.2 }}
          className={cn(
            "pointer-events-none rounded-full shadow-sm",
            isSm ? "h-3.5 w-3.5" : "h-5 w-5",
            checked ? "bg-black" : "bg-white"
          )}
        />
      </div>
      {label && <span className="text-xs font-bold text-zinc-100">{label}</span>}
    </label>
  );
}
