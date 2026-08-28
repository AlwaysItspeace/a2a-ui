import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar } from "./avatar";

export interface MessageProps {
  role?: "user" | "assistant" | "system";
  author?: string;
  avatarSrc?: string;
  timestamp?: string;
  content: string;
  className?: string;
}

export function Message({
  role = "assistant",
  author = "Assistant",
  avatarSrc = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  timestamp = "Just now",
  content,
  className,
}: MessageProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-2xl border border-zinc-800/80 bg-[#16161b] select-none space-y-2.5 transition-colors",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Avatar src={avatarSrc} fallback={author.slice(0, 2)} size="xs" />
          <span className="text-xs font-extrabold text-white">{author}</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">{timestamp}</span>
      </div>
      <div className="text-xs text-zinc-300 leading-relaxed">
        {content}
      </div>
    </div>
  );
}
