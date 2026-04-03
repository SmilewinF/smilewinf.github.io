import { Html } from "@react-three/drei";
import { useAppStore, type Hotspot as HotspotType } from "../../stores/useAppStore";
import "../../styles/hotspot.css";

interface HotspotProps {
  name: HotspotType;
  position: [number, number, number];
  label: string;
}

export function Hotspot({ name, position, label }: HotspotProps) {
  const phase = useAppStore((s) => s.phase);
  const openHotspot = useAppStore((s) => s.openHotspot);
  const setHoveredHotspot = useAppStore((s) => s.setHoveredHotspot);

  // Hide during intro or when a panel is already open
  if (phase !== "exploring") return null;

  return (
    <Html position={position} center zIndexRange={[50, 0]}>
      <div
        className="hotspot-dot"
        onPointerEnter={() => {
          setHoveredHotspot(name);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          setHoveredHotspot(null);
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "default";
          openHotspot(name);
        }}
      >
        <div className="hotspot-pulse" />
        <span className="hotspot-label">{label}</span>
      </div>
    </Html>
  );
}
