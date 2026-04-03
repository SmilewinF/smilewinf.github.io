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
  // Start: outside the building, looking at the window from a distance
  { time: 0.0, position: [8, 8, -20], lookAt: [0, 4, -5] },
  // Track character approaching — dramatic angle
  { time: 1.0, position: [5, 6, -14], lookAt: [0, 5, -8] },
  // Close to window, character about to hit
  { time: 2.0, position: [2, 5, -8], lookAt: [0, 4, -5] },
  // IMPACT — close up, slight side angle
  { time: 2.5, position: [1.5, 3.5, -4], lookAt: [0, 3, -5] },
  // Post-impact: pull back into the room, watching character tumble
  { time: 3.5, position: [-2, 4, 0], lookAt: [0, 1.5, -2] },
  // Sweeping view of the room
  { time: 5.0, position: [-3, 5, 5], lookAt: [0, 1.5, 0] },
  // Settle to overview
  { time: 6.5, position: CAMERA_OVERVIEW.position, lookAt: CAMERA_OVERVIEW.lookAt },
];

const TOTAL_DURATION = 7.5;

function lerpKeyframes(keyframes: CameraKeyframe[], t: number): CameraKeyframe {
  if (t <= keyframes[0].time) return keyframes[0];
  if (t >= keyframes[keyframes.length - 1].time) return keyframes[keyframes.length - 1];

  let i = 0;
  while (i < keyframes.length - 1 && keyframes[i + 1].time <= t) i++;

  const a = keyframes[i];
  const b = keyframes[i + 1];
  const p = (t - a.time) / (b.time - a.time);
  const eased = p * p * (3 - 2 * p);

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

    const kf = lerpKeyframes(CAMERA_KEYFRAMES, t);

    // Camera shake during impact window (t = 2.3 to 3.2)
    if (t > 2.3 && t < 3.2) {
      const decay = 1 - (t - 2.3) / 0.9;
      const intensity = decay * decay; // quadratic decay for snappier falloff
      const shakeX = Math.sin(t * 45) * 0.2 * intensity;
      const shakeY = Math.cos(t * 35) * 0.15 * intensity;
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
      <Character active onImpact={handleImpact} />
      <GlassWindow broken={glassBroken} />
      <GlassShards active={glassBroken} />
    </group>
  );
}
