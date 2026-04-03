import { useRef, useState, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "../../stores/useAppStore";
import { Character } from "./Character";
import { GlassWindow } from "./GlassWindow";
import { GlassShards } from "./GlassShards";
import { CAMERA_OVERVIEW } from "../../constants/camera";

interface CameraKeyframe {
  time: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  { time: 0.0, position: [3, 6, -15], lookAt: [0, 3, -5] },
  { time: 0.5, position: [2, 5, -10], lookAt: [0, 4, -5] },
  { time: 0.8, position: [1, 4, -6], lookAt: [0, 3, -5] },
  { time: 1.2, position: [0.5, 3, -2], lookAt: [0, 2, -3] },
  { time: 2.0, position: [-2, 3.5, 2], lookAt: [0, 1.5, 0] },
  { time: 3.0, position: [-1, 4, 6], lookAt: [0, 1, 0] },
  { time: 4.0, position: CAMERA_OVERVIEW.position, lookAt: CAMERA_OVERVIEW.lookAt },
];

const TOTAL_DURATION = 4.5; // extra settle time after last keyframe

function lerpKeyframes(keyframes: CameraKeyframe[], t: number): CameraKeyframe {
  if (t <= keyframes[0].time) return keyframes[0];
  if (t >= keyframes[keyframes.length - 1].time) return keyframes[keyframes.length - 1];

  let i = 0;
  while (i < keyframes.length - 1 && keyframes[i + 1].time <= t) i++;

  const a = keyframes[i];
  const b = keyframes[i + 1];
  const p = (t - a.time) / (b.time - a.time);
  const eased = p * p * (3 - 2 * p); // smoothstep

  const lerp = (from: number, to: number) => from + (to - from) * eased;

  return {
    time: t,
    position: [
      lerp(a.position[0], b.position[0]),
      lerp(a.position[1], b.position[1]),
      lerp(a.position[2], b.position[2]),
    ],
    lookAt: [
      lerp(a.lookAt[0], b.lookAt[0]),
      lerp(a.lookAt[1], b.lookAt[1]),
      lerp(a.lookAt[2], b.lookAt[2]),
    ],
  };
}

export function IntroSequence() {
  const phase = useAppStore((s) => s.phase);
  const setCameraTarget = useAppStore((s) => s.setCameraTarget);
  const setIntroComplete = useAppStore((s) => s.setIntroComplete);
  const elapsed = useRef(0);
  const completed = useRef(false);
  const [glassBroken, setGlassBroken] = useState(false);

  const handleImpact = useCallback(() => {
    setGlassBroken(true);
  }, []);

  useFrame((_, delta) => {
    if (phase !== "intro" || completed.current) return;

    elapsed.current += delta;
    const t = elapsed.current;

    // Camera shake during impact window (t = 0.8 to 1.5)
    const kf = lerpKeyframes(CAMERA_KEYFRAMES, t);
    const shakeWindow = t > 0.8 && t < 1.5;

    if (shakeWindow) {
      const decay = 1 - (t - 0.8) / 0.7;
      const shakeX = Math.sin(t * 40) * 0.15 * decay;
      const shakeY = Math.cos(t * 30) * 0.1 * decay;
      kf.position = [
        kf.position[0] + shakeX,
        kf.position[1] + shakeY,
        kf.position[2],
      ];
    }

    setCameraTarget({ position: kf.position, lookAt: kf.lookAt });

    if (t >= TOTAL_DURATION) {
      completed.current = true;
      setIntroComplete();
    }
  });

  if (phase !== "intro") return null;

  return (
    <group>
      <Character active={phase === "intro"} onImpact={handleImpact} />
      <GlassWindow broken={glassBroken} />
      <GlassShards active={glassBroken} />
    </group>
  );
}
