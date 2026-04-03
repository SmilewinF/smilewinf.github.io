import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./components/canvas/CameraRig";
import { Lighting } from "./components/canvas/Lighting";
import { LoadingTracker } from "./components/canvas/LoadingTracker";
import { SkyEnvironment } from "./components/scene/SkyEnvironment";
import { FighterJet } from "./components/scene/FighterJet";
import { LoadingScreen } from "./components/overlay/LoadingScreen";
import { HUD } from "./components/overlay/HUD";
import { PilotPanel } from "./components/ui-panels/PilotPanel";
import { NosePanel } from "./components/ui-panels/NosePanel";
import { WingPanel } from "./components/ui-panels/WingPanel";
import { useAppStore } from "./stores/useAppStore";
import "./styles/index.css";

export default function App() {
  const closeHotspot = useAppStore((s) => s.closeHotspot);
  const phase = useAppStore((s) => s.phase);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "viewing-hotspot") {
        closeHotspot();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, closeHotspot]);

  return (
    <>
      <LoadingScreen />
      <HUD />
      <PilotPanel />
      <NosePanel />
      <WingPanel />
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ position: "fixed", inset: 0 }}
      >
        <LoadingTracker />
        <CameraRig />
        <Lighting />
        <SkyEnvironment />
        <FighterJet />
      </Canvas>
    </>
  );
}
