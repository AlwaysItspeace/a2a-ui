import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface InputOTPProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  mask?: boolean;
  className?: string;
}

export function InputOTP({
  length = 6,
  value: controlledValue,
  onChange,
  disabled = false,
  mask = false,
  className,
}: InputOTPProps) {
  const [internalValue, setInternalValue] = React.useState("");
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const chars = value.split("").slice(0, length);
  const activeIndex = Math.min(chars.length, length - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, length);
    setInternalValue(raw);
    onChange?.(raw);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn("relative inline-flex items-center gap-2 cursor-text select-none", className)}
    >
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={length}
        value={value}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        className="absolute inset-0 w-full h-full opacity-0 pointer-events-none cursor-default"
      />

      <div className="flex items-center gap-2">
        {Array.from({ length }).map((_, index) => {
          const char = chars[index];
          const isCurrent = isFocused && index === (char !== undefined ? index : activeIndex);
          const isMid = length === 6 && index === 3;

          return (
            <React.Fragment key={index}>
              {isMid && (
                <div className="w-2 h-0.5 rounded-full bg-zinc-700 mx-0.5" />
              )}
              <div
                className={cn(
                  "relative flex h-12 w-10 sm:w-11 items-center justify-center rounded-2xl border transition-all duration-150 text-sm font-extrabold",
                  char
                    ? "bg-[#18181d] text-white border-zinc-700"
                    : "bg-[#121215] text-zinc-500 border-zinc-800/80",
                  isCurrent && "border-white ring-2 ring-white/20 bg-[#1c1c22] shadow-sm",
                  disabled && "opacity-40"
                )}
              >
                {char ? (
                  mask ? "?" : char
                ) : isCurrent ? (
                  <motion.div
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
                    className="h-5 w-0.5 rounded-full bg-white"
                  />
                ) : null}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
