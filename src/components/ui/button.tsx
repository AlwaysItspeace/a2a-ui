import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link"
    | "subtle";
  size?: "default" | "sm" | "lg" | "xs" | "icon";
  pill?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      pill = true,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-bold tracking-tight transition-all duration-150 select-none disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97] outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-200 ring-offset-2 ring-offset-background";

    const variants: Record<string, string> = {
      default:
        "bg-white text-black hover:bg-zinc-200 shadow-sm border border-transparent",
      secondary:
        "bg-[#1c1c21] text-zinc-100 hover:bg-[#25252b] border border-zinc-800/80 shadow-xs",
      outline:
        "border border-zinc-700/80 bg-transparent hover:bg-zinc-800/60 text-zinc-200",
      ghost:
        "bg-transparent hover:bg-zinc-800/60 text-zinc-400 hover:text-zinc-100",
      destructive:
        "bg-[#1c1c21] text-zinc-100 border border-zinc-800 hover:bg-zinc-800",
      subtle:
        "bg-zinc-800/70 text-zinc-200 hover:bg-zinc-700/70 border border-zinc-700/50",
      link: "text-zinc-100 underline-offset-4 hover:underline p-0 h-auto bg-transparent",
    };

    const sizes: Record<string, string> = {
      xs: "h-7 px-3 text-xs gap-1.5",
      sm: "h-8 px-3.5 text-xs gap-1.5",
      default: "h-9 px-4 text-xs gap-2",
      lg: "h-11 px-5 text-sm gap-2.5",
      icon: "h-9 w-9 p-0 shrink-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          pill ? "rounded-full" : "rounded-xl",
          className
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
