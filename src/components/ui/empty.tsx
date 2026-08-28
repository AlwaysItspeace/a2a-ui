import * as React from "react";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export interface EmptyProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export function Empty({
  icon = <Inbox className="h-6 w-6 text-zinc-400" />,
  title = "No data found",
  description = "Get started by creating a new entry or updating your filters.",
  action,
  className,
  ...props
}: EmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-3xl border border-dashed border-zinc-800/80 bg-[#141418] select-none",
        className
      )}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1c1c21] border border-zinc-800/80 mb-3 text-white">
        {icon}
      </div>
      <h3 className="text-sm font-extrabold text-white">
        {title}
      </h3>
      <p className="mt-1 max-w-sm text-xs text-zinc-400 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
