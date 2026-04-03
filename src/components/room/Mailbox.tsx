import { useInteractable } from "../../hooks/useInteractable";
import { COLORS } from "../../constants/colors";
import { ContactPanel } from "../ui-panels/ContactPanel";

export function Mailbox() {
  const { handlers, isHovered } = useInteractable("contact");
  const emissiveIntensity = isHovered ? 0.4 : 0;
  const mat = {
    color: COLORS.mailbox,
    emissive: COLORS.glow,
    emissiveIntensity,
  };

  // Mailbox on a post, sitting on the floor on the right side of the room
  return (
    <group position={[4, 0, 1]} {...handlers}>
      {/* Post */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 8]} />
        <meshStandardMaterial color="#5c4a3a" />
      </mesh>
      {/* Body — classic mailbox shape */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[0.45, 0.35, 0.3]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Rounded top */}
      <mesh position={[0, 1.35, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.45, 12, 1, false, 0, Math.PI]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Mail slot */}
      <mesh position={[0, 1.18, 0.16]}>
        <boxGeometry args={[0.2, 0.03, 0.01]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Flag */}
      <mesh position={[0.28, 1.15, 0]} castShadow>
        <boxGeometry args={[0.04, 0.25, 0.04]} />
        <meshStandardMaterial color={COLORS.accent} />
      </mesh>
      <mesh position={[0.34, 1.25, 0]}>
        <boxGeometry args={[0.1, 0.04, 0.04]} />
        <meshStandardMaterial color={COLORS.accent} />
      </mesh>

      <ContactPanel />
    </group>
  );
}
