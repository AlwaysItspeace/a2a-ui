import * as React from "react";
import {
  Button,
  Badge,
  CodeBlock,
  Switch,
  Slider,
  InputOTP,
  Item,
  MetricBarChart,
  ButtonGroup,
} from "@/components/ui";
import { toast } from "@/lib/use-toast";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Copy,
  Check,
  Zap,
  Shield,
  ChevronRight,
  FileCode,
  Cpu,
  Bot,
} from "lucide-react";
import { motion } from "framer-motion";
import { ComponentMeta } from "@/types";

export interface LandingViewProps {
  onNavigateToDocs: (componentId?: string) => void;
  onNavigateToGuide: () => void;
  components: ComponentMeta[];
}

export function LandingView({
  onNavigateToDocs,
  onNavigateToGuide,
  components,
}: LandingViewProps) {
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [liveSwitch, setLiveSwitch] = React.useState(true);
  const [liveSlider, setLiveSlider] = React.useState(74);
  const [liveOtp, setLiveOtp] = React.useState("840219");
  const [liveBtnGroup, setLiveBtnGroup] = React.useState("months");

  const handleCopyCli = (cmd: string = "npx ai2ai-ui init") => {
    navigator.clipboard.writeText(cmd);
    setCopiedCli(true);
    toast({
      title: "CLI Command Copied",
      description: `Run \`${cmd}\` in your terminal to initialize.`,
    });
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const chartData = [
    { name: "Nov", value: 45, highlight: false },
    { name: "Dec", value: 68, highlight: false },
    { name: "Jan", value: 84, highlight: true },
    { name: "Feb", value: 72, highlight: false },
    { name: "Mar", value: 96, highlight: false },
  ];

  return (
    <div className="w-full bg-[#09090b] text-zinc-100 select-none pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-white/[0.04] blur-[140px] pointer-events-none rounded-full" />

        {/* Release Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16161b] border border-zinc-800 text-xs font-bold text-zinc-300 mb-6 shadow-sm hover:border-zinc-700 transition-colors cursor-pointer"
          onClick={() => onNavigateToDocs()}
        >
          <Bot className="h-3.5 w-3.5 text-white" />
          <span>AI2AI UI v1.0 — Architecture Specification</span>
          <span className="text-zinc-600">•</span>
          <span className="text-white font-mono">{components.length} Components</span>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-500" />
        </motion.div>

        {/* Hero Title: FROM AI TO AI */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white max-w-4xl leading-[1.02]"
        >
          FROM AI TO AI.
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-6 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed"
        >
          A high-precision React & Tailwind component ecosystem engineered for AI
          agents, developers, and autonomous design pipelines. Discrete imports, zero
          runtime lock-in, and calibrated spring physics.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Button
            size="lg"
            variant="default"
            onClick={() => onNavigateToDocs("button")}
            rightIcon={<ArrowRight className="h-4 w-4" />}
            className="font-extrabold px-6 h-12 shadow-lg"
          >
            Documentation & Components
          </Button>

          <Button
            size="lg"
            variant="secondary"
            onClick={onNavigateToGuide}
            leftIcon={<FileCode className="h-4 w-4" />}
            className="font-bold px-6 h-12"
          >
            Installation Guide
          </Button>
        </motion.div>
      </section>

      {/* Colorful Interactive CLI Terminal Block */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="rounded-3xl border border-zinc-800/90 bg-[#0d0d10] shadow-2xl overflow-hidden font-mono text-xs">
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80 bg-[#131317]">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-zinc-400 font-bold text-[11px]">
                bash — ai2ai-ui installer
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopyCli("npx ai2ai-ui init")}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1c22] border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              {copiedCli ? (
                <>
                  <Check className="h-3.5 w-3.5 text-white" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Copy CLI</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Colorful Body */}
          <div className="p-6 space-y-2.5 leading-relaxed overflow-x-auto text-[12px]">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">$</span>
              <span className="text-white font-bold">npx ai2ai-ui init</span>
            </div>
            <div className="text-zinc-500">
              ┌────────────────────────────────────────────────────────────┐
            </div>
            <div className="text-zinc-300">
              │  <span className="bg-white text-black px-1.5 py-0.5 rounded font-extrabold">AI2AI UI</span>  —  <span className="text-cyan-400 font-bold">FROM AI TO AI</span>                            │
            </div>
            <div className="text-zinc-500">
              └────────────────────────────────────────────────────────────┘
            </div>
            <div className="text-emerald-400 font-bold pt-1">
              ✓ [1/4] <span className="text-zinc-300 font-normal">Found <span className="text-cyan-300">tailwind.config.js</span> & <span className="text-cyan-300">index.css</span></span>
            </div>
            <div className="text-emerald-400 font-bold">
              ✓ [2/4] <span className="text-zinc-300 font-normal">Configured global <span className="text-purple-300">--radius: 1.25rem</span> token</span>
            </div>
            <div className="text-emerald-400 font-bold">
              ✓ [3/4] <span className="text-zinc-300 font-normal">Installed peer dependencies: <span className="text-amber-300">framer-motion lucide-react clsx tailwind-merge</span></span>
            </div>
            <div className="text-emerald-400 font-bold">
              ✓ [4/4] <span className="text-zinc-300 font-normal">Created <span className="text-cyan-300">src/components/ui</span> and <span className="text-cyan-300">src/lib/utils.ts</span></span>
            </div>
            <div className="pt-2 text-zinc-400">
              <span className="text-green-400 font-bold">✔ Success:</span> Ready to add discrete components:
            </div>
            <div className="text-zinc-400 pl-4">
              <span className="text-purple-400">$</span> npx ai2ai-ui add button
            </div>
            <div className="text-zinc-400 pl-4">
              <span className="text-purple-400">$</span> npx ai2ai-ui add code-block
            </div>
          </div>
        </div>
      </section>

      {/* Live Interactive Sandbox Matrix */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Card 1: Live Interactive Controls */}
          <div className="md:col-span-7 rounded-3xl border border-zinc-800/80 bg-[#121215] p-6 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-white animate-gentle-pulse" />
                <span className="text-xs font-bold text-zinc-200">
                  Discrete Interactive Controls
                </span>
              </div>
              <Badge variant="secondary" size="sm">
                Real React State
              </Badge>
            </div>

            <div className="space-y-4">
              {/* Connected Button Group */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#16161b] border border-zinc-800/80">
                <span className="text-xs font-bold text-zinc-300">
                  Time Horizon
                </span>
                <ButtonGroup>
                  <Button
                    size="xs"
                    variant={liveBtnGroup === "days" ? "default" : "ghost"}
                    onClick={() => setLiveBtnGroup("days")}
                  >
                    Days
                  </Button>
                  <Button
                    size="xs"
                    variant={liveBtnGroup === "months" ? "default" : "ghost"}
                    onClick={() => setLiveBtnGroup("months")}
                  >
                    Months
                  </Button>
                  <Button
                    size="xs"
                    variant={liveBtnGroup === "years" ? "default" : "ghost"}
                    onClick={() => setLiveBtnGroup("years")}
                  >
                    Years
                  </Button>
                </ButtonGroup>
              </div>

              {/* Tactile Switch */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#16161b] border border-zinc-800/80">
                <div>
                  <div className="text-xs font-bold text-white">
                    Distributed Replication
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Sync data across all availability zones
                  </div>
                </div>
                <Switch checked={liveSwitch} onCheckedChange={setLiveSwitch} />
              </div>

              {/* Slider with Percentage */}
              <div className="p-3.5 rounded-2xl bg-[#16161b] border border-zinc-800/80 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-zinc-300">
                    Cluster Throughput
                  </span>
                  <span className="font-mono font-extrabold text-white">
                    {liveSlider}%
                  </span>
                </div>
                <Slider value={liveSlider} onChange={setLiveSlider} />
              </div>

              {/* 2FA Input OTP */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#16161b] border border-zinc-800/80">
                <div className="text-xs font-bold text-zinc-300">
                  Hardware Enclave Pin
                </div>
                <InputOTP length={6} value={liveOtp} onChange={setLiveOtp} />
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
              <span>Try clicking and dragging controls</span>
              <span className="font-mono font-bold text-zinc-400">
                Zero Runtime Lag
              </span>
            </div>
          </div>

          {/* Card 2: Live Metrics & Charts */}
          <div className="md:col-span-5 rounded-3xl border border-zinc-800/80 bg-[#121215] p-6 shadow-2xl flex flex-col justify-between space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-extrabold text-white">
                  Ingress Telemetry
                </h4>
                <p className="text-[11px] text-zinc-400 font-mono">
                  p95 Latency: 12ms
                </p>
              </div>
              <Badge variant="dot">Live</Badge>
            </div>

            <div className="py-2">
              <MetricBarChart data={chartData} category="value" height={150} />
            </div>

            <div className="space-y-2">
              <Item
                icon={<Terminal className="h-4 w-4" />}
                title="k8s-ingress-prod"
                description="14.8k req/s • 99.99% uptime"
                badge={<Badge size="sm">Healthy</Badge>}
                action={<Button size="xs" variant="secondary">Inspect</Button>}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Code Highlight Feature Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div>
            <Badge variant="outline" className="mb-2">
              Developer First
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Multi-Language Syntax Highlighting
            </h2>
            <p className="text-sm text-zinc-400 mt-2 max-w-xl">
              Clean colored tokens for TypeScript, Python, Rust, Go, SQL, Bash, and
              JSON with integrated line numbers and 1-click clipboard copy.
            </p>
          </div>

          <Button
            variant="secondary"
            onClick={() => onNavigateToDocs("code-block")}
            rightIcon={<ChevronRight className="h-4 w-4" />}
          >
            Inspect CodeBlock
          </Button>
        </div>

        <CodeBlock
          language="typescript"
          filename="cluster-dispatcher.ts"
          allowLanguageSelect
          showLineNumbers
        />
      </section>

      {/* 3 Core Value Pillars */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-zinc-800/80 bg-[#121215] space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black font-extrabold shadow-sm">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">
              Discrete Single Imports
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Import single isolated components like `import &#123; Button &#125; from "@/components/ui/button"` without bundling monolithic dependencies.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-zinc-800/80 bg-[#121215] space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black font-extrabold shadow-sm">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">
              Tactile Spring Physics
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every switch, accordion, modal, and drawer uses calibrated Framer
              Motion spring physics with active tap feedback.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-zinc-800/80 bg-[#121215] space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black font-extrabold shadow-sm">
              <Bot className="h-5 w-5" />
            </div>
            <h3 className="text-base font-extrabold text-white">
              Machine & LLM Compatible
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Includes comprehensive `llms.txt` and skill definitions formatted for autonomous coding agents to build UI without human intervention.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 pt-12 max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-black font-black text-xs">
            A
          </div>
          <span>AI2AI UI — FROM AI TO AI (MIT License)</span>
        </div>

        <div className="flex items-center gap-6 text-zinc-400">
          <button
            type="button"
            onClick={() => onNavigateToDocs()}
            className="hover:text-white transition-colors"
          >
            Components
          </button>
          <button
            type="button"
            onClick={onNavigateToGuide}
            className="hover:text-white transition-colors"
          >
            Documentation
          </button>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            llms.txt
          </a>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-500">Press ⌘K for commands</span>
        </div>
      </footer>
    </div>
  );
}