import * as React from "react";
import { COMPONENT_REGISTRY } from "@/components/showcases/ComponentRegistry";
import { Header, NavViewMode } from "@/components/canvas/Header";
import { LandingView } from "@/components/views/LandingView";
import { ComponentDocsView } from "@/components/views/ComponentDocsView";
import { DocsView } from "@/components/views/DocsView";
import { Command } from "@/components/ui/command";
import { Toaster } from "@/components/ui/toast";

export function App() {
  const [search, setSearch] = React.useState("");
  const [viewMode, setViewMode] = React.useState<NavViewMode>("landing");
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [activeComponentId, setActiveComponentId] = React.useState("button");
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Sync dark mode class
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Global hotkeys (?K for command palette)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectComponentDoc = (componentId: string = "button") => {
    setActiveComponentId(componentId);
    setViewMode("components");
  };

  const commandItems = COMPONENT_REGISTRY.map((c) => ({
    id: c.id,
    label: `${c.name} (${c.category})`,
    shortcut: ["Doc"],
    onSelect: () => {
      setActiveComponentId(c.id);
      setViewMode("components");
    },
  }));

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <Header
        search={search}
        onSearchChange={setSearch}
        viewMode={viewMode}
        onSelectViewMode={setViewMode}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onOpenCommand={() => setCommandOpen(true)}
        componentCount={COMPONENT_REGISTRY.length}
      />

      {/* Main Viewport */}
      <main className="flex-1 relative overflow-hidden">
        {viewMode === "landing" && (
          <div className="h-full overflow-y-auto bg-[#09090b]">
            <LandingView
              onNavigateToDocs={handleSelectComponentDoc}
              onNavigateToGuide={() => setViewMode("docs")}
              components={COMPONENT_REGISTRY}
            />
          </div>
        )}

        {viewMode === "components" && (
          <ComponentDocsView
            initialComponentId={activeComponentId}
            onSelectComponent={(id) => setActiveComponentId(id)}
          />
        )}

        {viewMode === "docs" && (
          <div className="h-full overflow-y-auto bg-[#09090b]">
            <DocsView />
          </div>
        )}
      </main>

      {/* Global Command Palette */}
      <Command
        open={commandOpen}
        onOpenChange={setCommandOpen}
        items={[
          {
            id: "nav-overview",
            label: "Go to Overview / Home",
            shortcut: ["G", "H"],
            onSelect: () => setViewMode("landing"),
          },
          {
            id: "nav-components",
            label: "Go to Components Documentation",
            shortcut: ["G", "C"],
            onSelect: () => setViewMode("components"),
          },
          {
            id: "nav-docs",
            label: "Go to Installation Guide & CLI",
            shortcut: ["G", "D"],
            onSelect: () => setViewMode("docs"),
          },
          {
            id: "theme-toggle",
            label: `Switch to ${isDarkMode ? "Light" : "Dark"} Mode`,
            shortcut: ["?", "T"],
            onSelect: () => setIsDarkMode(!isDarkMode),
          },
          ...commandItems,
        ]}
      />

      {/* Toast Manager */}
      <Toaster />
    </div>
  );
}

export default App;
