import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  options,
  value: controlledVal,
  defaultValue,
  onChange,
  placeholder = "Select an option...",
  disabled,
  className,
}: SelectProps) {
  const [internalVal, setInternalVal] = React.useState(defaultValue || "");
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const value = controlledVal !== undefined ? controlledVal : internalVal;
  const selectedOption = options.find((o) => o.value === value);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    setInternalVal(val);
    onChange?.(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative w-full select-none", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-xl border px-4 text-xs font-semibold transition-all duration-200",
          "bg-[#1c1c21] border-zinc-800/80 text-zinc-100",
          "hover:border-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-400",
          isOpen && "border-zinc-500 ring-1 ring-zinc-500",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        <span className={cn("truncate", !selectedOption && "text-zinc-500 font-normal")}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-1.5 w-full rounded-2xl border border-zinc-800 bg-[#141418] p-1.5 shadow-2xl overflow-hidden"
          >
            <div className="max-h-60 overflow-y-auto space-y-1">
              {options.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => !opt.disabled && handleSelect(opt.value)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs cursor-pointer transition-colors duration-150 font-medium",
                      isSelected
                        ? "bg-white text-black font-bold"
                        : "text-zinc-300 hover:bg-[#202026] hover:text-white",
                      opt.disabled && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    <div>
                      <div>{opt.label}</div>
                      {opt.description && (
                        <div className={cn("text-[10px]", isSelected ? "text-zinc-600" : "text-zinc-500")}>
                          {opt.description}
                        </div>
                      )}
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
