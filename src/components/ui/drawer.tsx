import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function Drawer({
  open,
  onOpenChange,
  title,
  children,
  footer,
}: DrawerProps) {
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // If dragged down by more than 100px or velocity > 400, close
    if (info.offset.y > 100 || info.velocity.y > 400) {
      onOpenChange(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.7 }}
            onDragEnd={handleDragEnd}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative z-50 w-full max-w-xl mx-auto rounded-t-3xl border-t border-x border-zinc-800 bg-[#141418] p-6 shadow-2xl cursor-grab active:cursor-grabbing"
          >
            {/* Interactive Swipe Pill Handle */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-zinc-600 hover:bg-zinc-400 transition-colors" />
            {title && (
              <h3 className="text-base font-extrabold text-white mb-2">
                {title}
              </h3>
            )}
            <div className="text-xs text-zinc-300">{children}</div>
            {footer && (
              <div className="mt-6 flex justify-end gap-2 border-t border-zinc-800/80 pt-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
