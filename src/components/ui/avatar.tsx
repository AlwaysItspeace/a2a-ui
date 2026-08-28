import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "default" | "lg" | "xl";
  status?: "online" | "offline" | "busy" | "away";
}

export function Avatar({
  src,
  alt = "avatar",
  fallback = "U",
  size = "default",
  status,
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(!src);

  const sizes = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    default: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg",
  };

  return (
    <div className="relative inline-flex shrink-0 select-none">
      <div
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-800 bg-[#1c1c21] font-bold text-white shadow-xs",
          sizes[size],
          className
        )}
        {...props}
      >
        {!imgError && src ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-mono uppercase text-zinc-200">{fallback}</span>
        )}
      </div>
      {status && (
        <span
          className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#121215] bg-white"
        />
      )}
    </div>
  );
}

export function AvatarGroup({
  children,
  limit = 3,
  className,
}: {
  children: React.ReactNode[];
  limit?: number;
  className?: string;
}) {
  const childrenArray = React.Children.toArray(children);
  const visible = childrenArray.slice(0, limit);
  const excess = childrenArray.length - limit;

  return (
    <div className={cn("flex items-center -space-x-2.5 overflow-hidden", className)}>
      {visible}
      {excess > 0 && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#121215] bg-white text-black text-xs font-mono font-extrabold select-none shadow-xs">
          +{excess}
        </div>
      )}
    </div>
  );
}
