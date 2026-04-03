import { useRef, useEffect } from "react";
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

const PARALLAX_STRENGTH = 0.4;

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
  const eased = p * p * (3 - 2 * p);

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

  // Mouse parallax — normalized to -1..1, smoothed
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const phase = useAppStore((s) => s.phase);
  const setIntroComplete = useAppStore((s) => s.setIntroComplete);

  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    // Smooth the mouse values (lerp toward actual mouse position)
    smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * delta * 3;
    smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * delta * 3;

    const mx = smoothMouse.current.x * PARALLAX_STRENGTH;
    const my = -smoothMouse.current.y * PARALLAX_STRENGTH; // invert Y for natural feel

    if (phase === "intro") {
      elapsed.current += delta;
      const t = Math.min(elapsed.current / INTRO_DURATION, 1);

      const kf = lerpKeyframes(t);
      // Apply subtle parallax during intro too (ramps up as intro progresses)
      const introParallax = t * 0.5;
      cameraRef.current.position.set(
        kf.position[0] + mx * introParallax,
        kf.position[1] + my * introParallax,
        kf.position[2]
      );
      currentLookAt.current.set(...kf.lookAt);
      cameraRef.current.lookAt(currentLookAt.current);

      if (t >= 1 && !introCompleted.current) {
        introCompleted.current = true;
        setIntroComplete();
      }
    } else if (phase === "exploring" || phase === "viewing-hotspot") {
      const time = elapsed.current + (phase === "exploring" ? delta : 0);
      if (phase === "exploring") elapsed.current = time;

      const swayX = Math.sin(time * 0.15) * 0.15;
      const swayY = Math.sin(time * 0.1) * 0.1;

      const targetPos = new THREE.Vector3(
        SETTLED_OFFSET[0] + swayX + mx,
        SETTLED_OFFSET[1] + swayY + my,
        SETTLED_OFFSET[2]
      );
      const targetLookAt = new THREE.Vector3(
        SETTLED_LOOK_AT[0] + mx * 0.3,
        SETTLED_LOOK_AT[1] + my * 0.3,
        SETTLED_LOOK_AT[2]
      );

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
