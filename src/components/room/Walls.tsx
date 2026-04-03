import { COLORS } from "../../constants/colors";

export function Walls() {
  return (
    <group>
      {/* Back wall - left section */}
      <mesh position={[-3.5, 3, -5]}>
        <boxGeometry args={[5, 6, 0.2]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Back wall - right section */}
      <mesh position={[3.5, 3, -5]}>
        <boxGeometry args={[5, 6, 0.2]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Back wall - above window */}
      <mesh position={[0, 5.25, -5]}>
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Back wall - below window */}
      <mesh position={[0, 0.75, -5]}>
        <boxGeometry args={[2, 1.5, 0.2]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-6, 3, 0]}>
        <boxGeometry args={[0.2, 6, 10]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Right wall */}
      <mesh position={[6, 3, 0]}>
        <boxGeometry args={[0.2, 6, 10]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
    </group>
  );
}
