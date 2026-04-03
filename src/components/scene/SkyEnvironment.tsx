import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment, Clouds, Cloud } from "@react-three/drei";
import * as THREE from "three";

interface CloudData {
  position: THREE.Vector3;
  speed: number;
  scale: number;
}

const CLOUD_COUNT = 12;
const RESPAWN_X = 100;
const DESPAWN_X = -100;

function createCloudData(): CloudData[] {
  return Array.from({ length: CLOUD_COUNT }, () => ({
    position: new THREE.Vector3(
      (Math.random() - 0.3) * 160 - 20,
      Math.random() * 20 - 8,
      Math.random() * 80 - 40
    ),
    speed: 15 + Math.random() * 25,
    scale: 3 + Math.random() * 5,
  }));
}

function MovingClouds() {
  const groupRef = useRef<THREE.Group>(null);
  const cloudData = useRef<CloudData[]>(createCloudData());

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((child, i) => {
      const data = cloudData.current[i];
      if (!data) return;
      data.position.x -= data.speed * delta;

      if (data.position.x < DESPAWN_X) {
        data.position.x = RESPAWN_X + Math.random() * 30;
        data.position.y = Math.random() * 20 - 8;
        data.position.z = Math.random() * 80 - 40;
      }

      child.position.copy(data.position);
    });
  });

  return (
    <Clouds ref={groupRef} limit={200}>
      {cloudData.current.map((cloud, i) => (
        <Cloud
          key={i}
          position={cloud.position.toArray()}
          opacity={0.6}
          speed={0.2}
          bounds={[cloud.scale * 2, cloud.scale * 0.6, cloud.scale * 0.8]}
          volume={cloud.scale}
          segments={20}
          color="#ffffff"
        />
      ))}
    </Clouds>
  );
}

export function SkyEnvironment() {
  return (
    <>
      <Environment
        files="/RenderCrate-HDRI_Aerial_Sky_17_4K.exr"
        background
        backgroundIntensity={1}
        environmentIntensity={0.8}
      />
      <MovingClouds />
    </>
  );
}
