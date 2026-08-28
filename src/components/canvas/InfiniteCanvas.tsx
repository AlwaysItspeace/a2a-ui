import * as React from "react";
import { cn } from "@/lib/utils";
import { ComponentMeta } from "@/types";
import { CanvasCard } from "./CanvasCard";
import { CanvasControls } from "./CanvasControls";
import { Minimap } from "./Minimap";

export interface InfiniteCanvasProps {
  components: ComponentMeta[];
  onInspect: (meta: ComponentMeta) => void;
}

export function InfiniteCanvas({ components, onInspect }: InfiniteCanvasProps) {
  // Viewport transformation state
  const [zoom, setZoom] = React.useState(0.85);
  const [pan, setPan] = React.useState({ x: 80, y: 60 });
  const [showMinimap, setShowMinimap] = React.useState(true);
  const [gridType, setGridType] = React.useState<"dot" | "line" | "none">("dot");
  const [pinnedIds, setPinnedIds] = React.useState<Set<string>>(new Set());

  // Positions of cards in the canvas coordinate system
  const [positions, setPositions] = React.useState<Record<string, { x: number; y: number }>>({});

  // Auto-arrange layout by category in neat spatial clusters with generous spacing
  const autoArrange = React.useCallback(() => {
    const cardWidth = 490;
    const cardHeight = 390;
    const cols = 4;
    const nextPos: Record<string, { x: number; y: number }> = {};

    components.forEach((comp, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      nextPos[comp.id] = {
        x: col * cardWidth + 100,
        y: row * cardHeight + 100,
      };
    });

    setPositions(nextPos);
  }, [components]);

  React.useEffect(() => {
    autoArrange();
  }, [autoArrange]);

  // Pan dragging state
  const isPanning = React.useRef(false);
  const startPan = React.useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      (e.target as HTMLElement).closest(".no-pan") ||
      (e.button !== 0 && e.button !== 1)
    ) {
      return;
    }

    if ((e.target as HTMLElement).classList.contains("canvas-background") || e.button === 1) {
      isPanning.current = true;
      startPan.current = {
        x: e.clientX - pan.x,
        y: e.clientY - pan.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPanning.current) return;
    setPan({
      x: e.clientX - startPan.current.x,
      y: e.clientY - startPan.current.y,
    });
  };

  const handleMouseUp = () => {
    isPanning.current = false;
  };

  // Zooming via mouse wheel
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey || (e.target as HTMLElement).classList.contains("canvas-background")) {
      e.preventDefault();
      const zoomFactor = 1.1;
      let newZoom = e.deltaY < 0 ? zoom * zoomFactor : zoom / zoomFactor;
      newZoom = Math.min(Math.max(newZoom, 0.25), 2.0);

      // Zoom towards mouse pointer
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const newPanX = mouseX - (mouseX - pan.x) * (newZoom / zoom);
      const newPanY = mouseY - (mouseY - pan.y) * (newZoom / zoom);

      setZoom(newZoom);
      setPan({ x: newPanX, y: newPanY });
    }
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { x, y },
    }));
  };

  const handleTogglePin = (id: string) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleFitAll = () => {
    setPan({ x: 80, y: 60 });
    setZoom(0.85);
  };

  const toggleGrid = () => {
    setGridType((prev) => {
      if (prev === "dot") return "line";
      if (prev === "line") return "none";
      return "dot";
    });
  };

  const minimapNodes = components.map((c) => ({
    id: c.id,
    x: positions[c.id]?.x || 0,
    y: positions[c.id]?.y || 0,
    width: 440,
    height: 320,
  }));

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      className={cn(
        "relative w-full h-[calc(100vh-100px)] overflow-hidden cursor-default select-none canvas-background bg-[#09090b]",
        gridType === "dot" && "canvas-grid-dot",
        gridType === "line" && "canvas-grid-line"
      )}
    >
      {/* Scaled & Panned Canvas Viewport Container */}
      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
        className="absolute top-0 left-0 w-full h-full pointer-events-auto"
      >
        {components.map((meta) => {
          const pos = positions[meta.id] || { x: 0, y: 0 };
          return (
            <CanvasCard
              key={meta.id}
              meta={meta}
              x={pos.x}
              y={pos.y}
              pinned={pinnedIds.has(meta.id)}
              onDragEnd={handleDragEnd}
              onInspect={onInspect}
              onTogglePin={handleTogglePin}
            />
          );
        })}
      </div>

      {/* Floating Canvas Controls */}
      <CanvasControls
        zoom={zoom}
        onZoomIn={() => setZoom((z) => Math.min(z * 1.15, 2.0))}
        onZoomOut={() => setZoom((z) => Math.max(z / 1.15, 0.25))}
        onResetZoom={() => setZoom(1.0)}
        onFitAll={handleFitAll}
        onAutoArrange={autoArrange}
        showMinimap={showMinimap}
        onToggleMinimap={() => setShowMinimap(!showMinimap)}
        gridType={gridType}
        onToggleGrid={toggleGrid}
      />

      {/* Floating Minimap */}
      {showMinimap && (
        <Minimap
          nodes={minimapNodes}
          viewportX={pan.x}
          viewportY={pan.y}
          zoom={zoom}
          onNavigate={(targetX, targetY) => setPan({ x: targetX, y: targetY })}
        />
      )}

      {/* Spatial Canvas Hint Banner */}
      <div className="absolute top-4 left-6 z-30 pointer-events-none text-xs font-mono text-zinc-500 bg-[#121215]/90 border border-zinc-800 px-4 py-1.5 rounded-full backdrop-blur-md">
        DRAG BACKGROUND TO PAN • SCROLL TO ZOOM • DRAG CARDS FREELY
      </div>
    </div>
  );
}
