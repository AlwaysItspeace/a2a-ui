import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "dot"
    | "counter"
    | "subtle";
  size?: "default" | "sm" | "lg";
  dotColor?: string;
}

export function Badge({
  className,
  variant = "default",
  size = "default",
  dotColor,
  children,
  ...props
}: BadgeProps) {
  const variants = {
    default:
      "bg-white text-black font-bold shadow-xs border-transparent",
    secondary:
      "bg-[#1c1c21] text-zinc-100 border-zinc-800 font-semibold",
    outline:
      "border-zinc-700/80 text-zinc-200 bg-transparent font-medium",
    subtle:
      "bg-zinc-800/80 text-zinc-300 border-zinc-700/50 font-medium",
    dot: "border-zinc-800 bg-[#1c1c21] text-zinc-200 gap-1.5 font-medium",
    counter:
      "bg-white text-black rounded-full px-2 font-mono text-[10px] font-bold",
  };

  const sizes = {
    sm: "text-[10px] px-2.5 py-0.5 rounded-full font-mono tracking-tight",
    default: "text-xs px-3 py-1 rounded-full font-bold tracking-tight",
    lg: "text-sm px-4 py-1.5 rounded-full font-bold",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center border select-none transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {variant === "dot" && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            dotColor || "bg-white"
          )}
        />
      )}
      {children}
    </div>
  );
}
