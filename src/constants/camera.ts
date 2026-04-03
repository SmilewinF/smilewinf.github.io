import type { CameraTarget } from "../stores/useAppStore";

export const CAMERA_INITIAL: CameraTarget = {
  position: [8, 8, -20],
  lookAt: [0, 2, -5],
};

export const CAMERA_OVERVIEW: CameraTarget = {
  position: [0, 4, 8],
  lookAt: [0, 1.5, -1],
};

// Camera positions when viewing each section — zoomed in toward the object
export const CAMERA_TARGETS: Record<string, CameraTarget> = {
  experience: { position: [-2.5, 1.8, 1.5], lookAt: [-3.5, 1.0, -2] },
  projects: { position: [2.5, 1.8, -1.5], lookAt: [4, 1.0, -4] },
  skills: { position: [-3.5, 1.8, -0.5], lookAt: [-5.8, 1.5, -2] },
  contact: { position: [2.5, 1.5, 3], lookAt: [4, 1.0, 1] },
};
