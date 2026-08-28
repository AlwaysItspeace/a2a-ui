import * as React from "react";
import { FormShowcase } from "./FormShowcases";
import { DisplayShowcase } from "./DisplayShowcases";
import { OverlayShowcase } from "./OverlayShowcases";

export function ComponentShowcase({ id }: { id: string }) {
  const formPreview = FormShowcase({ id });
  if (formPreview) return formPreview;

  const displayPreview = DisplayShowcase({ id });
  if (displayPreview) return displayPreview;

  const overlayPreview = OverlayShowcase({ id });
  if (overlayPreview) return overlayPreview;

  return (
    <div className="py-6 text-center text-xs text-zinc-400 font-mono">
      Interactive preview for {id}
    </div>
  );
}
