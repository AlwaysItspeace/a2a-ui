import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  clearable?: boolean;
  onClear?: () => void;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      leftIcon,
      rightIcon,
      clearable,
      onClear,
      error,
      value,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative inline-flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          value={value}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-xl border px-3.5 py-2 text-xs transition-colors duration-150",
            "bg-[#1c1c21] border-zinc-800/80 text-zinc-100 placeholder:text-zinc-500",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 focus-visible:border-zinc-500",
            "disabled:cursor-not-allowed disabled:opacity-40",
            leftIcon && "pl-9",
            (rightIcon || clearable) && "pr-9",
            error && "border-zinc-500 ring-1 ring-zinc-500",
            className
          )}
          {...props}
        />
        {clearable && value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3.5 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {!clearable && rightIcon && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-zinc-500">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";
