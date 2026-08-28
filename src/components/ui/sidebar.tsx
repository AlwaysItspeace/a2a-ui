import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: React.ReactNode;
  active?: boolean;
}

export interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  groups: SidebarGroup[];
  activeId?: string;
  onSelect?: (id: string) => void;
  collapsible?: boolean;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function Sidebar({
  groups,
  activeId,
  onSelect,
  collapsible = true,
  collapsed = false,
  onToggleCollapse,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-200 select-none",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="p-3 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-[3px] bg-zinc-950 dark:bg-zinc-50" />
            <span className="text-xs font-bold tracking-tight">WORKSPACE</span>
          </div>
        )}
        {collapsible && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="p-1 rounded-[3px] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      <div className="flex-1 p-2 space-y-4 overflow-y-auto">
        {groups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {group.title && !collapsed && (
              <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {group.title}
              </div>
            )}
            {group.items.map((item) => {
              const isSelected = item.id === activeId || item.active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelect?.(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-2.5 py-1.5 rounded-[4px] text-xs font-medium transition-colors",
                    isSelected
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <span className="shrink-0">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="truncate flex-1 text-left">
                        {item.label}
                      </span>
                      {item.badge}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
