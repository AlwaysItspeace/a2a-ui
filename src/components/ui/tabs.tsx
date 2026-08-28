import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: "pill" | "underline" | "boxed";
  className?: string;
}

export function Tabs({
  tabs,
  activeTab: controlledTab,
  defaultTab,
  onTabChange,
  variant = "pill",
  className,
}: TabsProps) {
  const [internalTab, setInternalTab] = React.useState(
    defaultTab || tabs[0]?.id || ""
  );
  const active = controlledTab !== undefined ? controlledTab : internalTab;

  const handleSelect = (id: string) => {
    setInternalTab(id);
    onTabChange?.(id);
  };

  if (variant === "underline") {
    return (
      <div
        className={cn(
          "flex items-center border-b border-zinc-800/80 space-x-6 select-none",
          className
        )}
      >
        {tabs.map((tab) => {
          const isSelected = tab.id === active;
          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleSelect(tab.id)}
              className={cn(
                "relative pb-3 pt-1 text-xs font-extrabold transition-colors flex items-center gap-2",
                isSelected
                  ? "text-white"
                  : "text-zinc-400 hover:text-white",
                tab.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              {tab.icon}
              {tab.label}
              {isSelected && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full p-1 border border-zinc-800/80 bg-[#16161a] select-none gap-1",
        className
      )}
    >
      {tabs.map((tab) => {
        const isSelected = tab.id === active;
        return (
          <button
            key={tab.id}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleSelect(tab.id)}
            className={cn(
              "relative px-4 py-1.5 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5 z-10 active:scale-95",
              isSelected
                ? "text-black"
                : "text-zinc-400 hover:text-white",
              tab.disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {isSelected && (
              <motion.div
                layoutId="tab-pill"
                className="absolute inset-0 bg-white rounded-full shadow-xs -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
