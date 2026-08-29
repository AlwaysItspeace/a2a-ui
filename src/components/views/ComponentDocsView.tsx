import * as React from "react";
import { COMPONENT_REGISTRY } from "@/components/showcases/ComponentRegistry";
import { ComponentCategory, ComponentMeta } from "@/types";
import { ComponentShowcase } from "@/components/showcases/ComponentShowcase";
import { CodeBlock } from "@/components/ui/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/use-toast";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  Code2,
  Eye,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComponentDocsViewProps {
  initialComponentId?: string;
  onSelectComponent?: (id: string) => void;
}

const CATEGORIES: ComponentCategory[] = [
  "Forms & Inputs",
  "Data Display",
  "Feedback & Status",
  "Navigation",
  "Overlay & Modals",
  "Layout & Structure",
  "Charts & Metrics",
  "Chat & Messaging",
];

const COMPONENT_PROPS: Record<string, Array<{ prop: string; type: string; default: string; description: string }>> = {
  button: [
    { prop: "variant", type: '"default" | "secondary" | "outline" | "ghost" | "destructive"', default: '"default"', description: "The visual appearance of the button." },
    { prop: "size", type: '"default" | "sm" | "lg" | "xs" | "icon"', default: '"default"', description: "The button sizing dimensions." },
    { prop: "leftIcon", type: "React.ReactNode", default: "undefined", description: "Optional icon placed before label." },
    { prop: "rightIcon", type: "React.ReactNode", default: "undefined", description: "Optional icon placed after label." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables button interactions." },
  ],
  switch: [
    { prop: "checked", type: "boolean", default: "false", description: "Controlled boolean state." },
    { prop: "onCheckedChange", type: "(checked: boolean) => void", default: "undefined", description: "Callback invoked on toggle." },
    { prop: "label", type: "React.ReactNode", default: "undefined", description: "Optional text label beside switch." },
    { prop: "disabled", type: "boolean", default: "false", description: "Disables toggle interactions." },
  ],
  "code-block": [
    { prop: "code", type: "string", default: "Sample code", description: "Raw code string to display." },
    { prop: "language", type: '"typescript" | "python" | "rust" | "go" | "sql" | "bash" | "json"', default: '"typescript"', description: "Syntax highlighting language grammar." },
    { prop: "filename", type: "string", default: "undefined", description: "Header file tab title." },
    { prop: "allowLanguageSelect", type: "boolean", default: "true", description: "Renders interactive language dropdown." },
    { prop: "showLineNumbers", type: "boolean", default: "true", description: "Displays left gutter line numbers." },
  ],
  "search-bar": [
    { prop: "value", type: "string", default: '""', description: "Controlled search query string." },
    { prop: "onChange", type: "(value: string) => void", default: "undefined", description: "Callback on input change." },
    { prop: "placeholder", type: "string", default: '"Search..."', description: "Input placeholder text." },
    { prop: "onFilterClick", type: "() => void", default: "undefined", description: "Renders filter action button." },
  ],
  "input-otp": [
    { prop: "length", type: "number", default: "6", description: "Number of 2FA verification digits." },
    { prop: "value", type: "string", default: '""', description: "Controlled numeric string." },
    { prop: "onChange", type: "(value: string) => void", default: "undefined", description: "Callback on value update." },
    { prop: "mask", type: "boolean", default: "false", description: "Masks entered digits with bullets." },
  ],
  slider: [
    { prop: "value", type: "number", default: "0", description: "Controlled numeric value." },
    { prop: "onChange", type: "(val: number) => void", default: "undefined", description: "Callback on slider position change." },
    { prop: "min", type: "number", default: "0", description: "Minimum range bound." },
    { prop: "max", type: "number", default: "100", description: "Maximum range bound." },
  ],
};

export function ComponentDocsView({
  initialComponentId = "button",
  onSelectComponent,
}: ComponentDocsViewProps) {
  const [selectedId, setSelectedId] = React.useState(initialComponentId);
  const [sidebarSearch, setSidebarSearch] = React.useState("");
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [copiedCode, setCopiedCode] = React.useState(false);

  const selectedMeta = COMPONENT_REGISTRY.find((c) => c.id === selectedId) || COMPONENT_REGISTRY[0];
  const currentIndex = COMPONENT_REGISTRY.findIndex((c) => c.id === selectedId);
  const prevComponent = currentIndex > 0 ? COMPONENT_REGISTRY[currentIndex - 1] : null;
  const nextComponent = currentIndex < COMPONENT_REGISTRY.length - 1 ? COMPONENT_REGISTRY[currentIndex + 1] : null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setActiveTab("preview");
    onSelectComponent?.(id);
  };

  const getDiscreteCodeSnippet = (meta: ComponentMeta) => {
    const compName = meta.name.replace(/\s+/g, "");
    return `import { ${compName} } from "@/components/ui/${meta.id}";

export default function Example() {
  return (
    <${compName} />
  );
}`;
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    toast({ title: "Code Copied", description: "Snippet copied to clipboard." });
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const filteredCategories = CATEGORIES.map((category) => {
    const items = COMPONENT_REGISTRY.filter(
      (c) =>
        c.category === category &&
        (!sidebarSearch.trim() ||
          c.name.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
          c.id.toLowerCase().includes(sidebarSearch.toLowerCase()))
    );
    return { category, items };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="flex h-full w-full bg-[#09090b] text-zinc-100 select-none overflow-hidden">
      {/* Left Sidebar Navigation */}
      <aside className="w-64 shrink-0 border-r border-zinc-800/80 bg-[#0c0c0f] flex flex-col h-full hidden md:flex">
        <div className="p-4 border-b border-zinc-800/80 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              placeholder="Filter 66 components..."
              className="w-full h-8 pl-8 pr-3 rounded-full border border-zinc-800 bg-[#141418] text-xs font-semibold text-white placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {filteredCategories.map((group) => (
            <div key={group.category} className="space-y-1">
              <span className="px-3 text-[10px] font-mono uppercase tracking-wider font-extrabold text-zinc-500 block">
                {group.category}
              </span>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold transition-all text-left",
                        isSelected
                          ? "bg-white text-black font-extrabold shadow-xs"
                          : "text-zinc-400 hover:text-white hover:bg-[#16161b]"
                      )}
                    >
                      <span>{item.name}</span>
                      {isSelected && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Documentation Viewport */}
      <main className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10 max-w-5xl pb-32">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-3">
          <span>Documentation</span>
          <span>/</span>
          <span>{selectedMeta.category}</span>
          <span>/</span>
          <span className="text-white font-bold">{selectedMeta.name}</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {selectedMeta.name}
            </h1>
            <Badge variant="secondary" size="sm">
              {selectedMeta.id}
            </Badge>
          </div>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            {selectedMeta.description}
          </p>
        </div>

        {/* Interactive Preview Sandbox Card */}
        <section className="space-y-4 mb-10">
          <div className="flex items-center justify-between">
            {/* Preview / Code Tab Toggle */}
            <div className="inline-flex rounded-full border border-zinc-800 p-1 bg-[#141418]">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold rounded-full transition-colors",
                  activeTab === "preview"
                    ? "bg-white text-black shadow-xs"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={cn(
                  "flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold rounded-full transition-colors",
                  activeTab === "code"
                    ? "bg-white text-black shadow-xs"
                    : "text-zinc-400 hover:text-white"
                )}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Code</span>
              </button>
            </div>

            {/* Quick Copy Snippet */}
            <Button
              size="xs"
              variant="secondary"
              leftIcon={copiedCode ? <Check className="h-3.5 w-3.5 text-white" /> : <Copy className="h-3.5 w-3.5 text-zinc-400" />}
              onClick={() => handleCopyCode(selectedMeta.codeSnippet)}
            >
              {copiedCode ? "Copied" : "Copy Code"}
            </Button>
          </div>

          {/* Sandbox Body */}
          {activeTab === "preview" ? (
            <div className="relative min-h-[260px] w-full rounded-3xl border border-zinc-800/90 bg-[#101014] p-8 flex items-center justify-center shadow-xl overflow-hidden">
              {/* Subtle background grid pattern */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10 w-full max-w-md flex items-center justify-center">
                <ComponentShowcase id={selectedMeta.id} />
              </div>
            </div>
          ) : (
            <CodeBlock
              language="typescript"
              filename={`${selectedMeta.id}.tsx`}
              code={selectedMeta.codeSnippet}
              allowLanguageSelect={false}
              showLineNumbers
            />
          )}
        </section>

        {/* Installation Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Installation
          </h2>
          <p className="text-xs text-zinc-400">
            Install this discrete component into your project via the AI2AI UI CLI:
          </p>

          <div className="rounded-2xl border border-zinc-800/80 bg-[#121215] p-3 flex items-center justify-between font-mono text-xs text-zinc-200">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-zinc-500" />
              <code>npx ai2ai-ui add {selectedMeta.id}</code>
            </div>
            <Button
              size="xs"
              variant="secondary"
              onClick={() => handleCopyCode(`npx ai2ai-ui add ${selectedMeta.id}`)}
            >
              Copy
            </Button>
          </div>
        </section>

        {/* Discrete Import & Usage Section */}
        <section className="space-y-4 mb-10">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Discrete Import & Usage
          </h2>
          <p className="text-xs text-zinc-400">
            Import this single component directly without pulling in other components:
          </p>

          <CodeBlock
            language="typescript"
            filename="example.tsx"
            code={getDiscreteCodeSnippet(selectedMeta)}
            allowLanguageSelect={false}
            showLineNumbers
          />
        </section>

        {/* Props & API Reference Table */}
        <section className="space-y-4 mb-12">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Props & API Reference
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-[#121215]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 bg-[#16161b] text-zinc-400 font-mono text-[11px]">
                  <th className="p-3.5 font-bold">Prop</th>
                  <th className="p-3.5 font-bold">Type</th>
                  <th className="p-3.5 font-bold">Default</th>
                  <th className="p-3.5 font-bold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 font-mono text-[11px]">
                {(COMPONENT_PROPS[selectedMeta.id] || [
                  { prop: "className", type: "string", default: "undefined", description: "Additional Tailwind CSS utility classes." },
                  { prop: "children", type: "React.ReactNode", default: "undefined", description: "Primary child nodes or label elements." },
                  { prop: "disabled", type: "boolean", default: "false", description: "Disables interaction and applies opacity." },
                ]).map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#16161c] transition-colors">
                    <td className="p-3.5 font-bold text-white">{row.prop}</td>
                    <td className="p-3.5 text-purple-300">{row.type}</td>
                    <td className="p-3.5 text-zinc-400">{row.default}</td>
                    <td className="p-3.5 text-zinc-300 font-sans text-xs">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Next & Previous Component Navigation Footer */}
        <div className="pt-8 border-t border-zinc-800/80 flex items-center justify-between">
          {prevComponent ? (
            <button
              type="button"
              onClick={() => handleSelect(prevComponent.id)}
              className="flex items-center gap-2 p-3 rounded-2xl border border-zinc-800 hover:border-zinc-600 bg-[#141418] text-left transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-zinc-400" />
              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">Previous</span>
                <span className="text-xs font-extrabold text-white">{prevComponent.name}</span>
              </div>
            </button>
          ) : <div />}

          {nextComponent ? (
            <button
              type="button"
              onClick={() => handleSelect(nextComponent.id)}
              className="flex items-center gap-2 p-3 rounded-2xl border border-zinc-800 hover:border-zinc-600 bg-[#141418] text-right transition-colors"
            >
              <div>
                <span className="text-[10px] text-zinc-500 font-mono uppercase block">Next</span>
                <span className="text-xs font-extrabold text-white">{nextComponent.name}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </button>
          ) : <div />}
        </div>
      </main>
    </div>
  );
}