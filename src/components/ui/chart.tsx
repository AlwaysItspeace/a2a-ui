import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom Monochrome Tooltip
export function ChartTooltipContent({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-[#121215] p-3 shadow-2xl text-xs select-none min-w-[120px]">
        {label && (
          <p className="font-mono text-[10px] uppercase text-zinc-400 mb-1.5 font-bold tracking-wider">
            {label}
          </p>
        )}
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full border border-zinc-600"
                  style={{ backgroundColor: entry.color || "#ffffff" }}
                />
                <span className="text-zinc-400 font-medium">
                  {entry.name}:
                </span>
              </div>
              <span className="font-mono font-bold text-zinc-100">
                {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export function MetricBarChart({
  data,
  category = "value",
  height = 180,
  barSize = 38,
}: {
  data: Array<{ name: string; value: number; highlight?: boolean }>;
  category?: string;
  height?: number;
  barSize?: number;
}) {
  const [hoverIndex, setHoverIndex] = React.useState<number | null>(null);

  return (
    <div className="w-full relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          onMouseMove={(state) => {
            if (state.isTooltipActive && typeof state.activeTooltipIndex === "number") {
              setHoverIndex(state.activeTooltipIndex);
            } else {
              setHoverIndex(null);
            }
          }}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <XAxis
            dataKey="name"
            stroke="rgba(160, 160, 160, 0.6)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          {/* Transparent cursor so background is never grayed out on hover */}
          <Tooltip cursor={{ fill: "transparent" }} content={<ChartTooltipContent />} />
          <Bar
            dataKey={category}
            barSize={barSize}
            radius={[10, 10, 10, 10]}
          >
            {data.map((entry, index) => {
              const isHovered = hoverIndex === index;
              let fill = entry.highlight ? "#ffffff" : "#3f3f46";
              if (isHovered) {
                fill = entry.highlight ? "#e4e4e7" : "#52525b";
              }
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={fill}
                  className="transition-colors duration-150 cursor-pointer"
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MetricAreaChart({
  data,
  categories,
  colors = ["#ffffff", "#71717a"],
  height = 180,
}: {
  data: any[];
  categories: string[];
  colors?: string[];
  height?: number;
}) {
  return (
    <div className="w-full relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            {categories.map((cat, i) => (
              <linearGradient
                key={cat}
                id={`grad-${cat}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={colors[i % colors.length]}
                  stopOpacity={0.4}
                />
                <stop
                  offset="95%"
                  stopColor={colors[i % colors.length]}
                  stopOpacity={0.0}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(140, 140, 140, 0.12)"
          />
          <XAxis
            dataKey="name"
            stroke="rgba(160, 160, 160, 0.5)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(160, 160, 160, 0.5)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
            content={<ChartTooltipContent />}
          />
          {categories.map((cat, i) => (
            <Area
              key={cat}
              type="monotone"
              dataKey={cat}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#grad-${cat})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MetricLineChart({
  data,
  categories,
  colors = ["#ffffff", "#71717a"],
  height = 180,
}: {
  data: any[];
  categories: string[];
  colors?: string[];
  height?: number;
}) {
  return (
    <div className="w-full relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(140, 140, 140, 0.12)"
          />
          <XAxis
            dataKey="name"
            stroke="rgba(160, 160, 160, 0.5)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(160, 160, 160, 0.5)"
            fontSize={11}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ stroke: "rgba(255,255,255,0.2)", strokeWidth: 1 }}
            content={<ChartTooltipContent />}
          />
          {categories.map((cat, i) => (
            <Line
              key={cat}
              type="monotone"
              dataKey={cat}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ r: 4, fill: colors[i % colors.length] }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MetricDonutChart({
  data,
  height = 150,
}: {
  data: Array<{ name: string; value: number; color?: string }>;
  height?: number;
}) {
  const defaultColors = ["#ffffff", "#a1a1aa", "#52525b", "#27272a"];

  return (
    <div className="w-full flex items-center justify-center overflow-visible" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={36}
            outerRadius={56}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || defaultColors[index % defaultColors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MetricRadarChart({
  data,
  height = 180,
}: {
  data: Array<{ subject: string; A: number; B: number }>;
  height?: number;
}) {
  return (
    <div className="w-full relative flex items-center justify-center" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius={56} data={data}>
          <PolarGrid stroke="rgba(140, 140, 140, 0.2)" />
          <PolarAngleAxis
            dataKey="subject"
            fontSize={10}
            stroke="rgba(160, 160, 160, 0.7)"
          />
          <PolarRadiusAxis fontSize={9} stroke="rgba(140, 140, 140, 0.3)" />
          <Radar
            name="Primary"
            dataKey="A"
            stroke="#ffffff"
            fill="#ffffff"
            fillOpacity={0.35}
          />
          <Radar
            name="Secondary"
            dataKey="B"
            stroke="#71717a"
            fill="#71717a"
            fillOpacity={0.2}
          />
          <Tooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function Sparkline({
  data,
  color = "#ffffff",
  height = 36,
  width = 130,
}: {
  data: number[];
  color?: string;
  height?: number;
  width?: number | string;
}) {
  const chartData = data.map((val, i) => ({ index: i, value: val }));

  return (
    <div style={{ height, width: typeof width === "number" ? `${width}px` : width }} className="relative">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
