import { useCallback } from "react";
import { useAppStore, type Section } from "../stores/useAppStore";
import type { ThreeEvent } from "@react-three/fiber";

export function useInteractable(section: Section) {
  const phase = useAppStore((s) => s.phase);
  const hoveredSection = useAppStore((s) => s.hoveredSection);
  const openSection = useAppStore((s) => s.openSection);
  const setHoveredSection = useAppStore((s) => s.setHoveredSection);

  const isInteractive = phase === "exploring";
  const isHovered = hoveredSection === section;

  const onPointerOver = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      if (!isInteractive) return;
      e.stopPropagation();
      setHoveredSection(section);
      document.body.style.cursor = "pointer";
    },
    [isInteractive, section, setHoveredSection]
  );

  const onPointerOut = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation();
      setHoveredSection(null);
      document.body.style.cursor = "default";
    },
    [setHoveredSection]
  );

  const onClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      if (!isInteractive) return;
      e.stopPropagation();
      document.body.style.cursor = "default";
      openSection(section);
    },
    [isInteractive, section, openSection]
  );

  return {
    handlers: { onPointerOver, onPointerOut, onClick },
    isHovered,
    isInteractive,
  };
}
