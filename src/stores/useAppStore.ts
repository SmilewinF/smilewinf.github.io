import { create } from "zustand";
import { CAMERA_INITIAL, CAMERA_OVERVIEW, CAMERA_TARGETS } from "../constants/camera";

export type Phase = "loading" | "intro" | "exploring" | "viewing-section";
export type Section = "experience" | "projects" | "skills" | "contact";

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
}

interface AppState {
  loadingProgress: number;
  isLoaded: boolean;
  phase: Phase;
  activeSection: Section | null;
  hoveredSection: Section | null;
  cameraTarget: CameraTarget;

  setLoadingProgress: (p: number) => void;
  setLoaded: () => void;
  startIntro: () => void;
  setIntroComplete: () => void;
  openSection: (section: Section) => void;
  closeSection: () => void;
  setHoveredSection: (section: Section | null) => void;
  setCameraTarget: (target: CameraTarget) => void;
}

export const useAppStore = create<AppState>((set) => ({
  loadingProgress: 0,
  isLoaded: false,
  phase: "loading",
  activeSection: null,
  hoveredSection: null,
  cameraTarget: CAMERA_INITIAL,

  setLoadingProgress: (p) => set({ loadingProgress: p }),
  setLoaded: () => set({ isLoaded: true }),
  startIntro: () => set({ phase: "intro", cameraTarget: CAMERA_INITIAL }),
  setIntroComplete: () => set({ phase: "exploring", cameraTarget: CAMERA_OVERVIEW }),
  openSection: (section) =>
    set({
      activeSection: section,
      phase: "viewing-section",
      cameraTarget: CAMERA_TARGETS[section],
    }),
  closeSection: () =>
    set({
      activeSection: null,
      phase: "exploring",
      cameraTarget: CAMERA_OVERVIEW,
    }),
  setHoveredSection: (section) => set({ hoveredSection: section }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
}));
