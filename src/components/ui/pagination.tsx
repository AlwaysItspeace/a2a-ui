import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full p-1 border border-zinc-800/80 bg-[#16161a] select-none",
        className
      )}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-[#202026] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p) => {
        const isActive = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={cn(
              "relative flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors z-10 active:scale-95",
              isActive ? "text-black" : "text-zinc-400 hover:text-white hover:bg-[#202026]"
            )}
          >
            {p}
            {isActive && (
              <motion.div
                layoutId="pagination-active"
                className="absolute inset-0 rounded-full bg-white shadow-xs -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-[#202026] disabled:opacity-30 disabled:pointer-events-none transition-all active:scale-95"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
