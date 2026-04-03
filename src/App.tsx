import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraRig } from "./components/canvas/CameraRig";
import { Lighting } from "./components/canvas/Lighting";
import { LoadingTracker } from "./components/canvas/LoadingTracker";
import { SkyEnvironment } from "./components/scene/SkyEnvironment";
import { FighterJet } from "./components/scene/FighterJet";
import { Wingmen } from "./components/scene/Wingmen";
import { LoadingScreen } from "./components/overlay/LoadingScreen";
import { HUD } from "./components/overlay/HUD";
import { Logo } from "./components/overlay/Logo";
import { PilotPanel } from "./components/ui-panels/PilotPanel";
import { NosePanel } from "./components/ui-panels/NosePanel";
import { WingPanel } from "./components/ui-panels/WingPanel";
import { useAppStore } from "./stores/useAppStore";
import "./styles/index.css";

const MOBILE_BREAKPOINT = 1024;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

function MobileBlocker() {
  return (
    <div className="mobile-blocker">
      <div className="mobile-blocker-content">
        <svg
          className="mobile-blocker-logo"
          viewBox="0 0 120 60"
          width="120"
          height="60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <text
            x="60"
            y="46"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="'Dancing Script', cursive"
            fontSize="52"
            fontWeight="700"
            fontStyle="italic"
          >
            SH
          </text>
        </svg>
        <h1>Smilewin Haveluck</h1>
        <p>This experience is best viewed on a larger screen.</p>
        <p className="mobile-blocker-hint">Please visit on a desktop or laptop.</p>
      </div>
    </div>
  );
}

export default function App() {
  const closeHotspot = useAppStore((s) => s.closeHotspot);
  const phase = useAppStore((s) => s.phase);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "viewing-hotspot") {
        closeHotspot();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, closeHotspot]);

  if (isMobile) {
    return <MobileBlocker />;
  }

  return (
    <>
      <Logo />
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
        <Wingmen />
      </Canvas>
    </>
  );
}
