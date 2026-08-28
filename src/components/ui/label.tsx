import * as React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optional?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, optional, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-xs font-medium leading-none text-zinc-900 dark:text-zinc-200 select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1",
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-zinc-500 font-mono">*</span>}
        {optional && (
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-normal">
            (optional)
          </span>
        )}
      </label>
    );
  }
);
Label.displayName = "Label";
