import { FloatingPanel } from "./FloatingPanel";
import { experienceContent } from "../../constants/content";

export function ExperiencePanel() {
  return (
    <FloatingPanel section="experience" position={[0, 2, 2]}>
      <h2 className="panel-title">Experience</h2>
      <div className="panel-items">
        {experienceContent.map((item, i) => (
          <div key={i} className="panel-card">
            <h3>{item.title}</h3>
            <p className="panel-subtitle">
              {item.company} &middot; {item.period}
            </p>
            <p className="panel-text">{item.description}</p>
          </div>
        ))}
      </div>
    </FloatingPanel>
  );
}
