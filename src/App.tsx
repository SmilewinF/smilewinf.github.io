import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./components/canvas/CameraRig";
import { Lighting } from "./components/canvas/Lighting";
import { LoadingTracker } from "./components/canvas/LoadingTracker";
import { IntroSequence } from "./components/intro/IntroSequence";
import { Room } from "./components/room/Room";
import { LoadingScreen } from "./components/overlay/LoadingScreen";
import { HUD } from "./components/overlay/HUD";
import { useAppStore } from "./stores/useAppStore";
import "./styles/index.css";

export default function App() {
  const closeSection = useAppStore((s) => s.closeSection);
  const phase = useAppStore((s) => s.phase);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "viewing-section") {
        closeSection();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, closeSection]);

  return (
    <>
      <LoadingScreen />
      <HUD />
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ position: "fixed", inset: 0 }}
      >
        <LoadingTracker />
        <CameraRig />
        <Lighting />
        <color attach="background" args={["#1a1a2e"]} />
        <fog attach="fog" args={["#1a1a2e", 15, 30]} />
        <IntroSequence />
        <Room />
      </Canvas>
    </>
  );
}
