import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
}: SliderProps) {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);

  return (
    <div className={cn("relative w-full flex items-center select-none py-3", className)}>
      <div className="relative w-full h-2 rounded-full bg-[#1c1c21] border border-zinc-800/80 overflow-hidden">
        <div
          style={{ width: `${percentage}%` }}
          className="h-full bg-white transition-all duration-75 ease-out rounded-full"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
      />
      {/* High radius rectangle thumb */}
      <div
        style={{ left: `calc(${percentage}% - 6px)` }}
        className="absolute h-5 w-3 rounded-md bg-white border border-zinc-300 shadow-md pointer-events-none transition-transform duration-75 ease-out"
      />
    </div>
  );
}
