import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const RadioContext = React.createContext<{
  value?: string;
  onChange?: (val: string) => void;
  disabled?: boolean;
}>({});

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled,
  children,
  className,
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (newVal: string) => {
    setInternalValue(newVal);
    onValueChange?.(newVal);
  };

  return (
    <RadioContext.Provider
      value={{ value, onChange: handleChange, disabled }}
    >
      <div className={cn("space-y-2.5 w-full select-none", className)}>
        {children}
      </div>
    </RadioContext.Provider>
  );
}

export interface RadioGroupItemProps {
  value: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export function RadioGroupItem({
  value,
  label,
  description,
  disabled: itemDisabled,
  className,
}: RadioGroupItemProps) {
  const { value: groupValue, onChange, disabled: groupDisabled } =
    React.useContext(RadioContext);

  const isChecked = groupValue === value;
  const isDisabled = groupDisabled || itemDisabled;

  return (
    <label
      onClick={(e) => {
        e.preventDefault();
        if (!isDisabled) onChange?.(value);
      }}
      className={cn(
        "flex items-center justify-between p-3.5 rounded-2xl border cursor-pointer select-none transition-all duration-150",
        isChecked
          ? "border-white bg-[#1c1c21] shadow-sm"
          : "border-zinc-800/80 bg-[#141418] hover:border-zinc-700 hover:bg-[#18181d]",
        isDisabled && "cursor-not-allowed opacity-40",
        className
      )}
    >
      <div className="space-y-0.5 text-left min-w-0 pr-3">
        <div className="text-xs font-bold text-zinc-100">{label}</div>
        {description && (
          <div className="text-[11px] text-zinc-400 leading-normal">
            {description}
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
          isChecked
            ? "border-white bg-white"
            : "border-zinc-600 bg-transparent"
        )}
      >
        {isChecked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="h-2 w-2 rounded-full bg-black"
          />
        )}
      </div>
    </label>
  );
}
