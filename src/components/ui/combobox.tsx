import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
}

export function Combobox({
  options,
  value = "",
  onChange,
  placeholder = "Select an item...",
  searchPlaceholder = "Search items...",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

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
    <div ref={containerRef} className="relative w-full select-none">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border px-4 text-xs font-semibold transition-all duration-200",
          "bg-[#1c1c21] border-zinc-800/80 text-zinc-100",
          "hover:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-400"
        )}
      >
        <span className={cn("truncate", !selected && "text-zinc-500 font-normal")}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronsUpDown className="h-4 w-4 text-zinc-400 shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-1.5 w-full rounded-2xl border border-zinc-800 bg-[#141418] p-1.5 shadow-2xl"
          >
            <div className="flex items-center px-3 py-2 border-b border-zinc-800/80 mb-1">
              <Search className="h-3.5 w-3.5 text-zinc-400 mr-2 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-xs text-white placeholder:text-zinc-500 focus:outline-none"
                autoFocus
              />
            </div>
            <div className="max-h-52 overflow-y-auto space-y-1">
              {filtered.length === 0 ? (
                <div className="py-4 text-center text-xs text-zinc-500">
                  No matching results.
                </div>
              ) : (
                filtered.map((opt) => {
                  const isSelected = opt.value === value;
                  return (
                    <div
                      key={opt.value}
                      onClick={() => {
                        onChange?.(opt.value);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors duration-150 font-medium",
                        isSelected
                          ? "bg-white text-black font-bold"
                          : "text-zinc-300 hover:bg-[#202026] hover:text-white"
                      )}
                    >
                      <span>{opt.label}</span>
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
