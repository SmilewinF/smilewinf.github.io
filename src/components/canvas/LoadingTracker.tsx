import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "../../stores/useAppStore";

export function LoadingTracker() {
  const { progress, active } = useProgress();
  const setLoadingProgress = useAppStore((s) => s.setLoadingProgress);
  const setLoaded = useAppStore((s) => s.setLoaded);
  const isLoaded = useAppStore((s) => s.isLoaded);
  const fakeProgress = useRef(0);
  const hasRealAssets = useRef(false);

  // Track if drei's loader ever became active (meaning real assets exist)
  useEffect(() => {
    if (active) hasRealAssets.current = true;
  }, [active]);

  // Handle real asset loading
  useEffect(() => {
    if (hasRealAssets.current) {
      setLoadingProgress(progress);
      if (progress >= 100) {
        const timer = setTimeout(() => setLoaded(), 300);
        return () => clearTimeout(timer);
      }
    }
  }, [progress, setLoadingProgress, setLoaded]);

  // Simulate loading when there are no real assets to load
  useFrame((_, delta) => {
    if (hasRealAssets.current || isLoaded) return;

    fakeProgress.current += delta * 80; // fill up over ~1.2 seconds
    const clamped = Math.min(fakeProgress.current, 100);
    setLoadingProgress(clamped);

    if (clamped >= 100) {
      setLoaded();
    }
  });

  return null;
}
