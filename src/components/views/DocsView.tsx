import * as React from "react";
import {
  CodeBlock,
  Badge,
  Button,
  Tabs,
  Accordion,
} from "@/components/ui";
import { toast } from "@/lib/use-toast";
import { Copy, Check, Terminal, FileCode, Layers, Sparkles } from "lucide-react";

export function DocsView() {
  const [copied, setCopied] = React.useState(false);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    toast({ title: "Copied to clipboard", description: cmd });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10 select-none pb-24 space-y-12">
      {/* Header */}
      <div className="space-y-2 border-b border-zinc-800/80 pb-6">
        <Badge variant="outline">Documentation & Reference</Badge>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Getting Started with MONO UI
        </h1>
        <p className="text-sm text-zinc-400">
          A zero-bloat, copy-paste React component library styled with Tailwind CSS and Nunito Sans typography.
        </p>
      </div>

      {/* Quick Start Guide */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">1. Automatic Setup (Recommended)</h2>
        <p className="text-xs text-zinc-400">
          Run the initialization command in your Vite, Next.js, or Remix project:
        </p>
        <div className="p-4 rounded-2xl bg-[#141418] border border-zinc-800/80 flex items-center justify-between font-mono text-xs text-zinc-200">
          <code>npx @mono/ui init</code>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => copyCommand("npx @mono/ui init")}
          >
            Copy
          </Button>
        </div>
      </section>

      {/* Manual Setup Guide */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">2. Manual Installation</h2>
        <p className="text-xs text-zinc-400">
          Install the required peer dependencies:
        </p>
        <div className="p-4 rounded-2xl bg-[#141418] border border-zinc-800/80 flex items-center justify-between font-mono text-xs text-zinc-200">
          <code>npm install framer-motion lucide-react clsx tailwind-merge recharts</code>
          <Button
            size="xs"
            variant="secondary"
            onClick={() => copyCommand("npm install framer-motion lucide-react clsx tailwind-merge recharts")}
          >
            Copy
          </Button>
        </div>
      </section>

      {/* Tailwind & CSS Configuration */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">3. Configure Tailwind & Font</h2>
        <p className="text-xs text-zinc-400">
          Add the `--radius` CSS variable and Nunito Sans font family in your `tailwind.config.js`:
        </p>
        <CodeBlock
          language="javascript"
          filename="tailwind.config.js"
          allowLanguageSelect={false}
          code={`/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
};`}
        />
      </section>

      {/* Utility Helper */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">4. Class Utility (`cn`)</h2>
        <p className="text-xs text-zinc-400">
          Create `src/lib/utils.ts` to merge Tailwind classes cleanly:
        </p>
        <CodeBlock
          language="typescript"
          filename="src/lib/utils.ts"
          allowLanguageSelect={false}
          code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
        />
      </section>

      {/* FAQ Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        <Accordion
          items={[
            {
              id: "faq-1",
              title: "Can I use MONO UI in commercial projects?",
              content: "Yes, MONO UI is released under the MIT License. You can use it in personal, open source, and commercial apps without restriction.",
            },
            {
              id: "faq-2",
              title: "How do I customize the corner radius?",
              content: "You can modify `--radius: 1.25rem;` in `index.css` to instantly change the global border radius across cards, dialogs, inputs, and buttons.",
            },
            {
              id: "faq-3",
              title: "Is it compatible with Next.js App Router?",
              content: "Yes! Add the 'use client' directive at the top of animated interactive components like Modals, Drawers, and Tabs.",
            },
          ]}
        />
      </section>
    </div>
  );
}
