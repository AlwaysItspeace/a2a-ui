import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, error, showCount, maxLength, value, onChange, ...props },
    ref
  ) => {
    const [count, setCount] = React.useState(
      typeof value === "string" ? value.length : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          onChange={handleChange}
          className={cn(
            "flex min-h-[85px] w-full rounded-2xl border px-3.5 py-2.5 text-xs transition-colors duration-150 resize-none",
            "bg-[#1c1c21] border-zinc-800/80 text-zinc-100 placeholder:text-zinc-500",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:border-zinc-500",
            "disabled:cursor-not-allowed disabled:opacity-40",
            error && "border-zinc-500 ring-1 ring-zinc-500",
            className
          )}
          {...props}
        />
        {showCount && maxLength && (
          <div className="absolute right-3 bottom-2 text-[10px] font-mono text-zinc-500 select-none">
            {count}/{maxLength}
          </div>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
