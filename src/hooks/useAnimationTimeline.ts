import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export interface Keyframe {
  time: number;
  position: [number, number, number];
  lookAt?: [number, number, number];
}

export function useAnimationTimeline(
  keyframes: Keyframe[],
  active: boolean,
  onComplete?: () => void
) {
  const elapsed = useRef(0);
  const completed = useRef(false);

  useFrame((_, delta) => {
    if (!active || completed.current) return;

    elapsed.current += delta;
    const t = elapsed.current;
    const last = keyframes[keyframes.length - 1];

    if (t >= last.time) {
      completed.current = true;
      onComplete?.();
      return;
    }
  });

  const getInterpolated = (): Keyframe => {
    const t = elapsed.current;

    if (keyframes.length === 0) {
      return { time: 0, position: [0, 0, 0], lookAt: [0, 0, 0] };
    }

    if (t <= keyframes[0].time) return keyframes[0];
    if (t >= keyframes[keyframes.length - 1].time) return keyframes[keyframes.length - 1];

    let i = 0;
    while (i < keyframes.length - 1 && keyframes[i + 1].time <= t) i++;

    const a = keyframes[i];
    const b = keyframes[i + 1];
    const progress = (t - a.time) / (b.time - a.time);

    // Smooth step easing
    const eased = progress * progress * (3 - 2 * progress);

    const lerp = (from: number, to: number) => from + (to - from) * eased;

    return {
      time: t,
      position: [
        lerp(a.position[0], b.position[0]),
        lerp(a.position[1], b.position[1]),
        lerp(a.position[2], b.position[2]),
      ],
      lookAt: a.lookAt && b.lookAt
        ? [
            lerp(a.lookAt[0], b.lookAt[0]),
            lerp(a.lookAt[1], b.lookAt[1]),
            lerp(a.lookAt[2], b.lookAt[2]),
          ]
        : undefined,
    };
  };

  return { elapsed: elapsed.current, getInterpolated, completed: completed.current };
}
