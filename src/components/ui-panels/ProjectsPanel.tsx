import { FloatingPanel } from "./FloatingPanel";
import { projectsContent } from "../../constants/content";

export function ProjectsPanel() {
  return (
    <FloatingPanel section="projects">
      <h2 className="panel-title">Projects</h2>
      <div className="panel-items">
        {projectsContent.map((item, i) => (
          <div key={i} className="panel-card">
            <h3>{item.title}</h3>
            <p className="panel-text">{item.description}</p>
            <div className="panel-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="panel-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FloatingPanel>
  );
}
