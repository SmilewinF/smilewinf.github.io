import { COLORS } from "../../constants/colors";

export function Walls() {
  // Room: 12 wide (x: -6 to 6), 3.5 tall (y: 0 to 3.5), 10 deep (z: -5 to 5)
  const wallHeight = 3.5;
  const halfHeight = wallHeight / 2;

  return (
    <group>
      {/* Back wall — split around window opening (window is ~1.2m wide, ~1.6m tall, centered at y=2) */}
      {/* Left of window */}
      <mesh position={[-3.3, halfHeight, -5]}>
        <boxGeometry args={[5.4, wallHeight, 0.2]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Right of window */}
      <mesh position={[3.3, halfHeight, -5]}>
        <boxGeometry args={[5.4, wallHeight, 0.2]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Above window */}
      <mesh position={[0, 3.15, -5]}>
        <boxGeometry args={[1.4, 0.7, 0.2]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Below window */}
      <mesh position={[0, 0.6, -5]}>
        <boxGeometry args={[1.4, 1.2, 0.2]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-6, halfHeight, 0]}>
        <boxGeometry args={[0.2, wallHeight, 10]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Right wall */}
      <mesh position={[6, halfHeight, 0]}>
        <boxGeometry args={[0.2, wallHeight, 10]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, wallHeight, 0]}>
        <boxGeometry args={[12, 0.1, 10]} />
        <meshStandardMaterial color={COLORS.walls} />
      </mesh>
      {/* Baseboard trim — subtle darker strip at bottom of walls */}
      <mesh position={[0, 0.05, -4.95]}>
        <boxGeometry args={[12, 0.1, 0.05]} />
        <meshStandardMaterial color="#c4b8a8" />
      </mesh>
      <mesh position={[-5.95, 0.05, 0]}>
        <boxGeometry args={[0.05, 0.1, 10]} />
        <meshStandardMaterial color="#c4b8a8" />
      </mesh>
      <mesh position={[5.95, 0.05, 0]}>
        <boxGeometry args={[0.05, 0.1, 10]} />
        <meshStandardMaterial color="#c4b8a8" />
      </mesh>
    </group>
  );
}
