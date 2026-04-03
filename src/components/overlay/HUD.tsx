import { useAppStore } from "../../stores/useAppStore";

export function HUD() {
  const phase = useAppStore((s) => s.phase);

  if (phase === "loading" || phase === "intro") return null;

  return (
    <div className="hud">
      {phase === "exploring" && (
        <p className="hud-hint">Click on objects to explore</p>
      )}
      {phase === "viewing-section" && (
        <p className="hud-hint">Press ESC to go back</p>
      )}
    </div>
  );
}
