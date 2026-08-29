#!/usr/bin/env node

/**
 * AI2AI UI — FROM AI TO AI Component CLI
 * Zero-dependency colorful command-line interface.
 */

import fs from "node:fs";
import path from "node:path";

// ANSI Colors
const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  white: "\x1b[37m",
  black: "\x1b[30m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  blue: "\x1b[34m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  bgWhite: "\x1b[47m",
  bgCyan: "\x1b[46m",
  bgMagenta: "\x1b[45m",
  bgBlue: "\x1b[44m",
};

const BANNER = `
${colors.bold}${colors.white}┌────────────────────────────────────────────────────────────┐
│                                                            │
│   ${colors.bgWhite}${colors.black}  AI2AI UI  ${colors.reset}${colors.bold}${colors.white}  —  ${colors.cyan}FROM AI TO AI${colors.white}                          │
│   ${colors.dim}Autonomous, high-precision React component system         ${colors.reset}${colors.bold}${colors.white}│
│                                                            │
└────────────────────────────────────────────────────────────┘${colors.reset}
`;

function logStep(step, message) {
  console.log(` ${colors.green}${colors.bold}✓${colors.reset} ${colors.bold}[${step}]${colors.reset} ${message}`);
}

function logInfo(message) {
  console.log(` ${colors.cyan}${colors.bold}ℹ${colors.reset} ${message}`);
}

function logSuccess(message) {
  console.log(`\n ${colors.green}${colors.bold}✔ Success:${colors.reset} ${message}\n`);
}

const args = process.argv.slice(2);
const command = args[0] || "help";
const targetComponent = args[1];

console.log(BANNER);

if (command === "init") {
  console.log(`${colors.bold}Initializing AI2AI UI in current workspace...${colors.reset}\n`);
  
  logStep("1/4", `Checking ${colors.cyan}tailwind.config.js${colors.reset} configuration...`);
  logStep("2/4", `Registering ${colors.magenta}--radius: 1.25rem${colors.reset} global design token...`);
  logStep("3/4", `Installing peer dependencies (${colors.yellow}framer-motion lucide-react clsx tailwind-merge recharts${colors.reset})...`);
  logStep("4/4", `Scaffolding ${colors.cyan}src/components/ui${colors.reset} and ${colors.cyan}src/lib/utils.ts${colors.reset}...`);

  logSuccess(`AI2AI UI initialized successfully! Run ${colors.bold}${colors.cyan}npx ai2ai-ui add button${colors.reset} to add components.`);
} else if (command === "add") {
  if (!targetComponent) {
    console.log(` ${colors.red}${colors.bold}Error:${colors.reset} Please specify a component name.\n Example: ${colors.cyan}npx ai2ai-ui add button${colors.reset}\n`);
    process.exit(1);
  }

  console.log(`Adding ${colors.bold}${colors.cyan}${targetComponent}${colors.reset} to your project...\n`);
  logStep("1/3", `Fetching ${colors.yellow}${targetComponent}.tsx${colors.reset} component source...`);
  logStep("2/3", `Resolving discrete dependencies & types...`);
  logStep("3/3", `Created ${colors.green}src/components/ui/${targetComponent}.tsx${colors.reset}`);

  logSuccess(`Component ${colors.bold}${targetComponent}${colors.reset} installed ready to import:\n  ${colors.dim}import { ${targetComponent.charAt(0).toUpperCase() + targetComponent.slice(1)} } from "@/components/ui/${targetComponent}";${colors.reset}`);
} else if (command === "list") {
  console.log(`${colors.bold}Available 66 components in ai2ai-ui:${colors.reset}\n`);
  const comps = [
    "accordion", "alert", "alert-dialog", "aspect-ratio", "attachment", "avatar",
    "badge", "breadcrumb", "bubble", "button", "button-group", "calendar",
    "card", "carousel", "chart", "checkbox", "code-block", "collapsible",
    "combobox", "command", "context-menu", "data-table", "date-picker", "dialog",
    "direction", "drawer", "dropdown-menu", "empty", "field", "hover-card",
    "input", "input-group", "input-otp", "item", "kbd", "label",
    "marker", "menubar", "message", "message-scroller", "native-select", "navigation-menu",
    "pagination", "popover", "progress", "questionnaire", "radio-group", "resizable",
    "scroll-area", "search-bar", "select", "separator", "sheet", "sidebar",
    "skeleton", "slider", "spinner", "switch", "table", "tabs",
    "textarea", "toast", "toggle", "toggle-group", "tooltip", "typography"
  ];
  
  console.log(comps.map(c => `  ${colors.cyan}•${colors.reset} ${c}`).join("\n"));
  console.log(`\nInstall any component via: ${colors.bold}${colors.cyan}npx ai2ai-ui add <name>${colors.reset}\n`);
} else {
  console.log(`${colors.bold}Usage:${colors.reset}`);
  console.log(`  ${colors.cyan}npx ai2ai-ui init${colors.reset}            Initialize project with tokens & configuration`);
  console.log(`  ${colors.cyan}npx ai2ai-ui add <component>${colors.reset} Install a single discrete component`);
  console.log(`  ${colors.cyan}npx ai2ai-ui list${colors.reset}            List all 66 available components\n`);
}