import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Hotspot } from "./Hotspot";

const JET_COLOR = "#6B7B8D";
const DARK_GRAY = "#4A5568";
const COCKPIT_COLOR = "#3B82F6";

export function FighterJet() {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle pitch/roll oscillation for realism
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.015;
  });

  return (
    <group ref={groupRef}>
      {/* === FUSELAGE === */}
      {/* Main body — elongated along X */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.25, 0.35, 5, 12]} />
        <meshStandardMaterial color={JET_COLOR} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Nose cone */}
      <mesh position={[3, 0, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <coneGeometry args={[0.25, 1.5, 12]} />
        <meshStandardMaterial color={JET_COLOR} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Tail taper */}
      <mesh position={[-3, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <coneGeometry args={[0.15, 1.2, 12]} />
        <meshStandardMaterial color={DARK_GRAY} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* === COCKPIT CANOPY === */}
      <mesh position={[1.2, 0.35, 0]} scale={[1.4, 0.8, 0.7]}>
        <sphereGeometry args={[0.3, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color={COCKPIT_COLOR}
          transmission={0.6}
          roughness={0.05}
          thickness={0.2}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* === DELTA WINGS === */}
      {/* Left wing (-Z side, facing camera in settled view) */}
      <mesh position={[-0.3, -0.05, -1.5]} rotation={[0.05, 0.3, 0]} castShadow>
        <boxGeometry args={[2.2, 0.05, 2.0]} />
        <meshStandardMaterial color={JET_COLOR} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Right wing */}
      <mesh position={[-0.3, -0.05, 1.5]} rotation={[-0.05, -0.3, 0]} castShadow>
        <boxGeometry args={[2.2, 0.05, 2.0]} />
        <meshStandardMaterial color={JET_COLOR} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* === TAIL === */}
      {/* Vertical stabilizer */}
      <mesh position={[-2.8, 0.7, 0]} castShadow>
        <boxGeometry args={[1.2, 1.2, 0.05]} />
        <meshStandardMaterial color={DARK_GRAY} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Left horizontal stabilizer */}
      <mesh position={[-2.8, 0.1, -0.6]} rotation={[0.05, 0.15, 0]} castShadow>
        <boxGeometry args={[0.8, 0.04, 0.8]} />
        <meshStandardMaterial color={DARK_GRAY} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Right horizontal stabilizer */}
      <mesh position={[-2.8, 0.1, 0.6]} rotation={[-0.05, -0.15, 0]} castShadow>
        <boxGeometry args={[0.8, 0.04, 0.8]} />
        <meshStandardMaterial color={DARK_GRAY} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* === ENGINE EXHAUST === */}
      <mesh position={[-3.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.12, 0.4, 12]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={0.8}
          metalness={0.3}
          roughness={0.5}
        />
      </mesh>

      {/* === HOTSPOTS === */}
      <Hotspot name="pilot" position={[1.2, 0.7, 0]} label="Pilot" />
      <Hotspot name="nose" position={[3.5, 0, 0]} label="Nose" />
      <Hotspot name="wing" position={[-0.3, 0.1, -2.2]} label="Wing" />
    </group>
  );
}
