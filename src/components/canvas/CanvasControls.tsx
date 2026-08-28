import * as React from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Grid,
  Map,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface CanvasControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onFitAll: () => void;
  onAutoArrange: () => void;
  showMinimap: boolean;
  onToggleMinimap: () => void;
  gridType: "dot" | "line" | "none";
  onToggleGrid: () => void;
}

export function CanvasControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onFitAll,
  onAutoArrange,
  showMinimap,
  onToggleMinimap,
  gridType,
  onToggleGrid,
}: CanvasControlsProps) {
  const percentage = Math.round(zoom * 100);

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 p-1.5 rounded-full border border-zinc-800/80 bg-[#121215]/95 shadow-2xl backdrop-blur-xl select-none">
      {/* Zoom Out */}
      <button
        type="button"
        onClick={onZoomOut}
        title="Zoom Out"
        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-[#202026] active:scale-95 transition-all"
      >
        <ZoomOut className="h-4 w-4" />
      </button>

      {/* Percentage Readout / Reset */}
      <button
        type="button"
        onClick={onResetZoom}
        title="Reset zoom to 100%"
        className="px-2.5 py-1 rounded-full font-mono text-[11px] font-bold text-zinc-300 hover:text-white hover:bg-[#202026] active:scale-95 transition-all"
      >
        {percentage}%
      </button>

      {/* Zoom In */}
      <button
        type="button"
        onClick={onZoomIn}
        title="Zoom In"
        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-[#202026] active:scale-95 transition-all"
      >
        <ZoomIn className="h-4 w-4" />
      </button>

      <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

      {/* Auto Arrange Layout */}
      <button
        type="button"
        onClick={onAutoArrange}
        title="Auto-Arrange Layout"
        className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full text-zinc-300 hover:text-white hover:bg-[#202026] active:scale-95 transition-all"
      >
        <Sparkles className="h-3.5 w-3.5" />
        <span>Organize</span>
      </button>

      {/* Fit Screen */}
      <button
        type="button"
        onClick={onFitAll}
        title="Fit all components"
        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-[#202026] active:scale-95 transition-all"
      >
        <Maximize2 className="h-4 w-4" />
      </button>

      {/* Grid Switcher */}
      <button
        type="button"
        onClick={onToggleGrid}
        title={`Grid style: ${gridType}`}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full active:scale-95 transition-all",
          gridType !== "none"
            ? "text-white bg-[#202026]"
            : "text-zinc-400 hover:text-white hover:bg-[#202026]"
        )}
      >
        <Grid className="h-4 w-4" />
      </button>

      {/* Minimap Toggle */}
      <button
        type="button"
        onClick={onToggleMinimap}
        title="Toggle Radar Minimap"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full active:scale-95 transition-all",
          showMinimap
            ? "text-white bg-[#202026]"
            : "text-zinc-400 hover:text-white hover:bg-[#202026]"
        )}
      >
        <Map className="h-4 w-4" />
      </button>
    </div>
  );
}
