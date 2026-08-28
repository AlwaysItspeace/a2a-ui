import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";

export interface QuestionStep {
  id: string;
  title: string;
  description?: string;
  options: Array<{ id: string; label: string; description?: string }>;
}

export interface QuestionnaireProps {
  steps: QuestionStep[];
  onComplete?: (answers: Record<string, string>) => void;
  className?: string;
}

export function Questionnaire({
  steps,
  onComplete,
  className,
}: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const step = steps[currentStep];
  const selectedOption = answers[step?.id];

  const handleSelect = (optId: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: optId }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete?.(answers);
    }
  };

  if (!step) return null;

  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-zinc-800/80 bg-[#141418] p-5 select-none shadow-xl space-y-4",
        className
      )}
    >
      <div>
        <h4 className="text-xs font-extrabold text-white">{step.title}</h4>
        {step.description && (
          <p className="text-[11px] text-zinc-400 mt-0.5">{step.description}</p>
        )}
      </div>

      <div className="space-y-2">
        {step.options.map((opt) => {
          const isSelected = selectedOption === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={cn(
                "flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all duration-150",
                isSelected
                  ? "border-white bg-[#1e1e24] shadow-sm"
                  : "border-zinc-800 bg-[#18181d] hover:border-zinc-700"
              )}
            >
              <div>
                <div className="text-xs font-bold text-white">{opt.label}</div>
                {opt.description && (
                  <div className="text-[10px] text-zinc-400">
                    {opt.description}
                  </div>
                )}
              </div>
              <div
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isSelected
                    ? "border-white bg-white"
                    : "border-zinc-600 bg-transparent"
                )}
              >
                {isSelected && (
                  <div className="h-1.5 w-1.5 rounded-full bg-black" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        variant="default"
        size="sm"
        disabled={!selectedOption}
        onClick={handleNext}
        className="w-full"
      >
        {currentStep < steps.length - 1 ? "Next Step" : "Complete Survey"}
      </Button>
    </div>
  );
}
