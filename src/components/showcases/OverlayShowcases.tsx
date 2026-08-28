import * as React from "react";
import {
  Accordion,
  AlertDialog,
  Breadcrumb,
  Bubble,
  Button,
  Carousel,
  Collapsible,
  Command,
  ContextMenu,
  Dialog,
  Direction,
  Drawer,
  DropdownMenu,
  Field,
  HoverCard,
  Input,
  Item,
  Kbd,
  Menubar,
  Message,
  MessageScroller,
  NavigationMenu,
  Pagination,
  Popover,
  Resizable,
  ScrollArea,
  Sheet,
  Sidebar,
  Tabs,
  Tooltip,
  Badge,
  Avatar,
  MetricBarChart,
} from "@/components/ui";
import { toast } from "@/lib/use-toast";
import {
  Zap,
  Search,
  Settings,
  Server,
  Database,
  Home,
  ChevronRight,
  BarChart3,
  GitBranch,
  Terminal,
} from "lucide-react";

export function OverlayShowcase({ id }: { id: string }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertDialogOpen, setAlertDialogOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [tabVal, setTabVal] = React.useState("overview");
  const [currentPage, setCurrentPage] = React.useState(1);

  switch (id) {
    case "carousel":
      return (
        <div className="w-full">
          <Carousel />
        </div>
      );

    case "alert-dialog":
      return (
        <div className="w-full flex flex-col items-center gap-3">
          <Button variant="default" size="sm" onClick={() => setAlertDialogOpen(true)}>
            Open Alert Dialog
          </Button>
          <AlertDialog
            open={alertDialogOpen}
            onOpenChange={setAlertDialogOpen}
            title="Revoke Production Key?"
            description="All active services connecting with key #AK-9041 will be immediately disconnected."
            destructive
            actionText="Yes, Revoke Key"
            onAction={() =>
              toast({
                title: "Key Revoked",
                description: "API key #AK-9041 has been disabled.",
              })
            }
          />
        </div>
      );

    case "hover-card":
      return (
        <div className="w-full flex justify-center py-4">
          <HoverCard
            trigger={
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1c1c21] border border-zinc-800 text-xs font-bold text-white hover:border-zinc-600 transition-colors">
                <Avatar
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  size="xs"
                />
                <span>@sarah_connor</span>
              </div>
            }
          />
        </div>
      );

    case "bubble":
      return (
        <div className="w-full space-y-3">
          <Bubble variant="receiver" timestamp="09:14 AM">
            All components updated with global corner radiuses and smooth animations!
          </Bubble>
          <Bubble variant="sender" timestamp="09:15 AM" status="read">
            Looks very clean, monochrome, and responsive.
          </Bubble>
        </div>
      );

    case "chart":
      const barData = [
        { name: "Dec", value: 65, highlight: true },
        { name: "Jan", value: 85, highlight: false },
        { name: "Feb", value: 72, highlight: false },
        { name: "Mar", value: 92, highlight: false },
        { name: "Apr", value: 54, highlight: false },
      ];
      return (
        <div className="w-full space-y-4">
          <div className="space-y-0.5">
            <h4 className="text-sm font-extrabold text-zinc-100">Contribution History</h4>
            <p className="text-xs text-zinc-500">Last 6 months of activity</p>
          </div>

          <div className="py-1">
            <MetricBarChart data={barData} category="value" height={160} barSize={42} />
          </div>

          <div className="p-4 rounded-2xl bg-[#1c1c21] border border-zinc-800/80 space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
              UPCOMING
            </div>
            <div className="text-sm font-extrabold text-zinc-100">
              May 2024
            </div>
            <div className="text-xs text-zinc-400">
              Scheduled
            </div>
          </div>

          <Button variant="default" className="w-full font-extrabold py-3 shadow-md">
            View Full Report
          </Button>
        </div>
      );

    case "sidebar":
      return (
        <div className="w-full grid grid-cols-2 gap-3 p-1">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-zinc-400 block px-2">Overview</span>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#202026] text-xs font-bold text-white shadow-xs">
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-[#1c1c21] transition-colors cursor-pointer">
                <Zap className="h-4 w-4" />
                <span>Transactions</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-[#1c1c21] transition-colors cursor-pointer">
                <Database className="h-4 w-4" />
                <span>Investments</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold text-zinc-400 block px-2">Planning</span>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-[#1c1c21] transition-colors cursor-pointer">
                <Server className="h-4 w-4" />
                <span>Documents</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-[#1c1c21] transition-colors cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Budget</span>
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-[#1c1c21] transition-colors cursor-pointer">
                <Home className="h-4 w-4" />
                <span>Reports</span>
              </div>
            </div>
          </div>
        </div>
      );

    case "accordion":
      return (
        <div className="w-full">
          <Accordion
            items={[
              {
                id: "1",
                title: "How does monochrome styling work?",
                content: "Every element relies on pure black and white and neutral grayscale ramps with precise contrast.",
              },
              {
                id: "2",
                title: "Can I customize the corner radius?",
                content: "Yes, smooth rounded-xl and rounded-2xl curves are configured throughout the design system.",
              },
            ]}
          />
        </div>
      );

    case "breadcrumb":
      return (
        <div className="w-full space-y-3">
          <Breadcrumb
            separator="slash"
            items={[
              { label: "Dashboard", href: "#" },
              { label: "Infrastructure", href: "#" },
              { label: "Nodes", active: true },
            ]}
          />
        </div>
      );

    case "collapsible":
      return (
        <div className="w-full">
          <Collapsible
            trigger={
              <Button variant="secondary" size="sm" className="w-full justify-between">
                <span>View System Topology</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            }
          >
            <div className="p-4 rounded-2xl border border-zinc-800/80 bg-[#1c1c21] font-mono text-xs space-y-1">
              <div>Region: us-east-1</div>
              <div>Availability Zones: 3/3 Active</div>
            </div>
          </Collapsible>
        </div>
      );

    case "command":
      return (
        <div className="w-full flex flex-col items-center gap-2">
          <Button
            variant="secondary"
            className="w-full justify-between text-zinc-400"
            onClick={() => setCommandOpen(true)}
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              <span>Search commands...</span>
            </span>
            <Kbd keys={["?", "K"]} />
          </Button>
          <Command
            open={commandOpen}
            onOpenChange={setCommandOpen}
            items={[
              {
                id: "1",
                label: "Quick deploy to production",
                icon: <Zap className="h-3.5 w-3.5" />,
                shortcut: ["?", "P"],
                onSelect: () => toast({ title: "Deploy Started", description: "Triggered deploy pipeline." }),
              },
              {
                id: "2",
                label: "Inspect cluster metrics",
                icon: <BarChart3 className="h-3.5 w-3.5" />,
                shortcut: ["?", "M"],
              },
            ]}
          />
        </div>
      );

    case "context-menu":
      return (
        <ContextMenu
          items={[
            { label: "Copy Identifier", shortcut: "?C", onClick: () => toast({ title: "Copied ID" }) },
            { label: "Inspect Node", shortcut: "??I" },
            { separator: true, label: "" },
            { label: "Restart Pod", destructive: true },
          ]}
        >
          <div className="w-full p-8 border border-dashed border-zinc-700/60 rounded-3xl text-center text-xs text-zinc-500 cursor-context-menu hover:bg-[#18181c] transition-colors">
            Right-click inside this container to trigger context menu
          </div>
        </ContextMenu>
      );

    case "dialog":
      return (
        <div className="w-full flex flex-col items-center gap-2">
          <Button onClick={() => setDialogOpen(true)}>Open Modal Dialog</Button>
          <Dialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title="Configure Cloud Environment"
            description="Manage parameters and secrets for your production deployment."
            footer={
              <>
                <Button variant="secondary" size="sm" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setDialogOpen(false);
                    toast({ title: "Config Saved", description: "Cluster parameters updated." });
                  }}
                >
                  Save Settings
                </Button>
              </>
            }
          >
            <div className="space-y-3 py-2">
              <Field label="Cluster Name">
                <Input defaultValue="us-east-cluster-alpha" />
              </Field>
              <Field label="Replication Factor">
                <Input defaultValue="3" />
              </Field>
            </div>
          </Dialog>
        </div>
      );

    case "direction":
      return (
        <Direction showToggle dir="ltr">
          <div className="space-y-1">
            <h4 className="font-bold text-zinc-100">Text Flow Demonstration</h4>
            <p className="text-zinc-400">
              Toggle between LTR and RTL to observe container flow.
            </p>
          </div>
        </Direction>
      );

    case "drawer":
      return (
        <div className="w-full flex flex-col items-center gap-2">
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
            Open Bottom Drawer
          </Button>
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            title="Quick Diagnostics"
            footer={
              <Button size="sm" onClick={() => setDrawerOpen(false)}>
                Dismiss
              </Button>
            }
          >
            <div className="space-y-2 py-2">
              <Item
                icon={<Terminal className="h-4 w-4" />}
                title="Memory Pressure"
                description="Nominal (42% utilized)"
                badge={<Badge size="sm">OK</Badge>}
              />
              <Item
                icon={<GitBranch className="h-4 w-4" />}
                title="Network Bandwidth"
                description="1.2 Gbps Ingress"
                badge={<Badge size="sm">OK</Badge>}
              />
            </div>
          </Drawer>
        </div>
      );

    case "dropdown-menu":
      return (
        <div className="w-full flex justify-center">
          <DropdownMenu
            trigger={<Button variant="secondary" size="sm">Manage Server ?</Button>}
            items={[
              { label: "Restart Pod", shortcut: "?R" },
              { label: "Export Audit Logs", shortcut: "?E" },
              { separator: true, label: "" },
              { label: "Terminate Server", destructive: true, onClick: () => toast({ title: "Server Terminated" }) },
            ]}
          />
        </div>
      );

    case "menubar":
      return (
        <div className="w-full flex justify-center">
          <Menubar
            menus={[
              {
                title: "File",
                items: [
                  { label: "New Project", shortcut: "?N" },
                  { label: "Open Workspace...", shortcut: "?O" },
                  { separator: true, label: "" },
                  { label: "Save All", shortcut: "?S" },
                ],
              },
              {
                title: "Edit",
                items: [
                  { label: "Undo", shortcut: "?Z" },
                  { label: "Redo", shortcut: "??Z" },
                ],
              },
            ]}
          />
        </div>
      );

    case "message":
      return (
        <div className="w-full space-y-2">
          <Message
            author="Sarah Connor"
            timestamp="10:45 AM"
            content="UI Library initialized with pure black-and-white theme, Nunito Sans typography, and unified corner radiuses."
          />
        </div>
      );

    case "message-scroller":
    case "scroll-area":
      return (
        <div className="w-full border border-zinc-800 rounded-3xl h-48 overflow-hidden bg-[#141418]">
          <MessageScroller>
            <Message role="user" author="Developer" content="How are the component styles structured?" />
            <Message role="assistant" author="Sarah Connor" content="They use Tailwind CSS with HSL CSS variables and unified radius tokens." />
            <Message role="user" author="Developer" content="Can I drag components around the infinite canvas?" />
            <Message role="assistant" author="Sarah Connor" content="Yes! Switch to Canvas view and drag any card freely." />
          </MessageScroller>
        </div>
      );

    case "navigation-menu":
      return (
        <div className="w-full flex justify-center">
          <NavigationMenu
            sections={[
              {
                title: "Infrastructure",
                items: [
                  { title: "Compute Clusters", description: "Isolated bare-metal pods" },
                  { title: "Global Storage", description: "Multi-region S3 buckets" },
                ],
              },
              { title: "Security" },
              { title: "Documentation" },
            ]}
          />
        </div>
      );

    case "pagination":
      return (
        <div className="w-full flex justify-center">
          <Pagination currentPage={currentPage} totalPages={8} onPageChange={setCurrentPage} />
        </div>
      );

    case "popover":
      return (
        <div className="w-full flex justify-center">
          <Popover
            trigger={<Button variant="secondary" size="sm">Inspect Dimensions</Button>}
          >
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-zinc-100">Canvas Dimensions</h4>
              <p className="text-[11px] text-zinc-400">Virtual size: 8000px × 6000px</p>
            </div>
          </Popover>
        </div>
      );

    case "resizable":
      return (
        <div className="w-full">
          <Resizable
            initialSplit={50}
            left={
              <div className="font-mono text-xs text-zinc-400 space-y-1">
                <div className="text-zinc-100 font-bold">LEFT PANE</div>
                <div>Drag the divider to resize panels.</div>
              </div>
            }
            right={
              <div className="font-mono text-xs text-zinc-400 space-y-1">
                <div className="text-zinc-100 font-bold">RIGHT PANE</div>
                <div>Responsive layout support.</div>
              </div>
            }
          />
        </div>
      );

    case "sheet":
      return (
        <div className="w-full flex flex-col items-center gap-2">
          <Button variant="secondary" onClick={() => setSheetOpen(true)}>
            Open Side Sheet
          </Button>
          <Sheet
            open={sheetOpen}
            onOpenChange={setSheetOpen}
            side="right"
            title="Cluster Inspector"
            description="Live diagnostic metrics"
            footer={
              <Button size="sm" onClick={() => setSheetOpen(false)}>
                Save Changes
              </Button>
            }
          >
            <div className="space-y-3 py-2">
              <Item
                icon={<Terminal className="h-4 w-4" />}
                title="Active Connections"
                description="14,290 sockets"
                badge={<Badge size="sm">Healthy</Badge>}
              />
            </div>
          </Sheet>
        </div>
      );

    case "tabs":
      return (
        <div className="w-full space-y-3">
          <Tabs
            variant="pill"
            activeTab={tabVal}
            onTabChange={setTabVal}
            tabs={[
              { id: "overview", label: "Overview" },
              { id: "analytics", label: "Analytics" },
              { id: "settings", label: "Settings" },
            ]}
          />
        </div>
      );

    case "toast":
      return (
        <div className="w-full flex flex-wrap gap-2 justify-center">
          <Button
            size="sm"
            onClick={() =>
              toast({
                title: "Deployment Successful",
                description: "Cluster replicated to all 12 edge regions.",
              })
            }
          >
            Trigger Toast
          </Button>
        </div>
      );

    case "tooltip":
      return (
        <div className="w-full flex justify-center">
          <Tooltip content="Instantly synchronize workspace git repository">
            <Button variant="secondary" size="sm">
              Hover Me for Tooltip
            </Button>
          </Tooltip>
        </div>
      );

    default:
      return null;
  }
}
