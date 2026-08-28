import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";

export interface AlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description: React.ReactNode;
  cancelText?: string;
  actionText?: string;
  destructive?: boolean;
  onAction?: () => void;
  onCancel?: () => void;
}

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelText = "Cancel",
  actionText = "Continue",
  destructive = false,
  onAction,
  onCancel,
}: AlertDialogProps) {
  const handleAction = () => {
    onAction?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="relative z-50 w-full max-w-md rounded-3xl border border-zinc-800 bg-[#141418] p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#1c1c21] border border-zinc-800 text-white">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1.5 pt-0.5">
                <h3 className="text-sm font-extrabold text-white leading-tight">
                  {title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-zinc-800/80 pt-4">
              <Button variant="secondary" size="sm" onClick={handleCancel}>
                {cancelText}
              </Button>
              <Button
                variant={destructive ? "default" : "default"}
                size="sm"
                onClick={handleAction}
              >
                {actionText}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
