import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Kbd } from "./kbd";
import { DropdownMenuItemType } from "./dropdown-menu";

export interface ContextMenuProps {
  children: React.ReactNode;
  items: DropdownMenuItemType[];
}

export function ContextMenu({ children, items }: ContextMenuProps) {
  const [coords, setCoords] = React.useState<{ x: number; y: number } | null>(
    null
  );

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setCoords({ x: e.clientX, y: e.clientY });
  };

  React.useEffect(() => {
    const handleClose = () => setCoords(null);
    window.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose);
    };
  }, []);

  return (
    <div onContextMenu={handleContextMenu} className="w-full">
      {children}
      <AnimatePresence>
        {coords && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            style={{ top: coords.y, left: coords.x }}
            className="fixed z-50 w-52 rounded-2xl border border-zinc-800 bg-[#141418] p-1.5 shadow-2xl"
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
                        setCoords(null);
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
}
