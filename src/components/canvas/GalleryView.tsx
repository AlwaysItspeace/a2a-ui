import * as React from "react";
import { cn } from "@/lib/utils";
import { ComponentMeta } from "@/types";
import { ComponentShowcase } from "@/components/showcases/ComponentShowcase";
import { Badge } from "@/components/ui/badge";
import { Code, Copy, Check } from "lucide-react";
import { toast } from "@/lib/use-toast";

export interface GalleryViewProps {
  components: ComponentMeta[];
  onInspect: (meta: ComponentMeta) => void;
}

export function GalleryView({ components, onInspect }: GalleryViewProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopyCode = (e: React.MouseEvent, meta: ComponentMeta) => {
    e.stopPropagation();
    navigator.clipboard.writeText(meta.codeSnippet);
    setCopiedId(meta.id);
    toast({
      title: "Copied Snippet",
      description: `${meta.name} code copied to clipboard.`,
    });
    setTimeout(() => setCopiedId(null), 1500);
  };

  if (components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-base font-bold text-white">
          No components match your search
        </p>
        <p className="text-xs text-zinc-500 mt-1">
          Try adjusting your query or resetting category filters.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {components.map((meta) => (
        <div
          key={meta.id}
          className="rounded-3xl border border-zinc-800/80 bg-[#121215] shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-200 flex flex-col justify-between overflow-hidden"
        >
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-zinc-800/60 bg-[#141418] flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-white">
                  {meta.name}
                </h3>
                <Badge variant="secondary" size="sm" className="text-[10px]">
                  {meta.category.split(" ")[0]}
                </Badge>
              </div>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
                {meta.description}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={(e) => handleCopyCode(e, meta)}
                title="Copy code"
                className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-[#202026] transition-colors"
              >
                {copiedId === meta.id ? (
                  <Check className="h-3.5 w-3.5 text-white" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={() => onInspect(meta)}
                title="Inspect component"
                className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-[#202026] transition-colors"
              >
                <Code className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="p-6 flex-1 flex items-center justify-center min-h-[170px] bg-[#121215] overflow-visible">
            <ComponentShowcase id={meta.id} />
          </div>

          {/* Card Footer */}
          <div className="px-6 py-3 border-t border-zinc-800/60 bg-[#141418] flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {meta.tags.slice(0, 2).map((t, idx) => (
                <span
                  key={idx}
                  className="font-mono text-[10px] text-zinc-500"
                >
                  #{t}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onInspect(meta)}
              className="text-zinc-200 font-bold hover:text-white hover:underline text-[11px] uppercase font-mono tracking-wider"
            >
              DETAILS ?
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
