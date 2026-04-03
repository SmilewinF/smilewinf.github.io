export function WindowFrame() {
  const frameColor = "#5c4a3a";
  const thickness = 0.08;

  return (
    <group position={[0, 3, -4.95]}>
      {/* Top frame */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[2.2, thickness, 0.15]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Bottom frame */}
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[2.2, thickness, 0.15]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Left frame */}
      <mesh position={[-1.05, 0, 0]}>
        <boxGeometry args={[thickness, 3, 0.15]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Right frame */}
      <mesh position={[1.05, 0, 0]}>
        <boxGeometry args={[thickness, 3, 0.15]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Light beam (subtle volumetric effect) */}
      <mesh position={[0, -0.5, 2.5]} rotation={[-0.3, 0, 0]}>
        <coneGeometry args={[2.5, 5, 4]} />
        <meshBasicMaterial color="#fff8e7" transparent opacity={0.03} />
      </mesh>
    </group>
  );
}
