import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "../../stores/useAppStore";

export function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const currentLookAt = useRef(new THREE.Vector3(0, 3, -5));
  const cameraTarget = useAppStore((s) => s.cameraTarget);
  const phase = useAppStore((s) => s.phase);

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    const targetPos = new THREE.Vector3(...cameraTarget.position);
    const targetLookAt = new THREE.Vector3(...cameraTarget.lookAt);

    if (phase === "intro") {
      // During intro, directly follow the keyframe positions (IntroSequence drives these)
      cameraRef.current.position.copy(targetPos);
      currentLookAt.current.copy(targetLookAt);
    } else {
      // Smooth exponential decay for exploration/section transitions
      const lerpFactor = 1 - Math.pow(0.001, delta);
      cameraRef.current.position.lerp(targetPos, lerpFactor);
      currentLookAt.current.lerp(targetLookAt, lerpFactor);
    }

    cameraRef.current.lookAt(currentLookAt.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={50}
      position={[3, 6, -15]}
      near={0.1}
      far={100}
    />
  );
}
