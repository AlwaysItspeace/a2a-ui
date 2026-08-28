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
  MetricAreaChart,
  DataTable,
  Tabs,
  NativeSelect,
  Marker,
  AlertDialog,
  Attachment,
  Textarea,
  Message,
  MessageScroller,
  Bubble,
} from "@/components/ui";
import { toast } from "@/lib/use-toast";
import {
  Terminal,
  Shield,
  Layers,
  Database,
  GitBranch,
  Play,
  Key,
  RefreshCw,
  Server,
  Zap,
} from "lucide-react";

export function BlocksView() {
  const [activeTemplate, setActiveTemplate] = React.useState("telemetry");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [biometrics, setBiometrics] = React.useState(true);
  const [rateLimit, setRateLimit] = React.useState(85);
  const [otpPin, setOtpPin] = React.useState("749102");

  const telemetryData = [
    { name: "00:00", value: 42, highlight: false },
    { name: "04:00", value: 65, highlight: false },
    { name: "08:00", value: 92, highlight: true },
    { name: "12:00", value: 81, highlight: false },
    { name: "16:00", value: 74, highlight: false },
    { name: "20:00", value: 89, highlight: false },
  ];

  const nodeTableData = [
    { id: "node-us-east-1a", cpu: "34%", memory: "4.8 GB", status: "Healthy", latency: "8ms" },
    { id: "node-us-east-1b", cpu: "58%", memory: "7.2 GB", status: "Active", latency: "14ms" },
    { id: "node-eu-central-1", cpu: "22%", memory: "3.1 GB", status: "Healthy", latency: "24ms" },
    { id: "node-ap-south-1", cpu: "64%", memory: "8.4 GB", status: "Syncing", latency: "42ms" },
  ];

  const nodeColumns = [
    { key: "id", header: "Node ID", sortable: true },
    { key: "cpu", header: "CPU Load", sortable: true },
    { key: "memory", header: "Memory", sortable: true },
    {
      key: "status",
      header: "Health",
      render: (row: any) => (
        <Badge variant={row.status === "Healthy" ? "default" : "secondary"} size="sm">
          {row.status}
        </Badge>
      ),
    },
    { key: "latency", header: "p95 Latency", sortable: true },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-10 select-none pb-24 space-y-8">
      {/* Template Selector Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Production Application Blocks
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Full-scale templates assembled with MONO UI design tokens.
          </p>
        </div>

        <Tabs
          variant="pill"
          activeTab={activeTemplate}
          onTabChange={setActiveTemplate}
          tabs={[
            { id: "telemetry", label: "Telemetry Dashboard" },
            { id: "copilot", label: "Developer Assistant" },
            { id: "security", label: "Security & Enclave" },
          ]}
        />
      </div>

      {/* Template 1: Telemetry Dashboard */}
      {activeTemplate === "telemetry" && (
        <div className="space-y-6">
          {/* Top Metric Bar */}
          <div className="p-6 rounded-3xl border border-zinc-800/80 bg-[#121215] flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-2xl bg-white text-black flex items-center justify-center font-bold">
                <Server className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-white">
                    Primary Production Mesh
                  </h3>
                  <Marker status="active" pulse>
                    12/12 Nodes Online
                  </Marker>
                </div>
                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  Cluster ID: #mesh-prod-9041 • Region: Multi-Region Edge
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <NativeSelect defaultValue="us-east" className="w-44">
                <option value="us-east">US East (Virginia)</option>
                <option value="eu-central">EU Central (Frankfurt)</option>
                <option value="ap-south">AP South (Mumbai)</option>
              </NativeSelect>
              <Button
                variant="default"
                size="sm"
                leftIcon={<Play className="h-3.5 w-3.5" />}
                onClick={() =>
                  toast({
                    title: "Deploy Triggered",
                    description: "Rolling update dispatched to edge pods.",
                  })
                }
              >
                Trigger Deploy
              </Button>
            </div>
          </div>

          {/* Metric Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 p-6 rounded-3xl border border-zinc-800/80 bg-[#121215] shadow-xl space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-extrabold text-white">
                    Ingress Throughput (Requests/sec)
                  </h4>
                  <p className="text-[10px] text-zinc-400 font-mono">
                    24h Rolling Average: 18,400 req/s
                  </p>
                </div>
                <Badge variant="secondary" size="sm">
                  Live Stream
                </Badge>
              </div>
              <MetricBarChart data={telemetryData} category="value" height={170} />
            </div>

            <div className="md:col-span-4 p-6 rounded-3xl border border-zinc-800/80 bg-[#121215] shadow-xl flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-xs font-extrabold text-white">
                  Active Services
                </h4>
                <p className="text-[10px] text-zinc-400 font-mono">
                  Microservices in current namespace
                </p>
              </div>

              <div className="space-y-2">
                <Item
                  icon={<Terminal className="h-4 w-4" />}
                  title="Ingress Proxy"
                  description="p95: 4ms"
                  badge={<Badge size="sm">Active</Badge>}
                />
                <Item
                  icon={<Database className="h-4 w-4" />}
                  title="Vector Indexer"
                  description="p95: 18ms"
                  badge={<Badge size="sm">Active</Badge>}
                />
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => toast({ title: "Diagnostics generated." })}
              >
                Run Health Audit
              </Button>
            </div>
          </div>

          {/* Node Partition Table */}
          <div className="p-6 rounded-3xl border border-zinc-800/80 bg-[#121215] shadow-xl space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-extrabold text-white">
                  Partition Node Cluster
                </h4>
                <p className="text-xs text-zinc-400">
                  Real-time compute node health and memory pressure metrics.
                </p>
              </div>
              <Badge variant="outline">Auto-Rebalanced</Badge>
            </div>
            <DataTable data={nodeTableData} columns={nodeColumns} pageSize={4} />
          </div>
        </div>
      )}

      {/* Template 2: Developer Assistant */}
      {activeTemplate === "copilot" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Chat Feed */}
          <div className="md:col-span-7 p-6 rounded-3xl border border-zinc-800/80 bg-[#121215] shadow-xl flex flex-col justify-between h-[520px]">
            <div className="pb-3 border-b border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-white text-black font-extrabold flex items-center justify-center text-xs">
                  AI
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">
                    Distributed Node Copilot
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-mono">
                    Model: claude-3-5-sonnet
                  </p>
                </div>
              </div>
              <Badge variant="dot">Connected</Badge>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              <Bubble variant="receiver" timestamp="10:14 AM">
                Here is the TypeScript dispatcher code with exponential backoff retries.
              </Bubble>
              <Bubble variant="sender" timestamp="10:15 AM" status="read">
                Can we verify error handling for HTTP 429 rate limit responses?
              </Bubble>
              <Bubble variant="receiver" timestamp="10:15 AM">
                Updated handler logic to inspect `Retry-After` response headers.
              </Bubble>
            </div>

            <div className="pt-3 border-t border-zinc-800/80 space-y-2">
              <Textarea
                placeholder="Ask assistant to generate code or inspect cluster logs..."
                className="h-16"
              />
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-zinc-500">
                  Press ?Enter to dispatch
                </span>
                <Button size="xs" variant="default">
                  Send Query
                </Button>
              </div>
            </div>
          </div>

          {/* Live Code Preview */}
          <div className="md:col-span-5 space-y-4">
            <CodeBlock
              language="typescript"
              filename="retry-handler.ts"
              allowLanguageSelect
              showLineNumbers
            />
            <Attachment
              files={[
                { id: "1", name: "stack-trace.log", size: "48 KB", progress: 100 },
                { id: "2", name: "telemetry.json", size: "120 KB", progress: 100 },
              ]}
            />
          </div>
        </div>
      )}

      {/* Template 3: Security & Enclave */}
      {activeTemplate === "security" && (
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl border border-zinc-800/80 bg-[#121215] shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-white text-black flex items-center justify-center">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    Hardware Security Enclave
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Manage hardware keys and biometric verification policies.
                  </p>
                </div>
              </div>
              <Badge variant="secondary">AES-256 GCM</Badge>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[#16161b] border border-zinc-800/80">
                <div>
                  <div className="text-xs font-bold text-white">
                    Biometric Authentication
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Require TouchID / WebAuthn on elevated access
                  </div>
                </div>
                <Switch checked={biometrics} onCheckedChange={setBiometrics} />
              </div>

              <div className="p-4 rounded-2xl bg-[#16161b] border border-zinc-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-white">API Bandwidth Allocation</span>
                  <span className="font-mono text-zinc-400">{rateLimit}% Allocated</span>
                </div>
                <Slider value={rateLimit} onChange={setRateLimit} />
              </div>

              <div className="p-4 rounded-2xl bg-[#16161b] border border-zinc-800/80 space-y-3">
                <div className="text-xs font-bold text-white">
                  Master Security PIN
                </div>
                <InputOTP length={6} value={otpPin} onChange={setOtpPin} />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800/80">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setAlertOpen(true)}
              >
                Revoke All Active Keys
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => toast({ title: "Security policies updated." })}
              >
                Save Policies
              </Button>
            </div>
          </div>

          <AlertDialog
            open={alertOpen}
            onOpenChange={setAlertOpen}
            title="Revoke All Security Enclave Keys?"
            description="All active services connecting with cluster credentials will be disconnected immediately."
            destructive
            actionText="Revoke Everything"
            onAction={() =>
              toast({
                title: "Enclave Keys Revoked",
                description: "Security credentials have been purged.",
              })
            }
          />
        </div>
      )}
    </div>
  );
}
