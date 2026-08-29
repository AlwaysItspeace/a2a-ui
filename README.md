<div align="center">

# AI2AI UI

### **FROM AI TO AI.**

**React + Tailwind UI Library For AI Agents**

[![npm version](https://img.shields.io/npm/v/ai2ai-ui?color=white&labelColor=black&logo=npm)](https://www.npmjs.com/package/ai2ai-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-white.svg?labelColor=black)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg?logo=typescript&logoColor=white&labelColor=black)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg?logo=react&logoColor=black&labelColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?logo=tailwind-css&logoColor=white&labelColor=black)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.18-FF0055.svg?logo=framer&logoColor=white&labelColor=black)](https://www.framer.com/motion/)

<br />

[**Explore Documentation**](https://github.com/AlwaysItspeace/a2a-ui)  [**llms.txt Specification**](./llms.txt)  [**Agent Skill Guide**](./skills/ai2ai-ui/SKILL.md)

</div>

---

## Instant CLI Quickstart

Install **AI2AI UI** in any React, Vite, Next.js, or Remix project:

```bash
# 1. Initialize design tokens & configuration
npx ai2ai-ui init

# 2. Add individual discrete components
npx ai2ai-ui add button
npx ai2ai-ui add switch
npx ai2ai-ui add code-block
npx ai2ai-ui add search-bar
npx ai2ai-ui add input-otp
```

---

## Discrete Import Pattern

Import single components directly without bundling monolithic dependencies:

```tsx
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/ui/code-block";
import { SearchBar } from "@/components/ui/search-bar";
import { InputOTP } from "@/components/ui/input-otp";
import { MetricBarChart } from "@/components/ui/chart";

export default function Dashboard() {
  return (
    <div className="p-8 space-y-6 max-w-4xl mx-auto">
      <SearchBar placeholder="Search cluster nodes..." />
      <div className="flex items-center justify-between">
        <Button variant="default">Deploy Service</Button>
        <Switch label="Automated Replication" />
      </div>
      <CodeBlock
        language="typescript"
        filename="cluster.ts"
        code="export const region = 'us-east-1';"
      />
    </div>
  );
}
```

---

## Core Design Principles

| Feature | Specification |
|---|---|
| **Palette** | Strictly pure monochrome (`#09090b` canvas, `#121215` cards, `#16161b` panels, `#ffffff` accents). |
| **Radius** | Global `--radius: 1.25rem;` (20px) token for smooth, tactile corners. |
| **Physics** | Calibrated Framer Motion springs (`stiffness: 450, damping: 25`) with active tap scaling. |
| **Typography** | Modern **Nunito Sans** font paired with **JetBrains Mono** for code and metadata. |
| **AI First** | Clean, machine-readable syntax and `llms.txt` context for autonomous coding agents. |

---

## Complete Component Catalog (66 Components)

<details open>
<summary><b>1. Forms & Inputs (22 Components)</b></summary>

- **`button-group`**: Segmented connected pill buttons (`Days`, `Months`, `Years`).
- **`checkbox`**: Toggle checkbox with spring checkmark animation.
- **`switch`**: Tactile toggle switch with centered sliding circular knob.
- **`slider`**: Range slider with rounded rectangle thumb.
- **`button`**: Primary, secondary, outline, ghost pill buttons with active spring tap physics.
- **`input`**: Clean text input with prefix/suffix icon slots.
- **`input-group`**: Seamless capsule input with prefix and action addon buttons.
- **`input-otp`**: 6-digit 2FA verification input with active ring and blinking cursor.
- **`search-bar`**: Pill search input with `?K` badge and clear action.
- **`textarea`**: Multi-line text field with character count indicator.
- **`select`**: Custom dropdown select with checkmarks and descriptions.
- **`native-select`**: Styled HTML native select with dark menu styling.
- **`combobox`**: Searchable autocomplete dropdown with fuzzy filtering.
- **`radio-group`**: Single-choice radio options with centered indicator dot.
- **`toggle`**: Two-state pill toggle button with spring physics.
- **`toggle-group`**: Segmented toggle options with sliding background pill.
- **`calendar`**: Monthly date picker grid with keyboard navigation.
- **`date-picker`**: Popover date selector with formatted input trigger.
- **`field`**: Form field container with label, required asterisk, and hint.
- **`label`**: Form label with optional/required indicators.
- **`questionnaire`**: Multi-step survey card with radio selection.
- **`attachment`**: File upload dropzone with monochrome progress bars.

</details>

<details open>
<summary><b>2. Data Display (11 Components)</b></summary>

- **`avatar`**: User portrait preview with stacked initials fallback and status dot.
- **`badge`**: Status indicator pill (default, secondary, outline, dot, counter).
- **`card`**: Dark card container with header, content, and footer slots.
- **`code-block`**: Multi-color syntax highlighter with language dropdown and copy button.
- **`data-table`**: Sortable table with search bar and pagination.
- **`empty`**: Empty state banner with icon, text, and action button.
- **`item`**: Minimalist row item with icon, title, description, and badge.
- **`kbd`**: Keyboard shortcut pill badge (`?K`, `Ctrl+S`).
- **`marker`**: Status indicator dot with subtle 3s pulse.
- **`table`**: Monochrome table with header, striped rows, and cell padding.
- **`typography`**: Typographic scale components (h1, h2, h3, h4, p, lead, code).

</details>

<details open>
<summary><b>3. Feedback & Status (5 Components)</b></summary>

- **`alert`**: Status notification banner.
- **`progress`**: Standalone rounded-full progress bar.
- **`skeleton`**: Loading placeholder with shimmer animation.
- **`spinner`**: Loading indicators (ring, dots, bars).
- **`toast`**: Imperative toast notification dispatcher.

</details>

<details open>
<summary><b>4. Navigation (5 Components)</b></summary>

- **`breadcrumb`**: Hierarchical page trail links.
- **`menubar`**: Desktop floating menu bar with nested dropdowns.
- **`navigation-menu`**: Header text navigation with dropdown flyouts.
- **`pagination`**: Page switcher with active pill indicator.
- **`sidebar`**: Navigation sidebar with active item indicators.

</details>

<details open>
<summary><b>5. Overlay & Modals (10 Components)</b></summary>

- **`alert-dialog`**: Modal confirmation dialog for destructive actions.
- **`command`**: Modern rectangular command palette with search and keyboard navigation.
- **`context-menu`**: Cursor-anchored right-click menu.
- **`dialog`**: Modal window with backdrop blur and action slots.
- **`drawer`**: Swipeable bottom sheet with touch drag-to-dismiss physics.
- **`dropdown-menu`**: Trigger-anchored action dropdown.
- **`hover-card`**: Popover card triggered on cursor hover.
- **`popover`**: Floating container anchored to trigger button.
- **`sheet`**: Slide-over side sheet panel.
- **`tooltip`**: Compact black pill tooltip with white text.

</details>

<details open>
<summary><b>6. Layout & Structure (8 Components)</b></summary>

- **`accordion`**: Collapsible panels with spring height animation.
- **`aspect-ratio`**: Media container with fixed aspect ratio and rounded corners.
- **`collapsible`**: Expandable disclosure panel with smooth height transitions.
- **`direction`**: LTR / RTL text direction container.
- **`resizable`**: Draggable split-pane layout container.
- **`scroll-area`**: Custom scroll container with slim scrollbar.
- **`separator`**: 1px divider line with optional centered text.
- **`tabs`**: Tab navigation with sliding active pill indicator.

</details>

<details open>
<summary><b>7. Charts & Metrics (1 Component)</b></summary>

- **`chart`**: Recharts wrapper with hover highlights (Bar, Area, Line, Donut, Radar, Sparkline).

</details>

<details open>
<summary><b>8. Chat & Messaging (3 Components)</b></summary>

- **`bubble`**: Speech bubble with sender/receiver tails.
- **`message`**: Developer chat card with avatar and timestamp.
- **`message-scroller`**: Auto-scrolling chat message list.

</details>

---

## Agent & LLM Integration

AI2AI UI is designed from the ground up to be indexed and operated by autonomous AI coding assistants:

- **`llms.txt`**: Machine-parsable API reference adhering to the [llmstxt.org](https://llmstxt.org) standard.
- **`skills/ai2ai-ui/SKILL.md`**: Ready-to-load Agent Skill for Antigravity, Claude Code, Cursor, and Copilot.

---

## License

MIT License ©️2026 AlwaysItsPeace. Free for personal, open-source, and commercial use.
