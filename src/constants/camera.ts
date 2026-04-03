// Plane sits at origin, facing +X. Camera views from the left side (-Z).

export interface CameraKeyframe {
  t: number; // normalized 0-1
  position: [number, number, number];
  lookAt: [number, number, number];
}

// Intro: cinematic orbit around the jet — jet always visible
export const INTRO_KEYFRAMES: CameraKeyframe[] = [
  // Start: close behind the jet, slightly below — like chasing it
  { t: 0.0, position: [-5, 0.5, -1], lookAt: [0, 0, 0] },
  // Pull up and to the right, revealing the jet's profile
  { t: 0.25, position: [-2, 2, 4], lookAt: [0, 0, 0] },
  // Sweep over the top, looking down
  { t: 0.5, position: [1, 5, 2], lookAt: [0, 0, 0] },
  // Come around to the left side
  { t: 0.75, position: [2, 4, -4], lookAt: [0, 0, 0] },
  // Settle into final position
  { t: 1.0, position: [3, 3, -7], lookAt: [0, 0, 0] },
];

// Final resting camera position
export const SETTLED_OFFSET: [number, number, number] = [3, 3, -7];
export const SETTLED_LOOK_AT: [number, number, number] = [0, 0, 0];

export const INTRO_DURATION = 5.0; // seconds — slightly longer for smoother feel
