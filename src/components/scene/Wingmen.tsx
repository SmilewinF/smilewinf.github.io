import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { VaporTrail } from "./VaporTrail";

const MODEL_PATH = "/sukhoi_su-34.glb";

function Wingman({ index }: { index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  // Clone the scene so each wingman has its own instance
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // Each wingman gets unique animation parameters
  const params = useMemo(() => {
    const side = index === 0 ? -1 : 1; // left or right of leader
    return {
      // Base offset behind and to the side of the lead jet
      baseX: -6 - index * 2,
      baseY: -1.5 - index * 0.5,
      baseZ: side * (5 + index * 2),
      // Animation speeds (different per wingman so they don't sync)
      driftSpeedX: 0.12 + index * 0.05,
      driftSpeedY: 0.18 + index * 0.03,
      driftSpeedZ: 0.09 + index * 0.04,
      rollSpeed: 0.25 + index * 0.1,
      // Drift amplitudes
      driftX: 1.5,
      driftY: 0.8,
      driftZ: 1.2,
    };
  }, [index]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const p = params;

    // Smooth drifting around their base position
    groupRef.current.position.x = p.baseX + Math.sin(t * p.driftSpeedX) * p.driftX;
    groupRef.current.position.y = p.baseY + Math.sin(t * p.driftSpeedY + 1.5) * p.driftY;
    groupRef.current.position.z = p.baseZ + Math.sin(t * p.driftSpeedZ + 3) * p.driftZ;

    // Subtle roll and pitch — reacting to their "drift" as if banking
    const bankAngle = Math.cos(t * p.driftSpeedZ + 3) * p.driftZ * 0.04;
    groupRef.current.rotation.z = bankAngle;
    groupRef.current.rotation.x = Math.sin(t * p.rollSpeed) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={clonedScene}
        scale={0.25}
        rotation={[0, Math.PI / 2, 0]}
      />
      <VaporTrail position={[-2.1, 0, -1.9]} length={10} opacity={0.15} />
      <VaporTrail position={[-2.1, 0, 1.8]} length={10} opacity={0.15} />
    </group>
  );
}

export function Wingmen() {
  return (
    <>
      <Wingman index={0} />
      <Wingman index={1} />
    </>
  );
}
