import { useEffect, useRef } from "react";
import { useAppStore } from "../../stores/useAppStore";
import "../../styles/loading.css";

export function LoadingScreen() {
  const loadingProgress = useAppStore((s) => s.loadingProgress);
  const isLoaded = useAppStore((s) => s.isLoaded);
  const phase = useAppStore((s) => s.phase);
  const startIntro = useAppStore((s) => s.startIntro);
  const started = useRef(false);

  // Use a timeout instead of onTransitionEnd (which fires for child elements too)
  useEffect(() => {
    if (isLoaded && phase === "loading" && !started.current) {
      started.current = true;
      const timer = setTimeout(() => {
        startIntro();
      }, 700); // matches the CSS fade-out duration
      return () => clearTimeout(timer);
    }
  }, [isLoaded, phase, startIntro]);

  return (
    <div className={`loading-screen ${isLoaded ? "loaded" : ""}`}>
      <div className="loading-content">
        <h1 className="loading-title">Portfolio</h1>
        <div className="loading-bar-container">
          <div
            className="loading-bar"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <p className="loading-percentage">{Math.round(loadingProgress)}%</p>
      </div>
    </div>
  );
}
