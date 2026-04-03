import { createPortal } from "react-dom";
import { useAppStore, type Section } from "../../stores/useAppStore";
import type { ReactNode } from "react";
import "../../styles/panels.css";

interface FloatingPanelProps {
  section: Section;
  children: ReactNode;
}

export function FloatingPanel({ section, children }: FloatingPanelProps) {
  const activeSection = useAppStore((s) => s.activeSection);
  const closeSection = useAppStore((s) => s.closeSection);

  if (activeSection !== section) return null;

  // Portal the HTML panel to the document body so it's always screen-space
  return createPortal(
    <div className="floating-panel-overlay">
      <div className="floating-panel">
        <button className="panel-close" onClick={closeSection}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
