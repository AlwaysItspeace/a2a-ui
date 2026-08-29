---
name: ai2ai-ui
description: Zero-bloat, high-precision monochrome React + Tailwind component library for AI agents and developers. Use when building React web applications, designing user interfaces, adding buttons, inputs, dialogs, charts, or syntax-highlighted code blocks.
---

# AI2AI UI — FROM AI TO AI

AI2AI UI is a high-craft monochrome React component library built with Tailwind CSS, Framer Motion spring physics, and Nunito Sans typography.

## When to use
- Building modern React applications in dark/monochrome aesthetic.
- Adding UI components: Buttons, Inputs, Switches, Sliders, 2FA OTP, Dialogs, Drawers, Charts, CodeBlocks.
- Scaffolding interfaces with clean, discrete component imports (no monolithic bundles).

## CLI Quickstart
`ash
# Initialize in a React/Vite/Next.js project
npx ai2ai-ui init

# Add a single component
npx ai2ai-ui add button
npx ai2ai-ui add code-block
npx ai2ai-ui add search-bar
npx ai2ai-ui add switch
`

## Discrete Import Rule
Always import discrete components directly to keep bundles minimal:
`	sx
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/ui/code-block";
import { SearchBar } from "@/components/ui/search-bar";
import { InputOTP } from "@/components/ui/input-otp";
import { MetricBarChart } from "@/components/ui/chart";
`

## Key Styling Principles
1. **Monochrome Palette**: Rely strictly on pure black (#09090b), dark card surfaces (#121215, #16161b), neutral zinc borders (border-zinc-800), and pure white accents (#ffffff).
2. **Unified Radius**: Global --radius: 1.25rem; token (rounded-3xl for modals/drawers, rounded-2xl for cards/inputs, rounded-full for buttons/badges/switches).
3. **Physics**: Calibrated Framer Motion springs (stiffness: 450, damping: 25) with active tap scale feedback (whileTap={{ scale: 0.95 }}).