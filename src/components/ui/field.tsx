import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}

export function Field({
  label,
  hint,
  error,
  required,
  optional,
  className,
  children,
  ...props
}: FieldProps) {
  return (
    <div className={cn("space-y-1.5 w-full", className)} {...props}>
      {label && (
        <Label required={required} optional={optional}>
          {label}
        </Label>
      )}
      {children}
      {hint && !error && (
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-none">
          {hint}
        </p>
      )}
      {error && (
        <p className="text-[11px] font-medium text-red-500 dark:text-red-400 leading-none">
          {error}
        </p>
      )}
    </div>
  );
}
