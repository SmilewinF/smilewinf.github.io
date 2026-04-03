import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore } from "../../stores/useAppStore";
import {
  INTRO_KEYFRAMES,
  INTRO_DURATION,
  SETTLED_OFFSET,
  SETTLED_LOOK_AT,
} from "../../constants/camera";

function lerpKeyframes(t: number) {
  const kfs = INTRO_KEYFRAMES;
  if (t <= kfs[0].t) return { position: kfs[0].position, lookAt: kfs[0].lookAt };
  if (t >= kfs[kfs.length - 1].t)
    return { position: kfs[kfs.length - 1].position, lookAt: kfs[kfs.length - 1].lookAt };

  let i = 0;
  while (i < kfs.length - 1 && kfs[i + 1].t <= t) i++;

  const a = kfs[i];
  const b = kfs[i + 1];
  const p = (t - a.t) / (b.t - a.t);
  const eased = p * p * (3 - 2 * p); // smoothstep

  const lerp = (from: number, to: number) => from + (to - from) * eased;

  return {
    position: [
      lerp(a.position[0], b.position[0]),
      lerp(a.position[1], b.position[1]),
      lerp(a.position[2], b.position[2]),
    ] as [number, number, number],
    lookAt: [
      lerp(a.lookAt[0], b.lookAt[0]),
      lerp(a.lookAt[1], b.lookAt[1]),
      lerp(a.lookAt[2], b.lookAt[2]),
    ] as [number, number, number],
  };
}

export function CameraRig() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const elapsed = useRef(0);
  const introCompleted = useRef(false);

  const phase = useAppStore((s) => s.phase);
  const setIntroComplete = useAppStore((s) => s.setIntroComplete);

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    if (phase === "intro") {
      elapsed.current += delta;
      const t = Math.min(elapsed.current / INTRO_DURATION, 1);

      const kf = lerpKeyframes(t);
      cameraRef.current.position.set(...kf.position);
      currentLookAt.current.set(...kf.lookAt);
      cameraRef.current.lookAt(currentLookAt.current);

      if (t >= 1 && !introCompleted.current) {
        introCompleted.current = true;
        setIntroComplete();
      }
    } else if (phase === "exploring" || phase === "viewing-hotspot") {
      // Settled position with gentle idle sway
      const time = elapsed.current + (phase === "exploring" ? delta : 0);
      if (phase === "exploring") elapsed.current = time;

      const swayX = Math.sin(time * 0.15) * 0.15;
      const swayY = Math.sin(time * 0.1) * 0.1;

      const targetPos = new THREE.Vector3(
        SETTLED_OFFSET[0] + swayX,
        SETTLED_OFFSET[1] + swayY,
        SETTLED_OFFSET[2]
      );
      const targetLookAt = new THREE.Vector3(...SETTLED_LOOK_AT);

      // Smooth lerp to settled position
      const lerpFactor = 1 - Math.pow(0.001, delta);
      cameraRef.current.position.lerp(targetPos, lerpFactor);
      currentLookAt.current.lerp(targetLookAt, lerpFactor);
      cameraRef.current.lookAt(currentLookAt.current);
    }
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={50}
      position={[-5, 0.5, -1]}
      near={0.1}
      far={500}
    />
  );
}
