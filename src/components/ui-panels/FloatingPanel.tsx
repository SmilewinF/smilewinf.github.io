import { Html } from "@react-three/drei";
import { useAppStore, type Section } from "../../stores/useAppStore";
import type { ReactNode } from "react";
import "../../styles/panels.css";

interface FloatingPanelProps {
  section: Section;
  position?: [number, number, number];
  children: ReactNode;
}

export function FloatingPanel({ section, position = [0, 2, 1.5], children }: FloatingPanelProps) {
  const activeSection = useAppStore((s) => s.activeSection);
  const closeSection = useAppStore((s) => s.closeSection);

  if (activeSection !== section) return null;

  return (
    <Html
      position={position}
      transform
      distanceFactor={8}
      className="floating-panel-wrapper"
      style={{ pointerEvents: "auto" }}
    >
      <div className="floating-panel">
        <button className="panel-close" onClick={closeSection}>
          &times;
        </button>
        {children}
      </div>
    </Html>
  );
}
