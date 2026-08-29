import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  Moon,
  Sun,
  LayoutGrid,
  X,
  FileText,
} from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { motion } from "framer-motion";

export type NavViewMode = "landing" | "components" | "docs";

export interface HeaderProps {
  search: string;
  onSearchChange: (search: string) => void;
  viewMode: NavViewMode;
  onSelectViewMode: (mode: NavViewMode) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenCommand: () => void;
  componentCount: number;
}

export function Header({
  search,
  onSearchChange,
  viewMode,
  onSelectViewMode,
  isDarkMode,
  onToggleTheme,
  onOpenCommand,
  componentCount,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#09090b]/90 backdrop-blur-xl select-none">
      <div className="flex items-center justify-between px-6 py-3 gap-4">
        {/* Brand & Main Links */}
        <div className="flex items-center gap-6 shrink-0">
          <div
            onClick={() => onSelectViewMode("landing")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black font-black text-sm tracking-tighter shadow-sm group-hover:scale-105 transition-transform">
              AI
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tracking-tight text-white">
                AI2AI UI
              </span>
              <span className="font-mono text-[10px] text-zinc-400 font-bold bg-[#16161b] px-2 py-0.5 rounded-full border border-zinc-800">
                FROM AI TO AI
              </span>
            </div>
          </div>

          {/* Navigation Mode Switcher */}
          <nav className="hidden sm:flex items-center gap-1 bg-[#141418] p-1 rounded-full border border-zinc-800/80">
            <button
              type="button"
              onClick={() => onSelectViewMode("landing")}
              className={cn(
                "relative px-4 py-1 text-xs font-bold rounded-full transition-colors",
                viewMode === "landing"
                  ? "text-black"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              Overview
              {viewMode === "landing" && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => onSelectViewMode("components")}
              className={cn(
                "relative px-4 py-1 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5",
                viewMode === "components"
                  ? "text-black"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Components</span>
              <span className="font-mono text-[10px] opacity-70">({componentCount})</span>
              {viewMode === "components" && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => onSelectViewMode("docs")}
              className={cn(
                "relative px-4 py-1 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5",
                viewMode === "docs"
                  ? "text-black"
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Guide & CLI</span>
              {viewMode === "docs" && (
                <motion.div
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-xs -z-10"
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                />
              )}
            </button>
          </nav>
        </div>

        {/* Global Search Input */}
        <div className="flex-1 max-w-sm relative hidden md:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              onSearchChange(e.target.value);
              if (viewMode !== "components") {
                onSelectViewMode("components");
              }
            }}
            placeholder={`Search ${componentCount} components...`}
            className="w-full h-9 pl-9 pr-14 rounded-full border border-zinc-800 bg-[#141418] text-xs font-semibold text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
          />
          {search ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div
              onClick={onOpenCommand}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer flex items-center"
            >
              <Kbd keys={["⌘", "K"]} />
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile nav selector */}
          <div className="sm:hidden">
            <select
              value={viewMode}
              onChange={(e) => onSelectViewMode(e.target.value as NavViewMode)}
              className="h-8 px-2 rounded-xl bg-[#141418] border border-zinc-800 text-xs font-bold text-white focus:outline-none"
            >
              <option value="landing">Overview</option>
              <option value="components">Components</option>
              <option value="docs">Guide</option>
            </select>
          </div>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 hover:bg-[#1c1c21] hover:text-white transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}