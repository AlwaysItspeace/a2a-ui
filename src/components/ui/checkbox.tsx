import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";
import { motion } from "framer-motion";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "checked"> {
  checked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: boolean;
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  description,
  disabled,
  error,
  className,
  ...props
}: CheckboxProps) {
  const isIndeterminate = checked === "indeterminate";
  const isChecked = checked === true;

  const handleClick = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!isChecked);
    }
  };

  return (
    <label
      className={cn(
        "inline-flex items-start gap-3 cursor-pointer select-none",
        disabled && "cursor-not-allowed opacity-40",
        className
      )}
      onClick={(e) => {
        e.preventDefault();
        handleClick();
      }}
    >
      <motion.div
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 mt-0.5",
          isChecked || isIndeterminate
            ? "bg-white text-black border-white shadow-xs"
            : "bg-[#1c1c21] border-zinc-700/80 hover:border-zinc-500",
          error && "border-zinc-400"
        )}
      >
        {isChecked && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </motion.div>
        )}
        {isIndeterminate && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <Minus className="h-3 w-3 stroke-[3]" />
          </motion.div>
        )}
      </motion.div>
      {(label || description) && (
        <div className="space-y-0.5 text-left">
          {label && (
            <div className="text-xs font-bold text-zinc-100">{label}</div>
          )}
          {description && (
            <div className="text-[11px] text-zinc-400 leading-normal">
              {description}
            </div>
          )}
        </div>
      )}
    </label>
  );
}
