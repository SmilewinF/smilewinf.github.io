import { FloatingPanel } from "./FloatingPanel";

export function WingPanel() {
  return (
    <FloatingPanel hotspot="wing">
      <h2 className="panel-title">Experience</h2>
      <div className="panel-items">
        <div className="panel-card">
          <h3>AI Engineer</h3>
          <p className="panel-subtitle">SyntaX &middot; Sept 2025 - Present</p>
          <p className="panel-text">
            Built the startup's core application from the ground up. Architected
            full-stack features integrating LLM APIs, managing complex state
            transitions and real-time data streaming. Optimized backend latency
            for AI features, reducing token processing time through caching.
          </p>
          <div className="panel-tags">
            <span className="panel-tag">LLMs</span>
            <span className="panel-tag">Full-stack</span>
            <span className="panel-tag">Real-time</span>
          </div>
        </div>
        <div className="panel-card">
          <h3>Scientist B</h3>
          <p className="panel-subtitle">C-DOT &middot; Bangalore, India &middot; Aug 2023 - July 2024</p>
          <p className="panel-text">
            Orchestrated the configuration, optimization, and maintenance of complex
            network infrastructures to ensure seamless connectivity and peak performance.
            Managed projects during deployment, demonstrating strong leadership. Trained
            new employees on technical expertise and project-specific compliance.
          </p>
          <div className="panel-tags">
            <span className="panel-tag">Networking</span>
            <span className="panel-tag">Leadership</span>
            <span className="panel-tag">Deployment</span>
          </div>
        </div>
      </div>
    </FloatingPanel>
  );
}
