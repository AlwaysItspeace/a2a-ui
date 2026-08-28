export type ComponentCategory =
  | "All"
  | "Forms & Inputs"
  | "Data Display"
  | "Feedback & Status"
  | "Navigation"
  | "Overlay & Modals"
  | "Layout & Structure"
  | "Charts & Metrics"
  | "Chat & Messaging";

export interface ComponentMeta {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  tags: string[];
  codeSnippet: string;
  propsDoc?: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
}

export interface CanvasPosition {
  x: number;
  y: number;
}

export interface ComponentNodeData {
  id: string;
  title: string;
  category: ComponentCategory;
  defaultPosition: CanvasPosition;
  width?: number;
  height?: number;
}
