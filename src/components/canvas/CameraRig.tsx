import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "../../stores/useAppStore";

export function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const currentLookAt = useRef(new THREE.Vector3(0, 2, 0));
  const cameraTarget = useAppStore((s) => s.cameraTarget);
  const phase = useAppStore((s) => s.phase);

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    const targetPos = new THREE.Vector3(...cameraTarget.position);
    const targetLookAt = new THREE.Vector3(...cameraTarget.lookAt);

    // During intro, follow more snappily; otherwise smooth
    const dampBase = phase === "intro" ? 0.00001 : 0.001;
    const lerpFactor = 1 - Math.pow(dampBase, delta);

    cameraRef.current.position.lerp(targetPos, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);
    cameraRef.current.lookAt(currentLookAt.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={50}
      position={[0, 5, 18]}
      near={0.1}
      far={100}
    />
  );
}
