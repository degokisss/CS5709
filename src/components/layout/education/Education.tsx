import './Education.css'

export default function Education() {
  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <h2 className="education-title">Education</h2>
        <div className="education-content">
          <div className="education-item">
            <div className="education-period">09/2025 - Current</div>
            <h3 className="education-institution">University of Limerick</h3>
            <p className="education-degree">Master of Science in Software Engineering</p>
            <p className="education-status">Current Student</p>
            <div className="education-details">
              <p>
                Pursuing advanced studies in Software Engineering with focus on modern software development
                methodologies, advanced algorithms, system architecture, and cutting-edge technologies.
                Enhancing expertise in enterprise-level software solutions and research-based approaches.
              </p>
            </div>
            <div className="education-achievements">
              <div className="education-achievement">
                <span className="education-achievement-icon">🎯</span>
                <span>Advanced Software Architecture and Design Patterns</span>
              </div>
              <div className="education-achievement">
                <span className="education-achievement-icon">🔬</span>
                <span>Research in Modern Software Engineering Practices</span>
              </div>
              <div className="education-achievement">
                <span className="education-achievement-icon">🌐</span>
                <span>International Study Experience in Ireland</span>
              </div>
            </div>
          </div>

          <div className="education-item">
            <div className="education-period">Sep 2014 - Dec 2020</div>
            <h3 className="education-institution">Nguyen Tat Thanh University</h3>
            <p className="education-degree">Bachelor of Information Technology</p>
            <p className="education-gpa">GPA: 3.03/4.0</p>
            <div className="education-details">
              <p>
                Completed a comprehensive program in Information Technology with focus on software development,
                database management, and system analysis. Gained strong foundation in programming languages,
                algorithms, and software engineering principles.
              </p>
            </div>
            <div className="education-achievements">
              <div className="education-achievement">
                <span className="education-achievement-icon">🏆</span>
                <span>Received scholarship from the university</span>
              </div>
              <div className="education-achievement">
                <span className="education-achievement-icon">📚</span>
                <span>Specialized in Software Engineering and Database Systems</span>
              </div>
              <div className="education-achievement">
                <span className="education-achievement-icon">💻</span>
                <span>Completed multiple programming projects using Java, C++, and web technologies</span>
              </div>
            </div>
          </div>

          {/* Additional Education/Training */}
          <div className="education-item">
            <div className="education-period">2019 - 2025</div>
            <h3 className="education-institution">Continuous Professional Development</h3>
            <p className="education-degree">Self-directed Learning & Certifications</p>
            <div className="education-details">
              <p>
                Continuously updating skills through online courses, workshops, and hands-on projects.
                Staying current with latest Java frameworks, Spring Boot ecosystem, and modern development practices.
              </p>
            </div>
            <div className="education-achievements">
              <div className="education-achievement">
                <span className="education-achievement-icon">🚀</span>
                <span>Advanced Spring Boot and Microservices Architecture</span>
              </div>
              <div className="education-achievement">
                <span className="education-achievement-icon">☁️</span>
                <span>Cloud Technologies and DevOps Practices</span>
              </div>
              <div className="education-achievement">
                <span className="education-achievement-icon">🔧</span>
                <span>Modern Development Tools and CI/CD Pipelines</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}