import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "../../constants/colors";

interface CharacterProps {
  active: boolean;
  onImpact: () => void;
}

export function Character({ active, onImpact }: CharacterProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const elapsed = useRef(0);
  const impactFired = useRef(false);

  // Parabolic arc parameters
  const startPos = new THREE.Vector3(0, 8, -12);
  const endPos = new THREE.Vector3(0, 0.5, -2);
  const impactPos = new THREE.Vector3(0, 3, -5); // window position
  const totalDuration = 2.0;
  const impactTime = 0.8;

  useFrame((_, delta) => {
    if (!active || !meshRef.current) return;

    elapsed.current += delta;
    const t = Math.min(elapsed.current / totalDuration, 1);

    if (elapsed.current >= impactTime && !impactFired.current) {
      impactFired.current = true;
      onImpact();
    }

    // Parabolic arc
    let pos: THREE.Vector3;
    if (elapsed.current < impactTime) {
      // Pre-impact: fly toward window
      const p = elapsed.current / impactTime;
      pos = new THREE.Vector3().lerpVectors(startPos, impactPos, p);
      pos.y += Math.sin(p * Math.PI) * 2; // arc upward
    } else {
      // Post-impact: tumble into room
      const p = (elapsed.current - impactTime) / (totalDuration - impactTime);
      const eased = 1 - Math.pow(1 - Math.min(p, 1), 2);
      pos = new THREE.Vector3().lerpVectors(impactPos, endPos, eased);
      // Bounce effect
      pos.y += Math.sin(eased * Math.PI) * 1.5;
    }

    meshRef.current.position.copy(pos);
    // Tumble rotation
    meshRef.current.rotation.x = t * Math.PI * 3;
    meshRef.current.rotation.z = t * Math.PI * 1.5;
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef} position={[0, 8, -12]} castShadow>
      <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
      <meshStandardMaterial color={COLORS.accent} />
    </mesh>
  );
}
