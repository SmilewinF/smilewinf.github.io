import { useInteractable } from "../../hooks/useInteractable";
import { COLORS } from "../../constants/colors";
import { SkillsPanel } from "../ui-panels/SkillsPanel";

export function ToolBoard() {
  const { handlers, isHovered } = useInteractable("skills");
  const emissiveIntensity = isHovered ? 0.4 : 0;

  return (
    <group position={[0, 2.5, -4.8]} {...handlers}>
      {/* Board */}
      <mesh castShadow>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial
          color={COLORS.toolBoard}
          emissive={COLORS.glow}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Tools - various shapes */}
      {/* Screwdriver */}
      <mesh position={[-1, 0.5, 0.1]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      {/* Wrench */}
      <mesh position={[-0.3, 0.5, 0.1]}>
        <torusGeometry args={[0.12, 0.03, 8, 16]} />
        <meshStandardMaterial color="#95a5a6" />
      </mesh>
      {/* Hammer head */}
      <mesh position={[0.5, 0.5, 0.1]}>
        <boxGeometry args={[0.25, 0.1, 0.08]} />
        <meshStandardMaterial color="#7f8c8d" />
      </mesh>
      <mesh position={[0.5, 0.25, 0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
      {/* Pins / decorative */}
      {[
        [-0.8, -0.3],
        [0, -0.3],
        [0.8, -0.3],
        [-0.5, -0.6],
        [0.5, -0.6],
        [1, 0.3],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.1]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c"][i]}
          />
        </mesh>
      ))}

      <SkillsPanel />
    </group>
  );
}
