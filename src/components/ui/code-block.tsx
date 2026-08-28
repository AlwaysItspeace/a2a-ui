import * as React from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, FileCode, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type CodeLanguage =
  | "typescript"
  | "javascript"
  | "python"
  | "rust"
  | "go"
  | "sql"
  | "bash"
  | "json";

export interface CodeBlockProps {
  code?: string;
  language?: CodeLanguage;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  allowLanguageSelect?: boolean;
  onLanguageChange?: (lang: CodeLanguage) => void;
  className?: string;
}

const SAMPLE_CODE: Record<CodeLanguage, string> = {
  typescript: `// TypeScript Distributed Node Dispatcher
interface ClusterNode<T = unknown> {
  id: string;
  region: "us-east" | "eu-central";
  throughput: number;
  active: boolean;
}

export async function dispatchTask<T>(
  node: ClusterNode<T>,
  retries: number = 3
): Promise<{ success: boolean; latencyMs: number }> {
  const startTime = performance.now();
  const response = await fetch(\`https://api.cluster.net/v1/\${node.id}/exec\`);
  if (!response.ok && retries > 0) {
    return dispatchTask(node, retries - 1);
  }
  return { success: true, latencyMs: performance.now() - startTime };
}`,

  python: `# Python Fast Vector Similarity Engine
from dataclasses import dataclass
import numpy as np

@dataclass
class VectorNode:
    node_id: str
    dimension: int = 1536
    metric: str = "cosine"

def compute_cosine_similarity(v1: np.ndarray, v2: np.ndarray) -> float:
    dot_product = float(np.dot(v1, v2))
    norm_product = float(np.linalg.norm(v1) * np.linalg.norm(v2))
    if norm_product == 0.0:
        return 0.0
    return dot_product / norm_product`,

  rust: `// Rust High-Performance Memory Allocator
use std::sync::Arc;
use tokio::sync::RwLock;

pub struct MemoryPool {
    capacity_bytes: usize,
    buffer: Arc<RwLock<Vec<u8>>>,
}

impl MemoryPool {
    pub async fn allocate(&self, size: usize) -> Result<Vec<u8>, &'static str> {
        if size > self.capacity_bytes {
            return Err("Allocation size exceeds capacity");
        }
        let mut handle = self.buffer.write().await;
        handle.resize(size, 0);
        Ok(handle.clone())
    }
}`,

  go: `// Go High-Concurrency Worker Pool
package main

import (
	"context"
	"fmt"
	"time"
)

type WorkerPool struct {
	MaxWorkers int
	Timeout    time.Duration
}

func (p *WorkerPool) Dispatch(ctx context.Context, jobID string) error {
	fmt.Printf("[WORKER] Processing task: %s\\n", jobID)
	select {
	case <-time.After(50 * time.Millisecond):
		return nil
	case <-ctx.Done():
		return ctx.Err()
	}
}`,

  sql: `-- PostgreSQL 16 Partitioned Metric Query
SELECT
  DATE_TRUNC('hour', recorded_at) AS time_window,
  region_id,
  AVG(latency_ms) AS p95_latency,
  COUNT(transaction_id) AS total_requests
FROM telemetry_metrics
WHERE recorded_at >= NOW() - INTERVAL '24 hours'
  AND status_code = 200
GROUP BY 1, 2
ORDER BY 1 DESC;`,

  bash: `#!/usr/bin/env bash
# Deploy Monochrome UI Stack to Cluster
set -euo pipefail

CLUSTER_URL="https://cluster.internal/v1"
echo "[*] Building production bundle..."
npm run build

echo "[*] Synchronizing nodes to \${CLUSTER_URL}..."
curl -X POST "\${CLUSTER_URL}/deploy" \\
  -H "Authorization: Bearer \${API_TOKEN}"`,

  json: `{
  "name": "mono-ui",
  "version": "1.3.0",
  "private": true,
  "theme": "dark",
  "dependencies": {
    "framer-motion": "^11.18.2",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1"
  }
}`,

  javascript: `// JavaScript Async Client Initializer
export async function initializeClient(config) {
  const session = await authenticateToken(config.apiKey);
  console.log(\`Connected to workspace: \${session.tenantId}\`);
  return { active: true, connectedAt: Date.now() };
}`,
};

const LANGUAGE_LABELS: Record<CodeLanguage, { name: string; dotColor: string }> = {
  typescript: { name: "TypeScript", dotColor: "bg-blue-400" },
  javascript: { name: "JavaScript", dotColor: "bg-yellow-400" },
  python: { name: "Python", dotColor: "bg-emerald-400" },
  rust: { name: "Rust", dotColor: "bg-amber-500" },
  go: { name: "Go", dotColor: "bg-cyan-400" },
  sql: { name: "SQL", dotColor: "bg-pink-400" },
  bash: { name: "Bash", dotColor: "bg-lime-400" },
  json: { name: "JSON", dotColor: "bg-orange-400" },
};

export function CodeBlock({
  code: userCode,
  language: userLanguage = "typescript",
  filename,
  showLineNumbers = true,
  highlightLines = [],
  allowLanguageSelect = true,
  onLanguageChange,
  className,
}: CodeBlockProps) {
  const [selectedLang, setSelectedLang] = React.useState<CodeLanguage>(userLanguage);
  const [copied, setCopied] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const activeLang = userCode ? userLanguage : selectedLang;
  const rawCode = userCode || SAMPLE_CODE[activeLang] || "";

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectLanguage = (lang: CodeLanguage) => {
    setSelectedLang(lang);
    onLanguageChange?.(lang);
    setDropdownOpen(false);
  };

  // Rich multi-color syntax highlighter
  const renderHighlightedLine = (line: string) => {
    if (line.trim().startsWith("//") || line.trim().startsWith("#") || line.trim().startsWith("--")) {
      return <span className="text-zinc-500 italic">{line}</span>;
    }

    // Token regex capturing keywords, strings, types, functions, numbers, symbols
    const tokenRegex = /(\b(?:interface|type|async|function|export|import|from|const|let|var|return|def|class|pub|struct|impl|package|SELECT|FROM|WHERE|GROUP BY|ORDER BY|AND|set|echo|fn|mut|self|if|else|new|await|true|false)\b|"[^"]*"|'[^']*'|`[^`]*`|\b(?:string|number|boolean|usize|float|int|void|Promise|Result|Option|VectorNode|ClusterNode|MemoryPool|WorkerPool|Context|Duration)\b|\b\d+(?:\.\d+)?(?:ms|s)?\b|\b[a-zA-Z_]\w*(?=\()|[{}()[\];:,.<>=+\-*/&|!])/g;

    const parts = line.split(tokenRegex);

    return parts.map((part, index) => {
      if (!part) return null;

      // Keywords (Purple / Violet)
      if (/^(?:interface|type|async|function|export|import|from|const|let|var|return|def|class|pub|struct|impl|package|SELECT|FROM|WHERE|GROUP BY|ORDER BY|AND|set|echo|fn|mut|self|if|else|new|await)$/.test(part)) {
        return <span key={index} className="text-purple-400 font-bold">{part}</span>;
      }
      // Booleans & Null (Orange / Amber)
      if (/^(?:true|false|null|nil|None)$/.test(part)) {
        return <span key={index} className="text-amber-400 font-bold">{part}</span>;
      }
      // Types & Structs (Cyan / Blue)
      if (/^(?:string|number|boolean|usize|float|int|void|Promise|Result|Option|VectorNode|ClusterNode|MemoryPool|WorkerPool|Context|Duration|T|Arc|RwLock)$/.test(part)) {
        return <span key={index} className="text-cyan-300 font-medium">{part}</span>;
      }
      // Strings (Emerald / Green)
      if (/^["'`].*["'`]$/.test(part)) {
        return <span key={index} className="text-emerald-300">{part}</span>;
      }
      // Numbers (Orange)
      if (/^\d+(?:\.\d+)?(?:ms|s)?$/.test(part)) {
        return <span key={index} className="text-orange-400 font-mono">{part}</span>;
      }
      // Functions (Yellow)
      if (line.includes(`${part}(`)) {
        return <span key={index} className="text-yellow-300">{part}</span>;
      }
      // Punctuation / Operators (Muted Zinc)
      if (/^[{}()[\];:,.<>=+\-*/&|!]$/.test(part)) {
        return <span key={index} className="text-zinc-400">{part}</span>;
      }
      return <span key={index} className="text-zinc-200">{part}</span>;
    });
  };

  const lines = rawCode.split("\n");

  return (
    <div
      className={cn(
        "w-full rounded-3xl border border-zinc-800/90 bg-[#101014] shadow-2xl overflow-hidden select-none",
        className
      )}
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80 bg-[#141418]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-200">
            <FileCode className="h-4 w-4 text-zinc-400" />
            <span>
              {filename ||
                `example.${
                  activeLang === "typescript"
                    ? "ts"
                    : activeLang === "python"
                    ? "py"
                    : activeLang === "rust"
                    ? "rs"
                    : activeLang === "go"
                    ? "go"
                    : activeLang === "sql"
                    ? "sql"
                    : activeLang === "bash"
                    ? "sh"
                    : "json"
                }`}
            </span>
          </div>

          {allowLanguageSelect && (
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1c1c21] border border-zinc-800 text-[11px] font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              >
                <span className={cn("h-1.5 w-1.5 rounded-full", LANGUAGE_LABELS[activeLang]?.dotColor)} />
                <span>{LANGUAGE_LABELS[activeLang]?.name}</span>
                <ChevronDown className="h-3 w-3 text-zinc-400" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute left-0 top-full mt-2 w-40 rounded-2xl border border-zinc-800 bg-[#16161b] p-1.5 shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="space-y-0.5">
                      {(Object.keys(LANGUAGE_LABELS) as CodeLanguage[]).map((lang) => (
                        <div
                          key={lang}
                          onClick={() => handleSelectLanguage(lang)}
                          className={cn(
                            "flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors",
                            activeLang === lang
                              ? "bg-white text-black font-bold"
                              : "text-zinc-300 hover:bg-[#202026] hover:text-white"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className={cn("h-1.5 w-1.5 rounded-full", LANGUAGE_LABELS[lang].dotColor)} />
                            <span>{LANGUAGE_LABELS[lang].name}</span>
                          </div>
                          {activeLang === lang && <Check className="h-3 w-3" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          title="Copy code to clipboard"
          className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#1c1c21] border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors active:scale-95"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-white" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-zinc-400" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed bg-[#0c0c0f]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = highlightLines.includes(lineNum);
              return (
                <tr
                  key={idx}
                  className={cn(
                    "hover:bg-[#14141a] transition-colors rounded-lg",
                    isHighlighted && "bg-[#1f1f28]"
                  )}
                >
                  {showLineNumbers && (
                    <td className="w-8 pr-4 text-right select-none text-[11px] text-zinc-600 font-mono">
                      {lineNum}
                    </td>
                  )}
                  <td className="whitespace-pre font-mono">
                    {renderHighlightedLine(line)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
