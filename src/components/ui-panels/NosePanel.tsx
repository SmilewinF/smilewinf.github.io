import { FloatingPanel } from "./FloatingPanel";

export function NosePanel() {
  return (
    <FloatingPanel hotspot="nose">
      <h2 className="panel-title">The Nose</h2>
      <div className="panel-items">
        <div className="panel-card">
          <h3>Projects</h3>
          <p className="panel-text">
            Placeholder content about your projects. The nose sensors guide the way forward
            — just like your work pushes boundaries.
          </p>
        </div>
        <div className="panel-card">
          <h3>What's Ahead</h3>
          <p className="panel-text">
            Placeholder for upcoming projects or areas of exploration.
          </p>
        </div>
      </div>
    </FloatingPanel>
  );
}
