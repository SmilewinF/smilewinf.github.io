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

  return (
    <group position={[4.5, 0, 2]} {...handlers}>
      {/* Post */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
        <meshStandardMaterial color="#5c4a3a" />
      </mesh>
      {/* Body */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[0.6, 0.7, 0.4]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Rounded top */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.05, 16, 1, false, 0, Math.PI]} />
        <meshStandardMaterial {...mat} />
      </mesh>
      {/* Flag */}
      <mesh position={[0.35, 1.6, 0]} castShadow>
        <boxGeometry args={[0.05, 0.35, 0.05]} />
        <meshStandardMaterial color={COLORS.accent} />
      </mesh>
      {/* Flag arm */}
      <mesh position={[0.42, 1.75, 0]}>
        <boxGeometry args={[0.12, 0.04, 0.04]} />
        <meshStandardMaterial color={COLORS.accent} />
      </mesh>

      <ContactPanel />
    </group>
  );
}
