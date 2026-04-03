import { COLORS } from "../../constants/colors";

export function Floor() {
  return (
    <mesh position={[0, -0.1, 0]} receiveShadow>
      <boxGeometry args={[12, 0.2, 10]} />
      <meshStandardMaterial color={COLORS.floor} />
    </mesh>
  );
}
