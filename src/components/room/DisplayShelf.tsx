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

  return (
    <group position={[4.5, 0, -3]} {...handlers}>
      {/* Back panel */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[2, 3, 0.15]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Shelves */}
      {[0.7, 1.5, 2.3].map((y, i) => (
        <mesh key={i} position={[0, y, 0.2]} castShadow>
          <boxGeometry args={[1.8, 0.08, 0.4]} />
          <meshStandardMaterial {...mat} />
        </mesh>
      ))}
      {/* Items on shelves */}
      {[0.7, 1.5, 2.3].map((shelfY, si) =>
        [-0.5, 0, 0.5].map((x, xi) => (
          <mesh key={`${si}-${xi}`} position={[x, shelfY + 0.2, 0.2]}>
            {si % 2 === 0 ? (
              <boxGeometry args={[0.25, 0.25, 0.2]} />
            ) : (
              <sphereGeometry args={[0.12, 8, 8]} />
            )}
            <meshStandardMaterial color={itemColors[(si * 3 + xi) % itemColors.length]} />
          </mesh>
        ))
      )}

      <ProjectsPanel />
    </group>
  );
}
