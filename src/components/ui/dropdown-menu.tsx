import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Kbd } from "./kbd";

export interface DropdownMenuItemType {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  destructive?: boolean;
  disabled?: boolean;
  separator?: boolean;
  onClick?: () => void;
}

export interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownMenuItemType[];
  align?: "left" | "right";
  className?: string;
}

export function DropdownMenu({
  trigger,
  items,
  align = "right",
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative inline-block select-none">
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute z-50 mt-2 w-56 rounded-2xl border border-zinc-800 bg-[#141418] p-1.5 shadow-2xl overflow-hidden",
              align === "right" ? "right-0" : "left-0",
              className
            )}
          >
            <div className="space-y-0.5">
              {items.map((item, i) => {
                if (item.separator) {
                  return (
                    <div
                      key={i}
                      className="my-1 border-t border-zinc-800/80"
                    />
                  );
                }
                return (
                  <div
                    key={i}
                    onClick={() => {
                      if (!item.disabled) {
                        item.onClick?.();
                        setOpen(false);
                      }
                    }}
                    className={cn(
                      "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors duration-150",
                      item.destructive
                        ? "text-zinc-300 hover:bg-[#25252b] hover:text-white"
                        : "text-zinc-200 hover:bg-white hover:text-black",
                      item.disabled && "opacity-40 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.shortcut && <Kbd keys={[item.shortcut]} />}
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
