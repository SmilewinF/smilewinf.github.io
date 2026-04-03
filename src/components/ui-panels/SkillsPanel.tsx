import { FloatingPanel } from "./FloatingPanel";
import { skillsContent } from "../../constants/content";

export function SkillsPanel() {
  return (
    <FloatingPanel section="skills">
      <h2 className="panel-title">Skills</h2>
      <div className="panel-items">
        {Object.entries(skillsContent).map(([category, skills]) => (
          <div key={category} className="panel-card">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div className="panel-tags">
              {skills.map((skill) => (
                <span key={skill} className="panel-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FloatingPanel>
  );
}
