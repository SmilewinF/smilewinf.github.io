import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "../../stores/useAppStore";
import { Hotspot } from "./Hotspot";
import { VaporTrail } from "./VaporTrail";

const MODEL_PATH = "/sukhoi_su-34.glb";
const BARREL_ROLL_DURATION = 1.8;

export function FighterJet() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  // Barrel roll state
  const rollTimer = useRef(-1); // -1 = not rolling
  const prevHotspot = useRef<string | null>(null);

  const activeHotspot = useAppStore((s) => s.activeHotspot);

  // Trigger barrel roll when a hotspot is opened
  useEffect(() => {
    if (activeHotspot && activeHotspot !== prevHotspot.current) {
      rollTimer.current = 0;
    }
    prevHotspot.current = activeHotspot;
  }, [activeHotspot]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current || !innerRef.current) return;
    const t = clock.getElapsedTime();

    // Subtle pitch/roll oscillation on outer group
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.015;

    // Barrel roll on inner group
    if (rollTimer.current >= 0) {
      rollTimer.current += delta;
      if (rollTimer.current < BARREL_ROLL_DURATION) {
        const p = rollTimer.current / BARREL_ROLL_DURATION;
        const eased = p * p * (3 - 2 * p);
        innerRef.current.rotation.x = eased * Math.PI * 2;
      } else {
        innerRef.current.rotation.x = 0;
        rollTimer.current = -1;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={innerRef}>
        <primitive
          object={scene}
          scale={0.3}
          rotation={[0, Math.PI / 2, 0]}
          position={[-1.5, 0, 0]}
        />

        {/* Vapor trails on wingtips */}
        <VaporTrail position={[-2.5, 0, -2.3]} length={14} opacity={0.25} />
        <VaporTrail position={[-2.5, 0, 2.2]} length={14} opacity={0.25} />
      </group>

      <Hotspot name="pilot" position={[1.0, 0.25, 0]} label="About Me" />
      <Hotspot name="nose" position={[2.0, 0, -0.2]} label="Projects" />
      <Hotspot name="wing" position={[-1.5, 0.3, -2.0]} label="Experience" />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
