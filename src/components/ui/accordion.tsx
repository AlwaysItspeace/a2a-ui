import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  defaultValue,
  className,
}: AccordionProps) {
  const [expanded, setExpanded] = React.useState<Set<string>>(() => {
    if (defaultValue) {
      return new Set(Array.isArray(defaultValue) ? defaultValue : [defaultValue]);
    }
    return new Set([items[0]?.id]);
  });

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (type === "single") next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("space-y-2.5 w-full select-none", className)}>
      {items.map((item) => {
        const isOpen = expanded.has(item.id);
        return (
          <div
            key={item.id}
            className="rounded-2xl border border-zinc-800/80 bg-[#141418] transition-all duration-200 overflow-hidden"
          >
            <button
              type="button"
              disabled={item.disabled}
              onClick={() => !item.disabled && toggle(item.id)}
              className={cn(
                "flex w-full items-center justify-between px-5 py-3.5 text-xs font-bold text-zinc-100 transition-colors duration-150 hover:bg-[#1a1a20]",
                isOpen && "bg-[#18181e]"
              )}
            >
              <span>{item.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              >
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 pb-4 pt-1 text-xs leading-relaxed text-zinc-400 border-t border-zinc-800/60 bg-[#121215]">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
