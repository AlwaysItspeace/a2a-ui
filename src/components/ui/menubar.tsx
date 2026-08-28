import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Kbd } from "./kbd";

export interface MenubarItemType {
  label: string;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  onClick?: () => void;
}

export interface MenubarMenuType {
  title: string;
  items: MenubarItemType[];
}

export interface MenubarProps {
  menus: MenubarMenuType[];
  className?: string;
}

export function Menubar({ menus, className }: MenubarProps) {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-800/80 bg-[#16161a] p-1 shadow-sm select-none gap-0.5",
        className
      )}
    >
      {menus.map((menu) => {
        const isOpen = activeMenu === menu.title;
        return (
          <div key={menu.title} className="relative">
            <button
              type="button"
              onClick={() => setActiveMenu(isOpen ? null : menu.title)}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.title)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors duration-150",
                isOpen
                  ? "bg-white text-black shadow-xs"
                  : "text-zinc-300 hover:text-white hover:bg-[#202026]"
              )}
            >
              {menu.title}
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 6 }}
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-2 w-52 rounded-2xl border border-zinc-800 bg-[#141418] p-1.5 shadow-2xl z-50 overflow-hidden"
                >
                  <div className="space-y-0.5">
                    {menu.items.map((item, i) => {
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
                              setActiveMenu(null);
                            }
                          }}
                          className={cn(
                            "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors duration-150",
                            "text-zinc-200 hover:bg-white hover:text-black",
                            item.disabled && "opacity-40 cursor-not-allowed"
                          )}
                        >
                          <span>{item.label}</span>
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
      })}
    </div>
  );
}
