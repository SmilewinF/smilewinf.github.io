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
    const side = index === 0 ? -1 : 1;
    return {
      baseX: -6 - index * 2,
      baseY: -1.5 - index * 0.5,
      baseZ: side * (5 + index * 2),
      driftSpeedX: 0.12 + index * 0.05,
      driftSpeedY: 0.18 + index * 0.03,
      driftSpeedZ: 0.09 + index * 0.04,
      rollSpeed: 0.25 + index * 0.1,
      driftX: 1.5,
      driftY: 0.8,
      driftZ: 1.2,
      // Barrel roll timing — each wingman rolls at different intervals
      barrelRollInterval: 15 + index * 8, // seconds between rolls
      barrelRollDuration: 1.8, // how long a roll takes
      barrelRollOffset: index * 5, // stagger start so they don't roll together
    };
  }, [index]);

  const innerRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || !innerRef.current) return;
    const t = clock.getElapsedTime();
    const p = params;

    // Smooth drifting around their base position
    groupRef.current.position.x = p.baseX + Math.sin(t * p.driftSpeedX) * p.driftX;
    groupRef.current.position.y = p.baseY + Math.sin(t * p.driftSpeedY + 1.5) * p.driftY;
    groupRef.current.position.z = p.baseZ + Math.sin(t * p.driftSpeedZ + 3) * p.driftZ;

    // Subtle banking from drift
    const bankAngle = Math.cos(t * p.driftSpeedZ + 3) * p.driftZ * 0.04;
    groupRef.current.rotation.z = bankAngle;
    groupRef.current.rotation.x = Math.sin(t * p.rollSpeed) * 0.02;

    // Barrel roll — rolls around the local X axis (along the fuselage)
    const rollTime = (t + p.barrelRollOffset) % p.barrelRollInterval;
    if (rollTime < p.barrelRollDuration) {
      // Smooth roll: ease in and out using smoothstep
      const rollProgress = rollTime / p.barrelRollDuration;
      const eased = rollProgress * rollProgress * (3 - 2 * rollProgress);
      innerRef.current.rotation.x = eased * Math.PI * 2;
    } else {
      innerRef.current.rotation.x = 0;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        <primitive
          object={clonedScene}
          scale={0.25}
          rotation={[0, Math.PI / 2, 0]}
        />
        <VaporTrail position={[-2.1, 0, -1.9]} length={10} opacity={0.15} />
        <VaporTrail position={[-2.1, 0, 1.8]} length={10} opacity={0.15} />
      </group>
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
