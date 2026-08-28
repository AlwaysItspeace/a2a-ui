import * as React from "react";
import { cn, formatDate } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "./calendar";
import { motion, AnimatePresence } from "framer-motion";

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date...",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative inline-block w-full select-none", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border px-3.5 text-xs font-semibold transition-all duration-200",
          "bg-[#1c1c21] border-zinc-800/80 text-zinc-100",
          "hover:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-400"
        )}
      >
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-zinc-400" />
          <span className={cn(!date && "text-zinc-500 font-normal")}>
            {date ? formatDate(date) : placeholder}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-2"
          >
            <Calendar
              selected={date}
              onSelect={(d) => {
                onDateChange?.(d);
                setOpen(false);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
