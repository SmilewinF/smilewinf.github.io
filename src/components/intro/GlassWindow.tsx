import { COLORS } from "../../constants/colors";

interface GlassWindowProps {
  broken: boolean;
}

export function GlassWindow({ broken }: GlassWindowProps) {
  if (broken) return null;

  // Matches the window opening: centered at (0, 2.0, -5), 1.2m wide, 1.6m tall
  return (
    <mesh position={[0, 2.0, -4.95]}>
      <planeGeometry args={[1.2, 1.6]} />
      <meshPhysicalMaterial
        color={COLORS.glass}
        transmission={0.9}
        roughness={0.1}
        thickness={0.1}
        transparent
        opacity={0.4}
      />
    </mesh>
  );
}
