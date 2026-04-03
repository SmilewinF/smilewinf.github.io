import { FloatingPanel } from "./FloatingPanel";

export function PilotPanel() {
  return (
    <FloatingPanel hotspot="pilot">
      <h2 className="panel-title">The Pilot</h2>
      <div className="panel-items">
        <div className="panel-card">
          <h3>About Me</h3>
          <p className="panel-text">
            Placeholder content about the pilot. This section will contain information
            about who you are, your background, and what drives you.
          </p>
        </div>
        <div className="panel-card">
          <h3>Mission</h3>
          <p className="panel-text">
            Placeholder for your personal mission statement or professional goals.
          </p>
        </div>
      </div>
    </FloatingPanel>
  );
}
