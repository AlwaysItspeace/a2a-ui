import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Kbd } from "./kbd";
import { motion, AnimatePresence } from "framer-motion";

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onFilterClick?: () => void;
  showShortcut?: boolean;
  shortcutKey?: string[];
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value = "",
  onChange,
  onClear,
  onFilterClick,
  showShortcut = true,
  shortcutKey = ["?", "K"],
  placeholder = "Search resources, commands, and nodes...",
  className,
  ...props
}: SearchBarProps) {
  const [internalValue, setInternalValue] = React.useState(value);
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const currentVal = value !== undefined ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.("");
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "relative flex items-center w-full h-10 px-3.5 rounded-full border transition-all duration-200 select-none",
        "bg-[#18181d] border-zinc-800/90 text-zinc-100",
        isFocused ? "border-zinc-500 ring-1 ring-zinc-500/50 bg-[#1c1c22]" : "hover:border-zinc-700",
        className
      )}
    >
      <Search className="h-4 w-4 text-zinc-500 mr-2.5 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={currentVal}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full bg-transparent text-xs font-semibold text-white placeholder:text-zinc-500 focus:outline-none"
        {...props}
      />

      {/* Trailing actions: Clear or Shortcut or Filter */}
      <div className="flex items-center gap-1.5 shrink-0 ml-2">
        <AnimatePresence>
          {currentVal ? (
            <motion.button
              type="button"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleClear}
              className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </motion.button>
          ) : (
            showShortcut && (
              <div
                onClick={() => inputRef.current?.focus()}
                className="cursor-pointer hidden sm:flex items-center"
              >
                <Kbd keys={shortcutKey} />
              </div>
            )
          )}
        </AnimatePresence>

        {onFilterClick && (
          <button
            type="button"
            onClick={onFilterClick}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
