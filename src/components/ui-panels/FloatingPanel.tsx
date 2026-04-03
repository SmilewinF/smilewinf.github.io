import { createPortal } from "react-dom";
import { useAppStore, type Hotspot } from "../../stores/useAppStore";
import type { ReactNode } from "react";
import "../../styles/panels.css";

interface FloatingPanelProps {
  hotspot: Hotspot;
  children: ReactNode;
}

export function FloatingPanel({ hotspot, children }: FloatingPanelProps) {
  const activeHotspot = useAppStore((s) => s.activeHotspot);
  const closeHotspot = useAppStore((s) => s.closeHotspot);

  if (activeHotspot !== hotspot) return null;

  return createPortal(
    <div className="floating-panel-backdrop" onClick={closeHotspot}>
      <div className="floating-panel" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" onClick={closeHotspot}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
