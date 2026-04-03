import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { COLORS } from "../../constants/colors";

interface Shard {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: THREE.Euler;
  rotationSpeed: THREE.Vector3;
  scale: number;
}

interface GlassShardProps {
  active: boolean;
}

export function GlassShards({ active }: GlassShardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const elapsed = useRef(0);

  // Shards spawn at the window position (0, 2.0, -5), fly inward (+z) and scatter
  const shards = useMemo<Shard[]>(() => {
    return Array.from({ length: 25 }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 1.0,
        2.0 + (Math.random() - 0.5) * 1.2,
        -4.9
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 4,
        Math.random() * 3 - 0.5,
        Math.random() * 6 + 2 // fly into the room
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12
      ),
      scale: 0.04 + Math.random() * 0.12,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!active || !groupRef.current) return;
    elapsed.current += delta;

    // Fade out and stop after 4 seconds
    if (elapsed.current > 4) return;

    groupRef.current.children.forEach((child, i) => {
      const shard = shards[i];
      shard.position.x += shard.velocity.x * delta;
      shard.position.y += shard.velocity.y * delta;
      shard.position.z += shard.velocity.z * delta;
      shard.velocity.y -= 9.8 * delta;

      // Slow down horizontal movement (air resistance)
      shard.velocity.x *= 0.995;
      shard.velocity.z *= 0.995;

      shard.rotation.x += shard.rotationSpeed.x * delta;
      shard.rotation.y += shard.rotationSpeed.y * delta;
      shard.rotation.z += shard.rotationSpeed.z * delta;

      child.position.copy(shard.position);
      child.rotation.copy(shard.rotation);

      // Fade out opacity
      const mat = (child as THREE.Mesh).material as THREE.MeshPhysicalMaterial;
      if (mat && elapsed.current > 2) {
        mat.opacity = Math.max(0, 0.6 - (elapsed.current - 2) * 0.3);
      }
    });
  });

  if (!active) return null;

  return (
    <group ref={groupRef}>
      {shards.map((shard, i) => (
        <mesh key={i} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
          <planeGeometry args={[1, 1.2]} />
          <meshPhysicalMaterial
            color={COLORS.glass}
            transparent
            opacity={0.6}
            roughness={0.05}
            metalness={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
