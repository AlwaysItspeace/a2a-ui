import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";

export interface DirectionProps extends React.HTMLAttributes<HTMLDivElement> {
  dir?: "ltr" | "rtl";
  onDirChange?: (dir: "ltr" | "rtl") => void;
  showToggle?: boolean;
}

export function Direction({
  dir = "ltr",
  onDirChange,
  showToggle = false,
  children,
  className,
  ...props
}: DirectionProps) {
  const [currentDir, setCurrentDir] = React.useState(dir);

  const toggle = () => {
    const next = currentDir === "ltr" ? "rtl" : "ltr";
    setCurrentDir(next);
    onDirChange?.(next);
  };

  return (
    <div
      dir={currentDir}
      className={cn(
        "relative rounded-3xl border border-zinc-800/80 bg-[#141418] p-5 select-none space-y-3",
        className
      )}
      {...props}
    >
      {showToggle && (
        <div className="flex justify-between items-center pb-2 border-b border-zinc-800/80">
          <span className="text-[11px] font-mono font-bold text-zinc-400">
            TEXT_DIRECTION: {currentDir.toUpperCase()}
          </span>
          <button
            type="button"
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-[#1c1c21] border border-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
            <span>Switch to {currentDir === "ltr" ? "RTL" : "LTR"}</span>
          </button>
        </div>
      )}
      <div className="text-xs leading-relaxed text-zinc-300">{children}</div>
    </div>
  );
}
