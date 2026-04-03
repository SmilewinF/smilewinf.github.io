import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { Hotspot } from "./Hotspot";
import { VaporTrail } from "./VaporTrail";

const MODEL_PATH = "/sukhoi_su-34.glb";

export function FighterJet() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // Subtle pitch/roll oscillation
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.015;
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={0.3}
        rotation={[0, Math.PI / 2, 0]}
        position={[-1.5, 0, 0]}
      />

      {/* Vapor trails on wingtips */}
      <VaporTrail position={[-2.5, 0, -2.3]} length={14} opacity={0.25} />
      <VaporTrail position={[-2.5, 0, 2.2]} length={14} opacity={0.25} />

      <Hotspot name="pilot" position={[1.0, 0.25, 0]} label="About Me" />
      <Hotspot name="nose" position={[2.0, 0, -0.2]} label="Projects" />
      <Hotspot name="wing" position={[-1.5, 0.3, -2.0]} label="Experience" />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
