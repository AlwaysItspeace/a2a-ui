# A2A UI — FROM AI TO AI

> A high-precision monochrome React + Tailwind component ecosystem engineered for AI agents, developers, and autonomous design pipelines.

[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-black.svg)](https://tailwindcss.com/)

---

## ? Quick CLI Installation

Initialize A2A UI in any React, Vite, Next.js, or Remix workspace:

\\\ash
npx @a2a/ui init
\\\

Add any of the 66 components discretely:

\\\ash
npx @a2a/ui add button
npx @a2a/ui add switch
npx @a2a/ui add code-block
npx @a2a/ui add search-bar
npx @a2a/ui add input-otp
\\\

---

## ?? Discrete Import Pattern

Import single components directly without pulling in monolithic bundles:

\\\	sx
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/ui/code-block";
import { SearchBar } from "@/components/ui/search-bar";
import { InputOTP } from "@/components/ui/input-otp";
import { MetricBarChart } from "@/components/ui/chart";

export default function App() {
  return (
    <div className="p-8 space-y-4">
      <SearchBar placeholder="Search cluster nodes..." />
      <Button variant="default">Deploy Service</Button>
      <Switch label="Automated Backups" />
    </div>
  );
}
\\\

---

## ??? Complete Component Library (66 Components)

| Category | Components |
|---|---|
| **Forms & Inputs** | \utton\, \utton-group\, \checkbox\, \switch\, \slider\, \input\, \input-group\, \input-otp\, \search-bar\, \	extarea\, \select\, \
ative-select\, \combobox\, \adio-group\, \	oggle\, \	oggle-group\, \calendar\, \date-picker\, \ield\, \label\, \questionnaire\, \ttachment\ |
| **Data Display** | \vatar\, \adge\, \card\, \code-block\, \data-table\, \empty\, \item\, \kbd\, \marker\, \	able\, \	ypography\ |
| **Feedback & Status** | \lert\, \progress\, \skeleton\, \spinner\, \	oast\ |
| **Navigation** | \readcrumb\, \menubar\, \
avigation-menu\, \pagination\, \sidebar\ |
| **Overlay & Modals** | \lert-dialog\, \command\, \context-menu\, \dialog\, \drawer\, \dropdown-menu\, \hover-card\, \popover\, \sheet\, \	ooltip\ |
| **Layout & Structure** | \ccordion\, \spect-ratio\, \collapsible\, \direction\, \esizable\, \scroll-area\, \separator\, \	abs\ |
| **Charts & Metrics** | \chart\ (Bar, Area, Line, Donut, Radar, Sparklines) |
| **Chat & Messaging** | \ubble\, \message\, \message-scroller\ |

---

## ?? Machine & AI Agent Integration

A2A UI is designed from the ground up to be indexed and operated by autonomous AI coding assistants:
- **\llms.txt\**: Machine-parsable API reference adhering to the [llmstxt.org](https://llmstxt.org) standard.
- **\skills/a2a-ui/SKILL.md\**: Ready-to-load Agent Skill for Antigravity, Claude Code, Cursor, and Copilot.

---

## ?? License

MIT License © 2026 duckky-green. Free for personal, open-source, and commercial use.
