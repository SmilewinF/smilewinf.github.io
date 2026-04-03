import { useInteractable } from "../../hooks/useInteractable";
import { COLORS } from "../../constants/colors";
import { ProjectsPanel } from "../ui-panels/ProjectsPanel";

export function DisplayShelf() {
  const { handlers, isHovered } = useInteractable("projects");
  const emissiveIntensity = isHovered ? 0.4 : 0;
  const mat = {
    color: COLORS.shelf,
    emissive: COLORS.glow,
    emissiveIntensity,
  };

  const itemColors = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"];

  // Bookshelf: ~1.8m tall, ~1m wide, ~0.35m deep, sitting on the floor against the wall
  return (
    <group position={[4, 0, -4]} {...handlers}>
      {/* Back panel */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[1.2, 1.8, 0.05]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Side panels */}
      <mesh position={[-0.58, 0.9, 0.15]} castShadow>
        <boxGeometry args={[0.04, 1.8, 0.35]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      <mesh position={[0.58, 0.9, 0.15]} castShadow>
        <boxGeometry args={[0.04, 1.8, 0.35]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Top */}
      <mesh position={[0, 1.8, 0.15]} castShadow>
        <boxGeometry args={[1.2, 0.04, 0.35]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Shelves at 0.0 (bottom), 0.45, 0.9, 1.35 */}
      {[0.02, 0.45, 0.9, 1.35].map((y, i) => (
        <mesh key={i} position={[0, y, 0.15]} castShadow>
          <boxGeometry args={[1.12, 0.04, 0.32]} />
          <meshStandardMaterial {...mat} />
        </mesh>
      ))}
      {/* Items on shelves */}
      {[0.02, 0.45, 0.9, 1.35].map((shelfY, si) =>
        [-0.3, 0, 0.3].map((x, xi) => (
          <mesh key={`${si}-${xi}`} position={[x, shelfY + 0.15, 0.15]}>
            {(si + xi) % 3 === 0 ? (
              <boxGeometry args={[0.15, 0.22, 0.12]} />
            ) : (si + xi) % 3 === 1 ? (
              <sphereGeometry args={[0.08, 8, 8]} />
            ) : (
              <cylinderGeometry args={[0.06, 0.06, 0.18, 8]} />
            )}
            <meshStandardMaterial color={itemColors[(si * 3 + xi) % itemColors.length]} />
          </mesh>
        ))
      )}

      <ProjectsPanel />
    </group>
  );
}
