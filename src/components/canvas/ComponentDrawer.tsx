import * as React from "react";
import { cn } from "@/lib/utils";
import { ComponentMeta } from "@/types";
import { ComponentShowcase } from "@/components/showcases/ComponentShowcase";
import { Sheet } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";
import { toast } from "@/lib/use-toast";

export interface ComponentDrawerProps {
  meta: ComponentMeta | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComponentDrawer({
  meta,
  open,
  onOpenChange,
}: ComponentDrawerProps) {
  const [copied, setCopied] = React.useState(false);
  const [tab, setTab] = React.useState("preview");

  if (!meta) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(meta.codeSnippet);
    setCopied(true);
    toast({
      title: "Code Copied",
      description: `${meta.name} code snippet copied to clipboard.`,
      variant: "default",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      side="right"
      className="w-full sm:max-w-lg md:max-w-xl p-0"
    >
      <div className="flex flex-col h-full bg-white dark:bg-zinc-950">
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-900 space-y-2">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-extrabold text-zinc-950 dark:text-zinc-50">
              {meta.name}
            </h2>
            <Badge variant="default" size="sm">
              {meta.category}
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {meta.description}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 pt-3 border-b border-zinc-100 dark:border-zinc-900">
          <Tabs
            variant="underline"
            activeTab={tab}
            onTabChange={setTab}
            tabs={[
              { id: "preview", label: "Live Preview" },
              { id: "code", label: "React Code" },
              { id: "import", label: "Installation" },
            ]}
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {tab === "preview" && (
            <div className="space-y-4">
              <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 flex items-center justify-center min-h-[220px]">
                <ComponentShowcase id={meta.id} />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
                  Tags & Search Keywords
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {meta.tags.map((t, idx) => (
                    <Badge key={idx} variant="outline" size="sm">
                      #{t}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "code" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-500">
                  TypeScript React Component
                </span>
                <Button
                  size="xs"
                  variant="outline"
                  leftIcon={copied ? <Check className="h-3 w-3 text-zinc-100" /> : <Copy className="h-3 w-3" />}
                  onClick={handleCopy}
                >
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
              <pre className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{meta.codeSnippet}</code>
              </pre>
            </div>
          )}

          {tab === "import" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold">1. Import Component</span>
                <pre className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 font-mono text-xs">
                  <code>{`import { ${meta.name.replace(/\\s+/g, "")} } from "@/components/ui";`}</code>
                </pre>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold">2. Dependencies</span>
                <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 font-mono text-xs text-zinc-600 dark:text-zinc-400 space-y-1">
                  <div>• framer-motion: ^11.18.0</div>
                  <div>• lucide-react: ^0.475.0</div>
                  <div>• tailwindcss: ^3.4.17</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/30">
          <span className="text-[11px] font-mono text-zinc-400">
            ID: {meta.id}
          </span>
          <Button size="sm" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </div>
    </Sheet>
  );
}
