import { useAppStore } from "../../stores/useAppStore";
import "../../styles/loading.css";

export function LoadingScreen() {
  const loadingProgress = useAppStore((s) => s.loadingProgress);
  const isLoaded = useAppStore((s) => s.isLoaded);
  const phase = useAppStore((s) => s.phase);
  const startIntro = useAppStore((s) => s.startIntro);

  const handleTransitionEnd = () => {
    if (isLoaded && phase === "loading") {
      startIntro();
    }
  };

  return (
    <div
      className={`loading-screen ${isLoaded ? "loaded" : ""}`}
      onTransitionEnd={handleTransitionEnd}
    >
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
