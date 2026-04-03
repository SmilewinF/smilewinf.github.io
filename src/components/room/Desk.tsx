import { useInteractable } from "../../hooks/useInteractable";
import { COLORS } from "../../constants/colors";
import { ExperiencePanel } from "../ui-panels/ExperiencePanel";

export function Desk() {
  const { handlers, isHovered } = useInteractable("experience");
  const emissiveIntensity = isHovered ? 0.4 : 0;
  const glowMat = (color: string) => ({
    color,
    emissive: COLORS.glow,
    emissiveIntensity,
  });

  return (
    <group position={[-3.5, 0, -2]} {...handlers}>
      {/* Table surface — standard desk height ~0.75m, width ~1.5m, depth ~0.8m */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[1.5, 0.06, 0.8]} />
        <meshStandardMaterial {...glowMat(COLORS.desk)} />
      </mesh>
      {/* Legs */}
      {[
        [-0.65, 0.375, -0.32],
        [0.65, 0.375, -0.32],
        [-0.65, 0.375, 0.32],
        [0.65, 0.375, 0.32],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <boxGeometry args={[0.06, 0.75, 0.06]} />
          <meshStandardMaterial {...glowMat(COLORS.desk)} />
        </mesh>
      ))}
      {/* Monitor — ~24 inch, sitting on desk */}
      <mesh position={[0, 1.15, -0.2]} castShadow>
        <boxGeometry args={[0.6, 0.4, 0.03]} />
        <meshStandardMaterial {...glowMat("#2a2a2a")} />
      </mesh>
      {/* Monitor screen (slightly inset, lighter) */}
      <mesh position={[0, 1.16, -0.18]}>
        <boxGeometry args={[0.52, 0.32, 0.01]} />
        <meshStandardMaterial color="#1a3a5c" emissive="#1a3a5c" emissiveIntensity={0.3} />
      </mesh>
      {/* Monitor stand */}
      <mesh position={[0, 0.92, -0.2]}>
        <boxGeometry args={[0.08, 0.28, 0.06]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Monitor base */}
      <mesh position={[0, 0.79, -0.2]}>
        <boxGeometry args={[0.25, 0.02, 0.15]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, 0.79, 0.1]}>
        <boxGeometry args={[0.4, 0.015, 0.14]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Mouse */}
      <mesh position={[0.35, 0.79, 0.1]}>
        <boxGeometry args={[0.06, 0.02, 0.1]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      {/* Chair — behind desk */}
      <group position={[0, 0, 0.9]}>
        {/* Seat */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.5, 0.06, 0.5]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 0.85, -0.22]}>
          <boxGeometry args={[0.48, 0.5, 0.05]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        {/* Pedestal */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        {/* Base star (simplified as a cylinder) */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.04, 5]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      </group>

      <ExperiencePanel />
    </group>
  );
}
