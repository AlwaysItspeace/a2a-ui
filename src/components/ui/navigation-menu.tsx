import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface NavSection {
  title: string;
  items?: Array<{ title: string; description?: string; href?: string }>;
}

export interface NavigationMenuProps {
  sections: NavSection[];
  className?: string;
}

export function NavigationMenu({ sections, className }: NavigationMenuProps) {
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setActiveIdx(null)}
      className={cn(
        "inline-flex items-center rounded-full p-1 border border-zinc-800/80 bg-[#16161a] shadow-sm select-none gap-1",
        className
      )}
    >
      {sections.map((sec, idx) => {
        const isHovered = activeIdx === idx;
        return (
          <div key={sec.title} className="relative">
            <button
              type="button"
              onMouseEnter={() => setActiveIdx(idx)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-150",
                isHovered
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              {sec.title}
            </button>

            <AnimatePresence>
              {isHovered && sec.items && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 6 }}
                  transition={{ duration: 0.12 }}
                  className="absolute left-0 top-full mt-2 w-64 rounded-2xl border border-zinc-800 bg-[#141418] p-2 shadow-2xl z-50"
                >
                  <div className="space-y-1">
                    {sec.items.map((item, i) => (
                      <a
                        key={i}
                        href={item.href || "#"}
                        className="block p-2.5 rounded-xl hover:bg-[#202026] text-left transition-colors"
                      >
                        <div className="text-xs font-bold text-white">
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-[11px] text-zinc-400 mt-0.5">
                            {item.description}
                          </div>
                        )}
                      </a>
                    ))}
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
