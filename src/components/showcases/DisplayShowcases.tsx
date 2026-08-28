import * as React from "react";
import {
  Alert,
  AspectRatio,
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CodeBlock,
  DataTable,
  Empty,
  Item,
  Kbd,
  Marker,
  Progress,
  Separator,
  Skeleton,
  Spinner,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Typography,
  Button,
} from "@/components/ui";
import { toast } from "@/lib/use-toast";
import { Shield, Database, Terminal, GitBranch } from "lucide-react";

export function DisplayShowcase({ id }: { id: string }) {
  switch (id) {
    case "aspect-ratio":
      return (
        <div className="w-full max-w-[340px]">
          <AspectRatio ratio="16/9">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
              alt="Minimal Architecture"
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>
      );

    case "item":
      return (
        <div className="w-full space-y-2">
          <Item
            icon={<Terminal className="h-4 w-4 text-zinc-300" />}
            title="api-cluster-alpha"
            description="us-east-1 • 14.8k req/s"
            badge={<Badge size="sm">Active</Badge>}
            action={<Button size="xs" variant="secondary">Logs</Button>}
          />
          <Item
            icon={<GitBranch className="h-4 w-4 text-zinc-300" />}
            title="main @ 4d28f9c"
            description="Deployed 8 mins ago"
            badge={<Badge size="sm" variant="secondary">v2.4.0</Badge>}
            action={<Button size="xs" variant="secondary">Rollback</Button>}
          />
        </div>
      );

    case "code-block":
      return (
        <div className="w-full">
          <CodeBlock
            language="typescript"
            filename="cluster-client.ts"
            allowLanguageSelect
            showLineNumbers
          />
        </div>
      );

    case "avatar":
      return (
        <div className="w-full space-y-4">
          <div className="flex items-center gap-3 justify-center">
            <Avatar
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              fallback="SC"
              status="online"
              size="lg"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              fallback="JD"
              status="busy"
              size="default"
            />
            <Avatar
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
              fallback="SL"
              status="away"
              size="sm"
            />
            <Avatar fallback="AG" size="xs" />
          </div>
          <div className="pt-2 border-t border-zinc-800/60 flex justify-center">
            <AvatarGroup limit={3}>
              <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" />
              <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" />
              <Avatar fallback="K" />
            </AvatarGroup>
          </div>
        </div>
      );

    case "progress":
      return (
        <div className="w-full space-y-3 px-2">
          <Progress value={65} />
          <Progress value={88} />
          <Progress value={32} />
        </div>
      );

    case "card":
      return (
        <div className="w-full space-y-4 flex flex-col items-center text-center">
          <div className="p-4 rounded-3xl bg-white flex items-center justify-center shadow-lg">
            <svg
              className="w-32 h-32 text-black"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <rect x="5" y="5" width="28" height="28" rx="4" />
              <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
              <rect x="13" y="13" width="12" height="12" rx="1" fill="black" />

              <rect x="67" y="5" width="28" height="28" rx="4" />
              <rect x="71" y="9" width="20" height="20" rx="2" fill="white" />
              <rect x="75" y="13" width="12" height="12" rx="1" fill="black" />

              <rect x="5" y="67" width="28" height="28" rx="4" />
              <rect x="9" y="71" width="20" height="20" rx="2" fill="white" />
              <rect x="13" y="75" width="12" height="12" rx="1" fill="black" />

              <rect x="40" y="8" width="6" height="6" rx="1" />
              <rect x="50" y="15" width="8" height="6" rx="1" />
              <rect x="40" y="25" width="6" height="8" rx="1" />
              <rect x="8" y="42" width="6" height="8" rx="1" />
              <rect x="20" y="45" width="8" height="6" rx="1" />
              <rect x="42" y="42" width="16" height="16" rx="2" />
              <rect x="68" y="45" width="10" height="6" rx="1" />
              <rect x="85" y="40" width="8" height="8" rx="1" />
              <rect x="45" y="68" width="8" height="10" rx="1" />
              <rect x="60" y="75" width="10" height="8" rx="1" />
              <rect x="78" y="70" width="14" height="6" rx="1" />
              <rect x="75" y="82" width="8" height="10" rx="1" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-white">
              Scan to connect your mobile device
            </h4>
            <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
              Open the Ledger mobile app and scan this code to link your device.
            </p>
          </div>
        </div>
      );

    case "badge":
      return (
        <div className="w-full flex flex-wrap gap-2.5 items-center justify-center">
          <Badge variant="default">Button</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="dot">LIVE</Badge>
        </div>
      );

    case "alert":
      return (
        <div className="w-full space-y-2.5">
          <Alert variant="default" title="Deployment Pipeline">
            New build deployed to edge cluster <span className="font-mono text-white">us-east-1a</span>.
          </Alert>
          <Alert variant="default" title="Rate Limit Threshold">
            You have reached 85% of your allocated monthly API bandwidth.
          </Alert>
        </div>
      );

    case "data-table":
      const tableData = [
        { id: "SVC-101", name: "Auth Service", status: "Healthy", latency: "12ms" },
        { id: "SVC-102", name: "Vector Indexer", status: "Active", latency: "38ms" },
        { id: "SVC-103", name: "Gateway Ingress", status: "Healthy", latency: "4ms" },
      ];
      const tableCols = [
        { key: "id", header: "ID", sortable: true },
        { key: "name", header: "Service", sortable: true },
        {
          key: "status",
          header: "Status",
          render: (item: any) => (
            <Badge variant="secondary" size="sm">
              {item.status}
            </Badge>
          ),
        },
        { key: "latency", header: "Latency", sortable: true },
      ];
      return <DataTable data={tableData} columns={tableCols} pageSize={3} />;

    case "empty":
      return (
        <Empty
          title="No Active Deployments"
          description="Create your first cluster deployment to begin serving requests."
          action={<Button size="sm" onClick={() => toast({ title: "New deployment wizard launched." })}>Create Deployment</Button>}
        />
      );

    case "kbd":
      return (
        <div className="w-full flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-zinc-400">Search:</span>
            <Kbd keys={["?", "K"]} />
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-zinc-400">Save:</span>
            <Kbd keys={["Ctrl", "S"]} />
          </div>
        </div>
      );

    case "marker":
      return (
        <div className="w-full flex flex-wrap gap-4 items-center justify-center">
          <Marker status="active" pulse>
            US East (Virginia)
          </Marker>
          <Marker status="pending">
            Syncing Replica
          </Marker>
        </div>
      );

    case "separator":
      return (
        <div className="w-full space-y-3">
          <div className="text-xs text-zinc-400">Horizontal divider with text:</div>
          <Separator label="OR CONTINUE WITH" />
        </div>
      );

    case "skeleton":
      return (
        <div className="w-full space-y-2.5">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3.5 w-48" />
            </div>
          </div>
          <Skeleton className="h-14 w-full rounded-2xl" />
        </div>
      );

    case "spinner":
      return (
        <div className="w-full flex items-center justify-around p-2">
          <Spinner variant="ring" size="default" />
          <Spinner variant="dots" />
          <Spinner variant="bars" />
        </div>
      );

    case "table":
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cluster</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-mono">k8s-us-east-1</TableCell>
              <TableCell>Virginia</TableCell>
              <TableCell>
                <Badge variant="secondary" size="sm">
                  Active
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-mono">k8s-eu-west-1</TableCell>
              <TableCell>Dublin</TableCell>
              <TableCell>
                <Badge variant="secondary" size="sm">
                  Active
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

    case "typography":
      return (
        <div className="w-full space-y-2.5">
          <Typography variant="h3">System Architecture</Typography>
          <Typography variant="lead">
            High-craft monochrome components with smooth rounded radiuses and Nunito Sans typography.
          </Typography>
          <div className="p-4 rounded-3xl bg-[#141418] border border-zinc-800 font-mono text-xs text-white">
            <code>npm install @mono/ui</code>
          </div>
        </div>
      );

    default:
      return null;
  }
}
