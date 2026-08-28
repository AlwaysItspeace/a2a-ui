import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "p"
    | "lead"
    | "muted"
    | "code"
    | "mono"
    | "blockquote";
  children: React.ReactNode;
}

export function Typography({
  variant = "p",
  className,
  children,
  ...props
}: TypographyProps) {
  const styles: Record<string, string> = {
    h1: "scroll-m-20 text-3xl font-extrabold tracking-tight text-white",
    h2: "scroll-m-20 text-2xl font-bold tracking-tight text-white",
    h3: "scroll-m-20 text-xl font-bold tracking-tight text-white",
    h4: "scroll-m-20 text-base font-bold tracking-tight text-white",
    p: "leading-relaxed text-xs text-zinc-300",
    lead: "text-sm text-zinc-400 font-medium leading-relaxed",
    muted: "text-xs text-zinc-500",
    code: "relative rounded-2xl bg-[#1c1c21] border border-zinc-800 px-3 py-1.5 font-mono text-xs font-bold text-white",
    mono: "font-mono text-xs text-zinc-300",
    blockquote: "mt-4 border-l-2 border-zinc-600 pl-4 italic text-zinc-400 text-xs",
  };

  const Component: any =
    variant === "h1"
      ? "h1"
      : variant === "h2"
      ? "h2"
      : variant === "h3"
      ? "h3"
      : variant === "h4"
      ? "h4"
      : variant === "code"
      ? "code"
      : variant === "blockquote"
      ? "blockquote"
      : "p";

  return (
    <Component className={cn(styles[variant], className)} {...props}>
      {children}
    </Component>
  );
}
