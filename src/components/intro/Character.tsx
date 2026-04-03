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

  // Spider-Man style: swing in from far away, arc through the air, crash through window
  const startPos = new THREE.Vector3(-10, 15, -25); // far outside, high up
  const windowPos = new THREE.Vector3(0, 3.5, -5);  // the window
  const landPos = new THREE.Vector3(0, 0.8, -1);    // landing in the room
  const impactTime = 2.3; // matches camera keyframe timing
  const totalDuration = 3.8;

  useFrame((_, delta) => {
    if (!active || !meshRef.current) return;

    elapsed.current += delta;

    if (elapsed.current >= impactTime && !impactFired.current) {
      impactFired.current = true;
      onImpact();
    }

    let pos: THREE.Vector3;

    if (elapsed.current < impactTime) {
      // Pre-impact: swing toward window in a big arc
      const p = elapsed.current / impactTime;
      const eased = p * p; // accelerating — like falling/swinging
      pos = new THREE.Vector3().lerpVectors(startPos, windowPos, eased);
      // Add a big arc — swing high then dive down
      pos.y += Math.sin(p * Math.PI) * 6;
      // Slight lateral swing
      pos.x += Math.sin(p * Math.PI * 1.5) * 3;
    } else {
      // Post-impact: tumble into room, decelerating
      const p = Math.min((elapsed.current - impactTime) / (totalDuration - impactTime), 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      pos = new THREE.Vector3().lerpVectors(windowPos, landPos, eased);
      // Small bounce
      pos.y += Math.sin(eased * Math.PI) * 1.0;
    }

    meshRef.current.position.copy(pos);

    // Tumbling rotation
    const t = elapsed.current / totalDuration;
    meshRef.current.rotation.x = t * Math.PI * 4;
    meshRef.current.rotation.z = t * Math.PI * 2;
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef} position={[-10, 15, -25]} castShadow>
      <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
      <meshStandardMaterial color={COLORS.accent} />
    </mesh>
  );
}
