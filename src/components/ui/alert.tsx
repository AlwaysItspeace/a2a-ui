import * as React from "react";
import { cn } from "@/lib/utils";
import { Info, X } from "lucide-react";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: "default" | "info" | "success" | "warning" | "destructive";
  title?: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function Alert({
  className,
  variant = "default",
  title,
  icon,
  dismissible,
  onDismiss,
  children,
  ...props
}: AlertProps) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(
        "relative flex items-start gap-3.5 rounded-2xl border p-4 text-xs transition-colors",
        "border-zinc-300 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 text-zinc-950 dark:text-zinc-50",
        className
      )}
      {...props}
    >
      <div className="mt-0.5 shrink-0">{icon || <Info className="h-4 w-4 text-zinc-950 dark:text-zinc-50" />}</div>
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-bold leading-none tracking-tight">{title}</h5>}
        <div className="text-[12px] leading-relaxed text-zinc-600 dark:text-zinc-400">
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors p-1"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
