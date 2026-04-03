import { FloatingPanel } from "./FloatingPanel";
import { contactContent } from "../../constants/content";

export function ContactPanel() {
  return (
    <FloatingPanel section="contact">
      <h2 className="panel-title">Contact</h2>
      <p className="panel-text">{contactContent.message}</p>
      <div className="panel-items">
        <div className="panel-card">
          <p className="panel-text">
            <strong>Email:</strong> {contactContent.email}
          </p>
          <p className="panel-text">
            <strong>GitHub:</strong> {contactContent.github}
          </p>
          <p className="panel-text">
            <strong>LinkedIn:</strong> {contactContent.linkedin}
          </p>
        </div>
      </div>
    </FloatingPanel>
  );
}
