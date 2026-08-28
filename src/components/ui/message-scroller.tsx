import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

export interface MessageScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean;
}

export function MessageScroller({
  children,
  autoScroll = true,
  className,
  ...props
}: MessageScrollerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = React.useState(false);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
    setShowScrollBottom(!isNearBottom);
  };

  React.useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [children, autoScroll]);

  return (
    <div className="relative w-full h-full flex flex-col">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={cn(
          "w-full flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth",
          className
        )}
        {...props}
      >
        {children}
      </div>

      {showScrollBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="absolute bottom-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors animate-bounce"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
