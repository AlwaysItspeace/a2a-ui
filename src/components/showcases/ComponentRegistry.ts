import { ComponentMeta } from "@/types";

export const COMPONENT_REGISTRY: ComponentMeta[] = [
  {
    "id": "accordion",
    "name": "Accordion",
    "category": "Layout & Structure",
    "description": "Collapsible panels with spring-based height transition.",
    "codeSnippet": "<Accordion\n  items={[\n    { id: \"1\", title: \"API Authentication\", content: \"Pass the Bearer token in the Authorization header.\" },\n    { id: \"2\", title: \"Rate Limits\", content: \"Standard tier allows 1,000 requests per minute.\" },\n  ]}\n/>",
    "tags": [
      "layout",
      "accordion",
      "collapsible",
      "disclosure"
    ]
  },
  {
    "id": "alert",
    "name": "Alert",
    "category": "Feedback & Status",
    "description": "Status notification banner for system events.",
    "codeSnippet": "<Alert title=\"Cluster Rebalanced\">\n  Node traffic has been distributed across available availability zones.\n</Alert>",
    "tags": [
      "feedback",
      "alert",
      "banner",
      "status"
    ]
  },
  {
    "id": "alert-dialog",
    "name": "Alert Dialog",
    "category": "Overlay & Modals",
    "description": "Modal dialog for destructive or critical confirmations.",
    "codeSnippet": "<AlertDialog\n  open={isOpen}\n  onOpenChange={setIsOpen}\n  title=\"Revoke Production Key?\"\n  description=\"Connected services will immediately lose database access.\"\n  actionText=\"Revoke Access\"\n  onAction={handleRevoke}\n/>",
    "tags": [
      "modal",
      "alert-dialog",
      "confirmation",
      "overlay"
    ]
  },
  {
    "id": "aspect-ratio",
    "name": "Aspect Ratio",
    "category": "Layout & Structure",
    "description": "Maintains consistent width-to-height ratio for media.",
    "codeSnippet": "<AspectRatio ratio=\"16/9\">\n  <img src=\"/preview.jpg\" alt=\"Preview\" className=\"h-full w-full object-cover rounded-3xl\" />\n</AspectRatio>",
    "tags": [
      "layout",
      "aspect-ratio",
      "media",
      "embed"
    ]
  },
  {
    "id": "attachment",
    "name": "Attachment",
    "category": "Forms & Inputs",
    "description": "File upload dropzone with upload progress indicators.",
    "codeSnippet": "<Attachment\n  dropzone\n  files={[{ id: \"1\", name: \"architecture.pdf\", size: \"2.4 MB\", progress: 100 }]}\n  onRemove={handleRemove}\n/>",
    "tags": [
      "form",
      "upload",
      "attachment",
      "files"
    ]
  },
  {
    "id": "avatar",
    "name": "Avatar",
    "category": "Data Display",
    "description": "User portrait image with initials fallback and status dot.",
    "codeSnippet": "<Avatar\n  src=\"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150\"\n  fallback=\"SC\"\n  status=\"online\"\n  size=\"default\"\n/>",
    "tags": [
      "display",
      "avatar",
      "user",
      "profile"
    ]
  },
  {
    "id": "badge",
    "name": "Badge",
    "category": "Data Display",
    "description": "Pill indicator for counts, statuses, and tags.",
    "codeSnippet": "<Badge variant=\"default\">Production</Badge>\n<Badge variant=\"secondary\">Staging</Badge>\n<Badge variant=\"dot\">Live</Badge>",
    "tags": [
      "display",
      "badge",
      "pill",
      "tag"
    ]
  },
  {
    "id": "breadcrumb",
    "name": "Breadcrumb",
    "category": "Navigation",
    "description": "Hierarchical page trail navigation links.",
    "codeSnippet": "<Breadcrumb\n  items={[\n    { label: \"Dashboard\", href: \"/dashboard\" },\n    { label: \"Infrastructure\", href: \"/infra\" },\n    { label: \"Nodes\", active: true },\n  ]}\n/>",
    "tags": [
      "navigation",
      "breadcrumb",
      "hierarchy"
    ]
  },
  {
    "id": "bubble",
    "name": "Bubble",
    "category": "Chat & Messaging",
    "description": "Rounded speech bubble with sender, receiver, and tail styling.",
    "codeSnippet": "<Bubble variant=\"sender\" timestamp=\"10:42 AM\" status=\"read\">\n  Deployed build to us-east-1.\n</Bubble>",
    "tags": [
      "chat",
      "message",
      "bubble",
      "conversation"
    ]
  },
  {
    "id": "button",
    "name": "Button",
    "category": "Forms & Inputs",
    "description": "Pill button supporting solid, secondary, outline, and ghost styles.",
    "codeSnippet": "<Button variant=\"default\" onClick={handleDeploy}>\n  Deploy Service\n</Button>",
    "tags": [
      "form",
      "button",
      "cta",
      "action"
    ]
  },
  {
    "id": "button-group",
    "name": "Button Group",
    "category": "Forms & Inputs",
    "description": "Connected segmented pill button container.",
    "codeSnippet": "<ButtonGroup>\n  <Button size=\"xs\" variant=\"default\">Days</Button>\n  <Button size=\"xs\" variant=\"ghost\">Months</Button>\n  <Button size=\"xs\" variant=\"ghost\">Years</Button>\n</ButtonGroup>",
    "tags": [
      "form",
      "button-group",
      "segmented",
      "toolbar"
    ]
  },
  {
    "id": "calendar",
    "name": "Calendar",
    "category": "Forms & Inputs",
    "description": "Monthly date grid with month picker and keyboard navigation.",
    "codeSnippet": "<Calendar selected={date} onSelect={setDate} />",
    "tags": [
      "form",
      "calendar",
      "date",
      "picker"
    ]
  },
  {
    "id": "card",
    "name": "Card",
    "category": "Data Display",
    "description": "Sleek dark card surface with header, content, and footer slots.",
    "codeSnippet": "<Card>\n  <CardHeader>\n    <CardTitle>Cluster Telemetry</CardTitle>\n    <CardDescription>Real-time metrics</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p className=\"text-xs text-zinc-300\">All 12 nodes operating normally.</p>\n  </CardContent>\n</Card>",
    "tags": [
      "display",
      "card",
      "container",
      "panel"
    ]
  },
  {
    "id": "carousel",
    "name": "Carousel",
    "category": "Layout & Structure",
    "description": "Touch-friendly slider deck with real photography and directional controls.",
    "codeSnippet": "<Carousel />",
    "tags": [
      "layout",
      "carousel",
      "slider",
      "gallery"
    ]
  },
  {
    "id": "chart",
    "name": "Chart",
    "category": "Charts & Metrics",
    "description": "Recharts visualizations with crisp hover highlights (Bar, Area, Line, Donut, Radar).",
    "codeSnippet": "<MetricBarChart\n  data={[{ name: \"Dec\", value: 65, highlight: true }]}\n  category=\"value\"\n  height={160}\n/>",
    "tags": [
      "charts",
      "recharts",
      "metrics",
      "analytics"
    ]
  },
  {
    "id": "checkbox",
    "name": "Checkbox",
    "category": "Forms & Inputs",
    "description": "Rounded toggle checkbox with spring-animated check mark.",
    "codeSnippet": "<Checkbox\n  checked={isChecked}\n  onCheckedChange={setIsChecked}\n  label=\"Enable Automated Failover\"\n/>",
    "tags": [
      "form",
      "checkbox",
      "selection",
      "toggle"
    ]
  },
  {
    "id": "code-block",
    "name": "Code Block",
    "category": "Data Display",
    "description": "Multi-color syntax-highlighted code container with language selection & copy.",
    "codeSnippet": "<CodeBlock\n  language=\"typescript\"\n  filename=\"handler.ts\"\n  allowLanguageSelect\n  showLineNumbers\n/>",
    "tags": [
      "code",
      "syntax",
      "editor",
      "highlight"
    ]
  },
  {
    "id": "collapsible",
    "name": "Collapsible",
    "category": "Layout & Structure",
    "description": "Expandable content panel with smooth height animation.",
    "codeSnippet": "<Collapsible trigger={<Button variant=\"secondary\">View Topology</Button>}>\n  <div className=\"p-4 bg-[#1c1c21] rounded-2xl\">Cluster details...</div>\n</Collapsible>",
    "tags": [
      "layout",
      "collapsible",
      "disclosure"
    ]
  },
  {
    "id": "combobox",
    "name": "Combobox",
    "category": "Forms & Inputs",
    "description": "Searchable dropdown selection with fuzzy filtering.",
    "codeSnippet": "<Combobox\n  value={selected}\n  onChange={setSelected}\n  options={[{ value: \"v1\", label: \"v1.2.0\" }]}\n/>",
    "tags": [
      "form",
      "combobox",
      "autocomplete",
      "select"
    ]
  },
  {
    "id": "command",
    "name": "Command",
    "category": "Overlay & Modals",
    "description": "Spotlight command palette window with keyboard navigation.",
    "codeSnippet": "<Command\n  open={open}\n  onOpenChange={setOpen}\n  items={[{ id: \"1\", label: \"Deploy Cluster\", shortcut: [\"?\", \"P\"] }]}\n/>",
    "tags": [
      "modal",
      "command",
      "palette",
      "spotlight"
    ]
  },
  {
    "id": "context-menu",
    "name": "Context Menu",
    "category": "Overlay & Modals",
    "description": "Right-click context menu positioned at cursor coordinates.",
    "codeSnippet": "<ContextMenu items={[{ label: \"Copy ID\", shortcut: \"?C\" }]}>\n  <div className=\"p-8 border border-dashed rounded-3xl\">Right click here</div>\n</ContextMenu>",
    "tags": [
      "overlay",
      "context-menu",
      "cursor",
      "actions"
    ]
  },
  {
    "id": "data-table",
    "name": "Data Table",
    "category": "Data Display",
    "description": "Sortable, searchable table with pill search bar and pagination.",
    "codeSnippet": "<DataTable data={services} columns={columns} pageSize={5} />",
    "tags": [
      "display",
      "data-table",
      "grid",
      "sorting"
    ]
  },
  {
    "id": "date-picker",
    "name": "Date Picker",
    "category": "Forms & Inputs",
    "description": "Popover date selector with formatted input trigger.",
    "codeSnippet": "<DatePicker date={selectedDate} onDateChange={setSelectedDate} />",
    "tags": [
      "form",
      "date-picker",
      "calendar",
      "input"
    ]
  },
  {
    "id": "dialog",
    "name": "Dialog",
    "category": "Overlay & Modals",
    "description": "Modal dialog window with backdrop blur and action slots.",
    "codeSnippet": "<Dialog\n  open={open}\n  onOpenChange={setOpen}\n  title=\"Edit Cluster\"\n  footer={<Button onClick={() => setOpen(false)}>Save</Button>}\n>\n  <Input placeholder=\"Cluster name\" />\n</Dialog>",
    "tags": [
      "modal",
      "dialog",
      "overlay",
      "window"
    ]
  },
  {
    "id": "direction",
    "name": "Direction",
    "category": "Layout & Structure",
    "description": "Bi-directional layout container (LTR and RTL).",
    "codeSnippet": "<Direction dir=\"ltr\" showToggle>\n  <p>Text direction testing block.</p>\n</Direction>",
    "tags": [
      "layout",
      "direction",
      "rtl",
      "ltr"
    ]
  },
  {
    "id": "drawer",
    "name": "Drawer",
    "category": "Overlay & Modals",
    "description": "Swipeable bottom sheet with touch-drag dismiss physics.",
    "codeSnippet": "<Drawer open={open} onOpenChange={setOpen} title=\"Node Diagnostics\">\n  <p>Telemetry metrics...</p>\n</Drawer>",
    "tags": [
      "modal",
      "drawer",
      "bottom-sheet",
      "overlay"
    ]
  },
  {
    "id": "dropdown-menu",
    "name": "Dropdown Menu",
    "category": "Overlay & Modals",
    "description": "Action menu with shortcut badges, dividers, and danger actions.",
    "codeSnippet": "<DropdownMenu\n  trigger={<Button variant=\"secondary\">Actions ?</Button>}\n  items={[{ label: \"Restart Node\", shortcut: \"?R\" }]}\n/>",
    "tags": [
      "overlay",
      "dropdown-menu",
      "menu",
      "actions"
    ]
  },
  {
    "id": "empty",
    "name": "Empty",
    "category": "Data Display",
    "description": "Empty state banner with icon, text, and action CTA.",
    "codeSnippet": "<Empty\n  title=\"No Deployments\"\n  description=\"Create your first cluster deployment to start.\"\n  action={<Button size=\"sm\">Create Deployment</Button>}\n/>",
    "tags": [
      "display",
      "empty",
      "placeholder",
      "zero-state"
    ]
  },
  {
    "id": "field",
    "name": "Field",
    "category": "Forms & Inputs",
    "description": "Form input container with label, required asterisk, and hint.",
    "codeSnippet": "<Field label=\"Cluster Domain\" hint=\"Must be a valid FQDN\" required>\n  <Input placeholder=\"cluster.internal\" />\n</Field>",
    "tags": [
      "form",
      "field",
      "input-wrapper",
      "validation"
    ]
  },
  {
    "id": "hover-card",
    "name": "Hover Card",
    "category": "Overlay & Modals",
    "description": "Rich popover card triggered on cursor hover.",
    "codeSnippet": "<HoverCard trigger={<span>@sarah_connor</span>}>\n  <div className=\"space-y-2\">User details...</div>\n</HoverCard>",
    "tags": [
      "overlay",
      "hover-card",
      "popover",
      "profile"
    ]
  },
  {
    "id": "input",
    "name": "Input",
    "category": "Forms & Inputs",
    "description": "Text input with optional icon prefix and clear button.",
    "codeSnippet": "<Input placeholder=\"Search services...\" leftIcon={<Search className=\"h-4 w-4\" />} />",
    "tags": [
      "form",
      "input",
      "text",
      "search"
    ]
  },
  {
    "id": "input-group",
    "name": "Input Group",
    "category": "Forms & Inputs",
    "description": "Composite input with seamless addon prefix and suffix buttons.",
    "codeSnippet": "<InputGroup prefixAddon=\"https://\" suffixAddon={<Button size=\"xs\">Ping</Button>}>\n  <Input placeholder=\"api.service.io\" />\n</InputGroup>",
    "tags": [
      "form",
      "input-group",
      "addon",
      "composite"
    ]
  },
  {
    "id": "input-otp",
    "name": "Input OTP",
    "category": "Forms & Inputs",
    "description": "Segmented verification code input with auto-advance.",
    "codeSnippet": "<InputOTP length={6} value={code} onChange={setCode} />",
    "tags": [
      "form",
      "input-otp",
      "pin",
      "verification"
    ]
  },
  {
    "id": "item",
    "name": "Item",
    "category": "Data Display",
    "description": "Clean repository / cluster row with status badge and action button.",
    "codeSnippet": "<Item\n  icon={<Shield className=\"h-4 w-4\" />}\n  title=\"Encrypted Vault\"\n  description=\"AES-256 Key\"\n  badge={<Badge size=\"sm\">Active</Badge>}\n/>",
    "tags": [
      "display",
      "item",
      "row",
      "list"
    ]
  },
  {
    "id": "kbd",
    "name": "Kbd",
    "category": "Data Display",
    "description": "Keyboard shortcut pill badge.",
    "codeSnippet": "<Kbd keys={[\"?\", \"K\"]} />",
    "tags": [
      "display",
      "kbd",
      "shortcut",
      "keyboard"
    ]
  },
  {
    "id": "label",
    "name": "Label",
    "category": "Forms & Inputs",
    "description": "Form label with required indicator.",
    "codeSnippet": "<Label required>Primary Storage Target</Label>",
    "tags": [
      "form",
      "label",
      "text"
    ]
  },
  {
    "id": "marker",
    "name": "Marker",
    "category": "Data Display",
    "description": "Status indicator dot with subtle 3s pulse.",
    "codeSnippet": "<Marker status=\"active\" pulse>US East (Virginia)</Marker>",
    "tags": [
      "display",
      "marker",
      "status",
      "ping"
    ]
  },
  {
    "id": "menubar",
    "name": "Menubar",
    "category": "Navigation",
    "description": "Top desktop menu bar with nested dropdowns.",
    "codeSnippet": "<Menubar menus={[{ title: \"File\", items: [{ label: \"New Node\", shortcut: \"?N\" }] }]} />",
    "tags": [
      "navigation",
      "menubar",
      "desktop",
      "menu"
    ]
  },
  {
    "id": "message",
    "name": "Message",
    "category": "Chat & Messaging",
    "description": "Developer chat message card with avatar and timestamp.",
    "codeSnippet": "<Message author=\"Sarah Connor\" timestamp=\"10:45 AM\" content=\"Build deployed.\" />",
    "tags": [
      "chat",
      "message",
      "thread",
      "log"
    ]
  },
  {
    "id": "message-scroller",
    "name": "Message Scroller",
    "category": "Chat & Messaging",
    "description": "Auto-scrolling message list with scroll-to-bottom anchor.",
    "codeSnippet": "<MessageScroller>\n  <Message content=\"Message 1\" />\n  <Message content=\"Message 2\" />\n</MessageScroller>",
    "tags": [
      "chat",
      "scroller",
      "feed",
      "history"
    ]
  },
  {
    "id": "native-select",
    "name": "Native Select",
    "category": "Forms & Inputs",
    "description": "Styled standard HTML select dropdown.",
    "codeSnippet": "<NativeSelect defaultValue=\"us-east\">\n  <option value=\"us-east\">US East</option>\n  <option value=\"eu-central\">EU Central</option>\n</NativeSelect>",
    "tags": [
      "form",
      "select",
      "native",
      "dropdown"
    ]
  },
  {
    "id": "navigation-menu",
    "name": "Navigation Menu",
    "category": "Navigation",
    "description": "Header navigation with clean text links and flyout panels.",
    "codeSnippet": "<NavigationMenu sections={[{ title: \"Infrastructure\" }, { title: \"Docs\" }]} />",
    "tags": [
      "navigation",
      "menu",
      "header",
      "navbar"
    ]
  },
  {
    "id": "pagination",
    "name": "Pagination",
    "category": "Navigation",
    "description": "Page navigation with active pill indicator.",
    "codeSnippet": "<Pagination currentPage={page} totalPages={8} onPageChange={setPage} />",
    "tags": [
      "navigation",
      "pagination",
      "pages"
    ]
  },
  {
    "id": "popover",
    "name": "Popover",
    "category": "Overlay & Modals",
    "description": "Floating panel anchored to a trigger button.",
    "codeSnippet": "<Popover trigger={<Button variant=\"secondary\">Dimensions</Button>}>\n  <div>Canvas dimensions: 8000px � 6000px</div>\n</Popover>",
    "tags": [
      "overlay",
      "popover",
      "floating",
      "card"
    ]
  },
  {
    "id": "progress",
    "name": "Progress",
    "category": "Feedback & Status",
    "description": "Clean progress bar with rounded-full track.",
    "codeSnippet": "<Progress value={74} />",
    "tags": [
      "feedback",
      "progress",
      "meter",
      "loading"
    ]
  },
  {
    "id": "questionnaire",
    "name": "Questionnaire",
    "category": "Forms & Inputs",
    "description": "Multi-step survey card with radio selection options.",
    "codeSnippet": "<Questionnaire steps={steps} onComplete={handleComplete} />",
    "tags": [
      "form",
      "survey",
      "questionnaire",
      "steps"
    ]
  },
  {
    "id": "radio-group",
    "name": "Radio Group",
    "category": "Forms & Inputs",
    "description": "Single-choice radio options with centered indicator dot.",
    "codeSnippet": "<RadioGroup value={val} onValueChange={setVal}>\n  <RadioGroupItem value=\"node-1\" label=\"Compute Node\" />\n</RadioGroup>",
    "tags": [
      "form",
      "radio",
      "options",
      "selection"
    ]
  },
  {
    "id": "resizable",
    "name": "Resizable",
    "category": "Layout & Structure",
    "description": "Draggable split pane container.",
    "codeSnippet": "<Resizable left={<div>Left</div>} right={<div>Right</div>} />",
    "tags": [
      "layout",
      "resizable",
      "split-pane",
      "divider"
    ]
  },
  {
    "id": "scroll-area",
    "name": "Scroll Area",
    "category": "Layout & Structure",
    "description": "Custom scrollable container with slim monochrome scrollbar.",
    "codeSnippet": "<ScrollArea maxHeight={200}>\n  <div>Long content...</div>\n</ScrollArea>",
    "tags": [
      "layout",
      "scroll",
      "scrollbar",
      "overflow"
    ]
  },
  {
    "id": "search-bar",
    "name": "Search Bar",
    "category": "Forms & Inputs",
    "description": "Pill search input with shortcut badge, clear action, and filter button.",
    "codeSnippet": "<SearchBar placeholder=\"Search cluster nodes...\" />",
    "tags": [
      "form",
      "search",
      "filter",
      "input"
    ]
  },
  {
    "id": "select",
    "name": "Select",
    "category": "Forms & Inputs",
    "description": "Custom dropdown select with check marks and description text.",
    "codeSnippet": "<Select value={tier} onChange={setTier} options={tiers} />",
    "tags": [
      "form",
      "select",
      "dropdown",
      "picker"
    ]
  },
  {
    "id": "separator",
    "name": "Separator",
    "category": "Layout & Structure",
    "description": "1px divider line with optional centered text label.",
    "codeSnippet": "<Separator label=\"OR CONTINUE WITH\" />",
    "tags": [
      "layout",
      "separator",
      "divider",
      "line"
    ]
  },
  {
    "id": "sheet",
    "name": "Sheet",
    "category": "Overlay & Modals",
    "description": "Slide-over side sheet panel.",
    "codeSnippet": "<Sheet open={open} onOpenChange={setOpen} side=\"right\" title=\"Cluster Details\">\n  <div>Node statistics...</div>\n</Sheet>",
    "tags": [
      "modal",
      "sheet",
      "slide-over",
      "panel"
    ]
  },
  {
    "id": "sidebar",
    "name": "Sidebar",
    "category": "Navigation",
    "description": "Navigation sidebar with active pill item indicators.",
    "codeSnippet": "<Sidebar activeId=\"dash\" groups={groups} />",
    "tags": [
      "navigation",
      "sidebar",
      "rail",
      "menu"
    ]
  },
  {
    "id": "skeleton",
    "name": "Skeleton",
    "category": "Feedback & Status",
    "description": "Loading placeholder with shimmer gradient animation.",
    "codeSnippet": "<Skeleton className=\"h-10 w-10 rounded-full\" />",
    "tags": [
      "feedback",
      "skeleton",
      "shimmer",
      "loading"
    ]
  },
  {
    "id": "slider",
    "name": "Slider",
    "category": "Forms & Inputs",
    "description": "Range slider with rounded rectangle thumb.",
    "codeSnippet": "<Slider value={value} onChange={setValue} min={0} max={100} />",
    "tags": [
      "form",
      "slider",
      "range",
      "thumb"
    ]
  },
  {
    "id": "spinner",
    "name": "Spinner",
    "category": "Feedback & Status",
    "description": "Loading spinners (Ring, Bouncing Dots, Pulse Bars).",
    "codeSnippet": "<Spinner variant=\"ring\" size=\"default\" />",
    "tags": [
      "feedback",
      "spinner",
      "loader",
      "animation"
    ]
  },
  {
    "id": "switch",
    "name": "Switch",
    "category": "Forms & Inputs",
    "description": "Tactile toggle switch with high-contrast sliding circular knob.",
    "codeSnippet": "<Switch checked={active} onCheckedChange={setActive} label=\"Automated Backups\" />",
    "tags": [
      "form",
      "switch",
      "toggle",
      "boolean"
    ]
  },
  {
    "id": "table",
    "name": "Table",
    "category": "Data Display",
    "description": "Monochrome table with header, striped rows, and cell padding.",
    "codeSnippet": "<Table>\n  <TableHeader><TableRow><TableHead>Host</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>node-01</TableCell></TableRow></TableBody>\n</Table>",
    "tags": [
      "display",
      "table",
      "data",
      "rows"
    ]
  },
  {
    "id": "tabs",
    "name": "Tabs",
    "category": "Layout & Structure",
    "description": "Segmented tab navigation with sliding active pill indicator.",
    "codeSnippet": "<Tabs\n  variant=\"pill\"\n  activeTab={tab}\n  onTabChange={setTab}\n  tabs={[{ id: \"1\", label: \"Overview\" }, { id: \"2\", label: \"Logs\" }]}\n/>",
    "tags": [
      "layout",
      "tabs",
      "navigation",
      "views"
    ]
  },
  {
    "id": "textarea",
    "name": "Textarea",
    "category": "Forms & Inputs",
    "description": "Multi-line text field with character count indicator.",
    "codeSnippet": "<Textarea placeholder=\"Enter deployment notes...\" maxLength={300} showCount />",
    "tags": [
      "form",
      "textarea",
      "input",
      "multiline"
    ]
  },
  {
    "id": "toast",
    "name": "Toast",
    "category": "Feedback & Status",
    "description": "Notification manager triggered imperatively with toast().",
    "codeSnippet": "toast({ title: \"Build Deployed\", description: \"Node 1 updated.\" });",
    "tags": [
      "feedback",
      "toast",
      "notification",
      "snackbar"
    ]
  },
  {
    "id": "toggle",
    "name": "Toggle",
    "category": "Forms & Inputs",
    "description": "Two-state icon toggle button.",
    "codeSnippet": "<Toggle pressed={isBold} onPressedChange={setIsBold}>\n  <Bold className=\"h-4 w-4 mr-1\" /> Bold\n</Toggle>",
    "tags": [
      "form",
      "toggle",
      "button",
      "state"
    ]
  },
  {
    "id": "toggle-group",
    "name": "Toggle Group",
    "category": "Forms & Inputs",
    "description": "Connected toggle options with bouncy spring active background.",
    "codeSnippet": "<ToggleGroup value={align} onChange={setAlign} options={alignOptions} />",
    "tags": [
      "form",
      "toggle-group",
      "segmented",
      "alignment"
    ]
  },
  {
    "id": "tooltip",
    "name": "Tooltip",
    "category": "Overlay & Modals",
    "description": "Compact black pill tooltip with white text.",
    "codeSnippet": "<Tooltip content=\"Synchronize repository\">\n  <Button variant=\"secondary\">Sync</Button>\n</Tooltip>",
    "tags": [
      "overlay",
      "tooltip",
      "hint",
      "hover"
    ]
  },
  {
    "id": "typography",
    "name": "Typography",
    "category": "Data Display",
    "description": "Hierarchy scales for headings, paragraphs, and inline code.",
    "codeSnippet": "<Typography variant=\"h2\">Architecture Overview</Typography>",
    "tags": [
      "display",
      "typography",
      "text",
      "heading"
    ]
  }
];
