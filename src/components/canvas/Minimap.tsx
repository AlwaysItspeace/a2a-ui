import * as React from "react";

export interface MinimapProps {
  nodes: Array<{ id: string; x: number; y: number; width: number; height: number }>;
  viewportX: number;
  viewportY: number;
  zoom: number;
  onNavigate: (x: number, y: number) => void;
}

export function Minimap({
  nodes,
  viewportX,
  viewportY,
  zoom,
  onNavigate,
}: MinimapProps) {
  const mapWidth = 180;
  const mapHeight = 130;
  const worldWidth = 3200;
  const worldHeight = 2400;

  const scaleX = mapWidth / worldWidth;
  const scaleY = mapHeight / worldHeight;

  const vpW = Math.min((window.innerWidth / zoom) * scaleX, mapWidth);
  const vpH = Math.min((window.innerHeight / zoom) * scaleY, mapHeight);
  const vpX = Math.max(Math.min((-viewportX / zoom) * scaleX, mapWidth - vpW), 0);
  const vpY = Math.max(Math.min((-viewportY / zoom) * scaleY, mapHeight - vpH), 0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const targetWorldX = clickX / scaleX;
    const targetWorldY = clickY / scaleY;

    const newPanX = -(targetWorldX * zoom) + window.innerWidth / 2;
    const newPanY = -(targetWorldY * zoom) + window.innerHeight / 2;

    onNavigate(newPanX, newPanY);
  };

  return (
    <div
      onClick={handleClick}
      className="absolute bottom-6 right-6 z-30 w-[180px] h-[130px] rounded-3xl border border-zinc-800/80 bg-[#121215]/95 backdrop-blur-xl shadow-2xl p-2 cursor-crosshair select-none overflow-hidden"
    >
      <div className="relative w-full h-full rounded-2xl bg-[#09090b] border border-zinc-800/50 overflow-hidden">
        {/* Node dots */}
        {nodes.map((node) => {
          const nx = node.x * scaleX;
          const ny = node.y * scaleY;
          const nw = Math.max(node.width * scaleX, 4);
          const nh = Math.max(node.height * scaleY, 3);
          return (
            <div
              key={node.id}
              style={{
                left: `${nx}px`,
                top: `${ny}px`,
                width: `${nw}px`,
                height: `${nh}px`,
              }}
              className="absolute bg-zinc-600/80 rounded-sm"
            />
          );
        })}

        {/* Viewport radar box */}
        <div
          style={{
            left: `${vpX}px`,
            top: `${vpY}px`,
            width: `${vpW}px`,
            height: `${vpH}px`,
          }}
          className="absolute border border-white bg-white/10 rounded-sm pointer-events-none transition-all duration-75 ease-out"
        />
      </div>
    </div>
  );
}
