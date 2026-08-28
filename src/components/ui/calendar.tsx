import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    selected ? new Date(selected) : new Date()
  );

  const daysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) =>
    new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const totalDays = daysInMonth(year, month);
  const firstDay = firstDayOfMonth(year, month);

  const prevMonth = () =>
    setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () =>
    setCurrentMonth(new Date(year, month + 1, 1));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div
      className={cn(
        "p-4 rounded-3xl border border-zinc-800/80 bg-[#141418] select-none shadow-xl w-72 text-zinc-100",
        className
      )}
    >
      {/* Month & Year Navigation */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-extrabold text-white">
          {monthNames[month]} {year}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekDays.map((d) => (
          <div key={d} className="text-[10px] font-mono font-bold text-zinc-500">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 w-8" />
        ))}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const isSelected =
            selected &&
            selected.getDate() === day &&
            selected.getMonth() === month &&
            selected.getFullYear() === year;

          return (
            <motion.button
              key={day}
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelect?.(new Date(year, month, day))}
              className={cn(
                "h-8 w-8 rounded-full text-xs font-bold transition-colors flex items-center justify-center",
                isSelected
                  ? "bg-white text-black shadow-sm font-extrabold"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              )}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
