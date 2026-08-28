import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar } from "./avatar";
import { Badge } from "./badge";

export interface HoverCardProps {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function HoverCard({ trigger, children, className }: HoverCardProps) {
  const [open, setOpen] = React.useState(false);
  const timer = React.useRef<any>(null);

  const show = () => {
    timer.current = setTimeout(() => setOpen(true), 120);
  };

  const hide = () => {
    clearTimeout(timer.current);
    setOpen(false);
  };

  return (
    <div
      onMouseEnter={show}
      onMouseLeave={hide}
      className="relative inline-block select-none"
    >
      <div className="cursor-pointer">{trigger}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            className={cn(
              "absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 rounded-3xl border border-zinc-800 bg-[#141418] p-5 shadow-2xl text-zinc-100 overflow-hidden",
              className
            )}
          >
            {children || (
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <Avatar
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    fallback="SC"
                    size="lg"
                    status="online"
                  />
                  <Badge variant="secondary" size="sm">
                    Verified
                  </Badge>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-white">
                    Sarah Connor
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Lead Infrastructure Engineer. Building distributed AI systems & high-craft UI.
                  </p>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t border-zinc-800/80 text-[11px] text-zinc-400 font-mono">
                  <div>
                    <span className="font-bold text-white">2.4k</span> Followers
                  </div>
                  <div>
                    <span className="font-bold text-white">180</span> Repos
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
