import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAppStore } from "../../stores/useAppStore";

export function LoadingTracker() {
  const { progress, active, loaded, total } = useProgress();
  const setLoadingProgress = useAppStore((s) => s.setLoadingProgress);
  const setLoaded = useAppStore((s) => s.setLoaded);
  const isLoaded = useAppStore((s) => s.isLoaded);

  const displayProgress = useRef(0);
  const realProgress = useRef(0);
  const settled = useRef(false);
  const frameCount = useRef(0);

  useEffect(() => {
    realProgress.current = progress;
  }, [progress]);

  useFrame((_, delta) => {
    if (isLoaded || settled.current) return;

    frameCount.current++;

    // Wait a few frames for the loader to initialize
    // If after 60 frames (~1s) nothing has loaded, assume no assets and proceed
    const hasAssets = active || total > 0;
    if (!hasAssets && frameCount.current < 60) {
      // Show a slow creep so user sees activity
      displayProgress.current = Math.min(displayProgress.current + delta * 15, 30);
      setLoadingProgress(displayProgress.current);
      return;
    }

    // No assets to load — fill up and finish
    if (!hasAssets && frameCount.current >= 60) {
      displayProgress.current += delta * 80;
      displayProgress.current = Math.min(displayProgress.current, 100);
      setLoadingProgress(displayProgress.current);
      if (displayProgress.current >= 100) {
        settled.current = true;
        setLoaded();
      }
      return;
    }

    // Real assets: smoothly animate toward actual progress
    const target = realProgress.current;
    const diff = target - displayProgress.current;
    displayProgress.current += diff * Math.min(delta * 4, 0.15);

    // Snap when close enough
    if (diff > 0 && diff < 0.5) {
      displayProgress.current = target;
    }

    setLoadingProgress(displayProgress.current);

    if (displayProgress.current >= 99.9 && realProgress.current >= 100) {
      settled.current = true;
      setLoadingProgress(100);
      setLoaded();
    }
  });

  return null;
}
