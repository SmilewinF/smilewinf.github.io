export function WindowFrame() {
  const frameColor = "#5c4a3a";

  // Window opening: centered at x=0, y=2.0 on back wall (z=-5)
  // Opening size: ~1.2m wide, ~1.6m tall (from y=1.2 to y=2.8)
  return (
    <group position={[0, 2.0, -4.95]}>
      {/* Top frame */}
      <mesh position={[0, 0.82, 0]}>
        <boxGeometry args={[1.3, 0.06, 0.12]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Bottom frame (windowsill) */}
      <mesh position={[0, -0.82, 0]}>
        <boxGeometry args={[1.4, 0.06, 0.18]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Left frame */}
      <mesh position={[-0.63, 0, 0]}>
        <boxGeometry args={[0.06, 1.7, 0.12]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Right frame */}
      <mesh position={[0.63, 0, 0]}>
        <boxGeometry args={[0.06, 1.7, 0.12]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Cross bar (horizontal middle) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.04, 0.06]} />
        <meshStandardMaterial color={frameColor} />
      </mesh>
      {/* Light beam coming through window */}
      <mesh position={[0, -1.0, 3]} rotation={[-0.4, 0, 0]}>
        <coneGeometry args={[2, 6, 4]} />
        <meshBasicMaterial color="#fff8e7" transparent opacity={0.02} />
      </mesh>
    </group>
  );
}
