import * as React from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/lib/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Info } from "lucide-react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-2xl select-none",
              "bg-zinc-950 text-zinc-50 border-zinc-800 dark:bg-zinc-900 dark:border-zinc-700"
            )}
          >
            <div className="mt-0.5 shrink-0">
              <Info className="h-4 w-4 text-zinc-100" />
            </div>
            <div className="flex-1 space-y-0.5">
              {t.title && (
                <div className="text-xs font-bold leading-tight text-zinc-100">
                  {t.title}
                </div>
              )}
              {t.description && (
                <div className="text-[11px] text-zinc-400 leading-snug">
                  {t.description}
                </div>
              )}
            </div>
            {t.action}
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="text-zinc-500 hover:text-zinc-100 transition-colors p-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
