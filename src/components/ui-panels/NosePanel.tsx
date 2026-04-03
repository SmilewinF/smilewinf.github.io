import { FloatingPanel } from "./FloatingPanel";

export function NosePanel() {
  return (
    <FloatingPanel hotspot="nose">
      <h2 className="panel-title">Projects</h2>
      <div className="panel-items">
        <div className="panel-card">
          <h3>Hybrid CNN-SVM Model for Bone Fracture Detection</h3>
          <p className="panel-text">
            Implemented and tested a robust, hybrid CNN-SVM Deep Learning model
            for bone fracture detection. Performed a comparative study to benchmark
            performance against existing architectures.
          </p>
          <div className="panel-tags">
            <span className="panel-tag">Deep Learning</span>
            <span className="panel-tag">CNN</span>
            <span className="panel-tag">SVM</span>
            <span className="panel-tag">Medical AI</span>
          </div>
        </div>
        <div className="panel-card">
          <h3>Real Time License Plate Detection</h3>
          <p className="panel-text">
            Developed a machine learning model to detect and extract license plates
            in real-time. Led the project team, ensuring effective collaboration and
            task distribution. Evaluated various Deep Learning models to select the
            architecture with the highest accuracy.
          </p>
          <div className="panel-tags">
            <span className="panel-tag">Computer Vision</span>
            <span className="panel-tag">Real-time ML</span>
            <span className="panel-tag">Team Lead</span>
          </div>
        </div>
      </div>
    </FloatingPanel>
  );
}
