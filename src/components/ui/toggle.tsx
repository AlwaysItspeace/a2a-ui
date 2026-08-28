import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function Toggle({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  disabled = false,
  size = "default",
  variant = "default",
  children,
  className,
}: ToggleProps) {
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed);
  const isPressed = controlledPressed !== undefined ? controlledPressed : internalPressed;

  const handleClick = () => {
    if (disabled) return;
    const next = !isPressed;
    setInternalPressed(next);
    onPressedChange?.(next);
  };

  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5",
    default: "h-9 px-4 text-xs gap-2",
    lg: "h-11 px-5 text-sm gap-2.5",
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: disabled ? 1 : 0.94 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-full font-bold select-none transition-colors duration-150 border",
        sizes[size],
        isPressed
          ? "bg-white text-black border-white shadow-sm"
          : "bg-[#18181d] text-zinc-300 border-zinc-800 hover:text-white hover:bg-[#202026] hover:border-zinc-700",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
