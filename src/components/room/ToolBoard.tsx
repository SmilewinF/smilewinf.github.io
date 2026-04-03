import { useInteractable } from "../../hooks/useInteractable";
import { COLORS } from "../../constants/colors";
import { SkillsPanel } from "../ui-panels/SkillsPanel";

export function ToolBoard() {
  const { handlers, isHovered } = useInteractable("skills");
  const emissiveIntensity = isHovered ? 0.4 : 0;

  // Board mounted on the LEFT wall at eye height (~1.5m center), not floating
  return (
    <group position={[-5.8, 1.5, -2]} rotation={[0, Math.PI / 2, 0]} {...handlers}>
      {/* Board — 1.2m wide, 0.8m tall */}
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.8, 0.05]} />
        <meshStandardMaterial
          color={COLORS.toolBoard}
          emissive={COLORS.glow}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Tools mounted on board */}
      {/* Screwdriver */}
      <mesh position={[-0.4, 0.2, 0.05]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.02, 0.02, 0.35, 8]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      {/* Wrench */}
      <mesh position={[-0.1, 0.2, 0.05]}>
        <torusGeometry args={[0.08, 0.02, 8, 16]} />
        <meshStandardMaterial color="#95a5a6" />
      </mesh>
      {/* Hammer */}
      <mesh position={[0.25, 0.25, 0.05]}>
        <boxGeometry args={[0.18, 0.07, 0.05]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
      <mesh position={[0.25, 0.08, 0.05]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
      {/* Colored pins representing different skills */}
      {[
        [-0.4, -0.15],
        [-0.15, -0.15],
        [0.1, -0.15],
        [0.35, -0.15],
        [-0.25, -0.3],
        [0.25, -0.3],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.05]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial
            color={["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"][i]}
          />
        </mesh>
      ))}

      <SkillsPanel />
    </group>
  );
}
