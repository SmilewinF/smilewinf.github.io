import { FloatingPanel } from "./FloatingPanel";

export function WingPanel() {
  return (
    <FloatingPanel hotspot="wing">
      <h2 className="panel-title">The Wing</h2>
      <div className="panel-items">
        <div className="panel-card">
          <h3>Skills &amp; Experience</h3>
          <p className="panel-text">
            Placeholder content about your skills and experience. The wings provide lift
            and range — they represent your capabilities.
          </p>
        </div>
        <div className="panel-card">
          <h3>Technologies</h3>
          <div className="panel-tags">
            <span className="panel-tag">Placeholder</span>
            <span className="panel-tag">Skills</span>
            <span className="panel-tag">Go Here</span>
          </div>
        </div>
      </div>
    </FloatingPanel>
  );
}
