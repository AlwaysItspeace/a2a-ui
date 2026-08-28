import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCheck } from "lucide-react";
import { motion } from "framer-motion";

export interface BubbleProps {
  variant?: "sender" | "receiver" | "system";
  timestamp?: string;
  status?: "sent" | "delivered" | "read";
  children: React.ReactNode;
  className?: string;
}

export function Bubble({
  variant = "sender",
  timestamp,
  status = "read",
  children,
  className,
}: BubbleProps) {
  if (variant === "system") {
    return (
      <div className="flex items-center justify-center my-3">
        <span className="px-3.5 py-1 rounded-full bg-[#18181d] border border-zinc-800 text-[11px] font-mono text-zinc-400">
          {children}
        </span>
      </div>
    );
  }

  const isSender = variant === "sender";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 450, damping: 28 }}
      className={cn(
        "flex flex-col max-w-[85%] select-none",
        isSender ? "ml-auto items-end" : "mr-auto items-start",
        className
      )}
    >
      <div
        className={cn(
          "px-4 py-2.5 text-xs leading-relaxed shadow-sm",
          isSender
            ? "bg-white text-black font-semibold rounded-[24px] rounded-br-md"
            : "bg-[#1c1c21] text-zinc-100 rounded-[24px] rounded-bl-md border border-zinc-800/80"
        )}
      >
        {children}
      </div>
      {(timestamp || (isSender && status)) && (
        <div className="flex items-center gap-1 mt-1 px-1.5 text-[10px] font-mono text-zinc-500">
          {timestamp && <span>{timestamp}</span>}
          {isSender && <CheckCheck className="h-3 w-3 text-zinc-400" />}
        </div>
      )}
    </motion.div>
  );
}
