import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, Command as CmdIcon, ArrowRight } from "lucide-react";
import { Kbd } from "./kbd";
import { motion, AnimatePresence } from "framer-motion";

export interface CommandItemType {
  id: string;
  label: string;
  icon?: React.ReactNode;
  shortcut?: string[];
  group?: string;
  onSelect?: () => void;
}

export interface CommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItemType[];
  placeholder?: string;
}

export function Command({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command or search...",
}: CommandProps) {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
      if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev <= 0 ? (filtered.length || 1) - 1 : prev - 1
          );
        } else if (e.key === "Enter" && filtered[selectedIndex]) {
          e.preventDefault();
          filtered[selectedIndex].onSelect?.();
          onOpenChange(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange, filtered, selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />
          {/* Square modal container with clean rectangular edges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className="relative z-50 w-full max-w-lg rounded-xl border border-zinc-800 bg-[#121215] shadow-2xl overflow-hidden"
          >
            <div className="flex items-center border-b border-zinc-800/80 px-4 py-3.5 bg-[#141418]">
              <Search className="h-4 w-4 text-zinc-400 mr-2.5 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={placeholder}
                className="w-full bg-transparent text-xs font-semibold text-white placeholder:text-zinc-500 focus:outline-none"
                autoFocus
              />
              <Kbd keys={["ESC"]} />
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1 bg-[#121215]">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        item.onSelect?.();
                        onOpenChange(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs cursor-pointer transition-colors duration-150 font-semibold",
                        isSelected
                          ? "bg-white text-black shadow-xs"
                          : "text-zinc-300 hover:bg-[#1e1e24] hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon || <CmdIcon className="h-4 w-4" />}
                        <span>{item.label}</span>
                      </div>
                      {item.shortcut ? (
                        <div className="flex items-center gap-1">
                          {item.shortcut.map((s, idx) => (
                            <Kbd key={idx} keys={[s]} />
                          ))}
                        </div>
                      ) : (
                        isSelected && <ArrowRight className="h-3.5 w-3.5 opacity-70" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
