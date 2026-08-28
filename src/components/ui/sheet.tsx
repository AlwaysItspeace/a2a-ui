import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right" | "top" | "bottom";
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Sheet({
  open,
  onOpenChange,
  side = "right",
  title,
  description,
  children,
  footer,
  className,
}: SheetProps) {
  const sideVariants = {
    right: { initial: { x: "100%" }, animate: { x: 0 }, exit: { x: "100%" } },
    left: { initial: { x: "-100%" }, animate: { x: 0 }, exit: { x: "-100%" } },
    top: { initial: { y: "-100%" }, animate: { y: 0 }, exit: { y: "-100%" } },
    bottom: { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } },
  };

  const positions = {
    right: "inset-y-0 right-0 h-full w-full max-w-md border-l rounded-l-3xl",
    left: "inset-y-0 left-0 h-full w-full max-w-md border-r rounded-r-3xl",
    top: "inset-x-0 top-0 w-full max-h-96 border-b rounded-b-3xl",
    bottom: "inset-x-0 bottom-0 w-full max-h-96 border-t rounded-t-3xl",
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            variants={sideVariants[side]}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className={cn(
              "fixed z-50 flex flex-col justify-between border-zinc-800 bg-[#121215] p-6 shadow-2xl overflow-hidden",
              positions[side],
              className
            )}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                {title && (
                  <h3 className="text-base font-extrabold text-white">
                    {title}
                  </h3>
                )}
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  className="rounded-full p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {description && (
                <p className="text-xs text-zinc-400 mb-4">{description}</p>
              )}
              <div className="text-xs text-zinc-300">{children}</div>
            </div>
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
