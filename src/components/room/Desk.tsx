import { useInteractable } from "../../hooks/useInteractable";
import { COLORS } from "../../constants/colors";
import { ExperiencePanel } from "../ui-panels/ExperiencePanel";

export function Desk() {
  const { handlers, isHovered } = useInteractable("experience");
  const emissiveIntensity = isHovered ? 0.4 : 0;

  return (
    <group position={[-3.5, 0, -1]} {...handlers}>
      {/* Table surface */}
      <mesh position={[0, 1, 0]} castShadow>
        <boxGeometry args={[2, 0.1, 1]} />
        <meshStandardMaterial
          color={COLORS.desk}
          emissive={COLORS.glow}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Legs */}
      {[
        [-0.85, 0.5, -0.4],
        [0.85, 0.5, -0.4],
        [-0.85, 0.5, 0.4],
        [0.85, 0.5, 0.4],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
          <meshStandardMaterial
            color={COLORS.desk}
            emissive={COLORS.glow}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>
      ))}
      {/* Monitor */}
      <mesh position={[0, 1.55, -0.25]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.05]} />
        <meshStandardMaterial
          color="#2a2a2a"
          emissive={COLORS.glow}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {/* Monitor stand */}
      <mesh position={[0, 1.2, -0.25]}>
        <boxGeometry args={[0.15, 0.3, 0.05]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, 1.06, 0.15]}>
        <boxGeometry args={[0.5, 0.02, 0.18]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Chair */}
      <mesh position={[0, 0.6, 0.8]}>
        <boxGeometry args={[0.5, 0.05, 0.5]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0, 0.3, 0.8]}>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#444" />
      </mesh>

      <ExperiencePanel />
    </group>
  );
}
