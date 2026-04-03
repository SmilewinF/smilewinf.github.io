import { FloatingPanel } from "./FloatingPanel";

export function PilotPanel() {
  return (
    <FloatingPanel hotspot="pilot">
      <h2 className="panel-title">About Me</h2>
      <div className="panel-items">
        <div className="panel-card">
          <p className="panel-text">
            AI enthusiast and MSc in Artificial Intelligence graduate from Queen Mary
            University of London. Proficient in Python, TensorFlow, and Scikit-learn,
            with hands-on experience in NLP and predictive analytics.
          </p>
          <p className="panel-text" style={{ marginTop: 8 }}>
            A driven problem-solver and collaborative team player dedicated to creating
            impactful AI solutions for dynamic, real-world challenges.
          </p>
        </div>
        <div className="panel-card">
          <h3>Education</h3>
          <p className="panel-subtitle">
            Queen Mary University of London &middot; Sept 2024 - Sept 2025
          </p>
          <p className="panel-text">MSc Artificial Intelligence &middot; Distinction</p>
        </div>
        <div className="panel-card">
          <p className="panel-subtitle">
            National Institute of Technology Puducherry &middot; Aug 2019 - Apr 2023
          </p>
          <p className="panel-text">BTech Computer Science &middot; 7.52 GPA</p>
        </div>
        <div className="panel-card">
          <h3>Skills</h3>
          <div className="panel-tags">
            <span className="panel-tag">Python</span>
            <span className="panel-tag">TensorFlow</span>
            <span className="panel-tag">Pandas</span>
            <span className="panel-tag">NumPy</span>
            <span className="panel-tag">Scikit-learn</span>
          </div>
        </div>
        <div className="panel-card">
          <h3>Contact</h3>
          <p className="panel-text">smilewinhaveluck@gmail.com</p>
          <p className="panel-text">London, UK</p>
        </div>
      </div>
    </FloatingPanel>
  );
}
