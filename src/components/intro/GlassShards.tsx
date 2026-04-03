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

  const shards = useMemo<Shard[]>(() => {
    return Array.from({ length: 20 }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 1.5,
        3 + (Math.random() - 0.5) * 1.5,
        -4.9
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 3,
        Math.random() * 2 + 1,
        Math.random() * 4 + 2
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ),
      scale: 0.05 + Math.random() * 0.15,
    }));
  }, []);

  useFrame((_, delta) => {
    if (!active || !groupRef.current) return;
    elapsed.current += delta;

    groupRef.current.children.forEach((child, i) => {
      const shard = shards[i];
      shard.position.x += shard.velocity.x * delta;
      shard.position.y += shard.velocity.y * delta;
      shard.position.z += shard.velocity.z * delta;
      shard.velocity.y -= 9.8 * delta; // gravity

      shard.rotation.x += shard.rotationSpeed.x * delta;
      shard.rotation.y += shard.rotationSpeed.y * delta;
      shard.rotation.z += shard.rotationSpeed.z * delta;

      child.position.copy(shard.position);
      child.rotation.copy(shard.rotation);
    });
  });

  if (!active) return null;

  return (
    <group ref={groupRef}>
      {shards.map((shard, i) => (
        <mesh key={i} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
          <planeGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            color={COLORS.glass}
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
