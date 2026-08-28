import * as React from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export interface ResizableProps {
  left: React.ReactNode;
  right: React.ReactNode;
  initialSplit?: number;
  className?: string;
}

export function Resizable({
  left,
  right,
  initialSplit = 50,
  className,
}: ResizableProps) {
  const [split, setSplit] = React.useState(initialSplit);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newSplit =
        ((moveEvent.clientX - rect.left) / rect.width) * 100;
      setSplit(Math.min(Math.max(newSplit, 20), 80));
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex w-full h-44 rounded-3xl border border-zinc-800/80 bg-[#121215] overflow-hidden select-none",
        className
      )}
    >
      <div style={{ width: `${split}%` }} className="h-full p-4 overflow-auto bg-[#141418]">
        {left}
      </div>

      {/* Center Drag Divider */}
      <div
        onMouseDown={handleMouseDown}
        className="group relative flex w-3 cursor-col-resize items-center justify-center bg-[#1c1c21] hover:bg-white hover:text-black transition-colors"
      >
        <GripVertical className="h-3.5 w-3.5 text-zinc-500 group-hover:text-black transition-colors" />
      </div>

      <div
        style={{ width: `${100 - split}%` }}
        className="h-full p-4 overflow-auto bg-[#141418]"
      >
        {right}
      </div>
    </div>
  );
}
