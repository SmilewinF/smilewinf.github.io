import { create } from "zustand";

export type Phase = "loading" | "intro" | "exploring" | "viewing-hotspot";
export type Hotspot = "pilot" | "nose" | "wing";

interface AppState {
  loadingProgress: number;
  isLoaded: boolean;
  phase: Phase;
  activeHotspot: Hotspot | null;
  hoveredHotspot: Hotspot | null;

  setLoadingProgress: (p: number) => void;
  setLoaded: () => void;
  startIntro: () => void;
  setIntroComplete: () => void;
  openHotspot: (h: Hotspot) => void;
  closeHotspot: () => void;
  setHoveredHotspot: (h: Hotspot | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  loadingProgress: 0,
  isLoaded: false,
  phase: "loading",
  activeHotspot: null,
  hoveredHotspot: null,

  setLoadingProgress: (p) => set({ loadingProgress: p }),
  setLoaded: () => set({ isLoaded: true }),
  startIntro: () => set({ phase: "intro" }),
  setIntroComplete: () => set({ phase: "exploring" }),
  openHotspot: (h) => set({ activeHotspot: h, phase: "viewing-hotspot" }),
  closeHotspot: () => set({ activeHotspot: null, phase: "exploring" }),
  setHoveredHotspot: (h) => set({ hoveredHotspot: h }),
}));
