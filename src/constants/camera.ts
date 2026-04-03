// Plane sits at origin, facing +X. Camera views from the left side (-Z).

export interface CameraKeyframe {
  t: number; // normalized 0-1
  position: [number, number, number];
  lookAt: [number, number, number];
}

// Intro: cinematic orbit around the jet
export const INTRO_KEYFRAMES: CameraKeyframe[] = [
  { t: 0.0, position: [-12, -1, 0], lookAt: [0, 0, 0] },   // Behind and below
  { t: 0.2, position: [-8, 2, 8], lookAt: [0, 0, 0] },      // Sweep to right side
  { t: 0.45, position: [2, 6, 6], lookAt: [0, 0, 0] },      // Over the top-right
  { t: 0.7, position: [4, 4, -4], lookAt: [0, 0, 0] },      // Coming around to left
  { t: 1.0, position: [3, 3, -7], lookAt: [0, 0, 0] },      // Settle: left side, above
];

// Final resting camera position
export const SETTLED_OFFSET: [number, number, number] = [3, 3, -7];
export const SETTLED_LOOK_AT: [number, number, number] = [0, 0, 0];

export const INTRO_DURATION = 4.0; // seconds
