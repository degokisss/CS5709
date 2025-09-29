import { projects } from '../../../data/projects'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">Professional Knowledge & Projects</h2>
        <div className="projects-intro">
          <p className="projects-description">
            A comprehensive showcase of my professional expertise and technical capabilities developed
            through 5+ years of hands-on experience in Java development and enterprise software solutions.
            Currently expanding my knowledge through Master's studies in Software Engineering at University of Limerick.
          </p>
          <div className="knowledge-areas">
            <div className="knowledge-category">
              <h3 className="knowledge-title">Core Technologies</h3>
              <div className="knowledge-tags">
                <span className="knowledge-tag">Java</span>
                <span className="knowledge-tag">Spring Boot</span>
                <span className="knowledge-tag">Spring Framework</span>
                <span className="knowledge-tag">Microservices</span>
                <span className="knowledge-tag">RESTful APIs</span>
              </div>
            </div>
            <div className="knowledge-category">
              <h3 className="knowledge-title">Frontend & Web</h3>
              <div className="knowledge-tags">
                <span className="knowledge-tag">React</span>
                <span className="knowledge-tag">TypeScript</span>
                <span className="knowledge-tag">Angular</span>
                <span className="knowledge-tag">HTML/CSS</span>
                <span className="knowledge-tag">Bootstrap</span>
              </div>
            </div>
            <div className="knowledge-category">
              <h3 className="knowledge-title">Database & Tools</h3>
              <div className="knowledge-tags">
                <span className="knowledge-tag">SQL</span>
                <span className="knowledge-tag">Redis</span>
                <span className="knowledge-tag">GitLab CI/CD</span>
                <span className="knowledge-tag">Apache POI</span>
                <span className="knowledge-tag">SOAP</span>
              </div>
            </div>
          </div>
        </div>
        <h3 className="projects-subtitle">Featured Projects</h3>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <img
                src={project.image}
                alt={project.title}
                className="project-image"
              />
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-links">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    className="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    className="project-link github"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}