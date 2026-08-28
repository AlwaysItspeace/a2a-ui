import * as React from "react";
import { cn } from "@/lib/utils";
import { ComponentMeta } from "@/types";
import { ComponentShowcase } from "@/components/showcases/ComponentShowcase";
import { Code, GripVertical, Pin, Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface CanvasCardProps {
  meta: ComponentMeta;
  x: number;
  y: number;
  pinned?: boolean;
  onDragEnd: (id: string, x: number, y: number) => void;
  onInspect: (meta: ComponentMeta) => void;
  onTogglePin?: (id: string) => void;
}

export function CanvasCard({
  meta,
  x,
  y,
  pinned = false,
  onDragEnd,
  onInspect,
  onTogglePin,
}: CanvasCardProps) {
  const [copied, setCopied] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x, y });
  const isDragging = React.useRef(false);
  const dragStart = React.useRef({ mouseX: 0, mouseY: 0, initX: 0, initY: 0 });

  React.useEffect(() => {
    setPosition({ x, y });
  }, [x, y]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (pinned) return;
    if ((e.target as HTMLElement).closest(".no-drag")) return;

    isDragging.current = true;
    dragStart.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      initX: position.x,
      initY: position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = moveEvent.clientX - dragStart.current.mouseX;
      const dy = moveEvent.clientY - dragStart.current.mouseY;
      setPosition({
        x: dragStart.current.initX + dx,
        y: dragStart.current.initY + dy,
      });
    };

    const handleMouseUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        onDragEnd(meta.id, position.x, position.y);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(meta.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      ref={cardRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: "absolute",
        top: 0,
        left: 0,
      }}
      className={cn(
        "w-[440px] rounded-3xl border border-zinc-800/80 bg-[#121215] shadow-2xl transition-shadow duration-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden",
        "focus-within:border-zinc-700"
      )}
    >
      {/* Card Header & Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        className={cn(
          "flex items-center justify-between px-6 py-4 border-b border-zinc-800/60 bg-[#141418] select-none",
          !pinned ? "cursor-grab active:cursor-grabbing" : "cursor-default"
        )}
      >
        <div className="flex items-center gap-2.5">
          {!pinned && (
            <GripVertical className="h-4 w-4 text-zinc-500 opacity-60" />
          )}
          <span className="font-extrabold text-sm text-zinc-100 tracking-tight">
            {meta.name}
          </span>
          <Badge variant="secondary" size="sm" className="text-[10px]">
            {meta.category.split(" ")[0]}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 no-drag">
          <button
            type="button"
            onClick={handleCopyCode}
            title="Copy component code"
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-[#202026] transition-colors"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-white" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onInspect(meta);
            }}
            title="Inspect Code & API Docs"
            className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-[#202026] transition-colors"
          >
            <Code className="h-3.5 w-3.5" />
          </button>

          {onTogglePin && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onTogglePin(meta.id);
              }}
              title={pinned ? "Unpin card" : "Pin card position"}
              className={cn(
                "p-1.5 rounded-full transition-colors",
                pinned
                  ? "text-white bg-zinc-800"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-[#202026]"
              )}
            >
              <Pin className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Live Interactive Component Showcase Canvas */}
      <div className="p-6 no-drag min-h-[160px] flex items-center justify-center bg-[#121215] overflow-visible">
        <ComponentShowcase id={meta.id} />
      </div>

      {/* Card Micro Description */}
      <div className="px-6 py-3 border-t border-zinc-800/60 bg-[#141418] text-xs text-zinc-400 flex items-center justify-between no-drag">
        <span className="truncate max-w-[280px]">{meta.description}</span>
        <button
          type="button"
          onClick={() => onInspect(meta)}
          className="text-zinc-200 font-bold hover:text-white hover:underline text-[11px] uppercase font-mono tracking-wider shrink-0"
        >
          DOCS ?
        </button>
      </div>
    </div>
  );
}
