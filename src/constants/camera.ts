import type { CameraTarget } from "../stores/useAppStore";

export const CAMERA_INITIAL: CameraTarget = {
  position: [0, 5, 18],
  lookAt: [0, 2, 0],
};

export const CAMERA_OVERVIEW: CameraTarget = {
  position: [0, 5, 10],
  lookAt: [0, 1, 0],
};

export const CAMERA_TARGETS: Record<string, CameraTarget> = {
  experience: { position: [-3, 2.5, 3], lookAt: [-4, 1.5, 0] },
  projects: { position: [3, 2.5, 3], lookAt: [4, 2, 0] },
  skills: { position: [0, 3.5, 2], lookAt: [0, 3, -2] },
  contact: { position: [3, 1.5, 4], lookAt: [4, 0.8, 1] },
};
