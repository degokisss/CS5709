import './App.css'
import reactLogo from './assets/react.svg'

function App() {
  return (
    <>
      <header className="header">
          <nav className="nav">
              <div className="logo-container">
                  <img src={reactLogo} alt="React Logo" className="logo react-logo"/>

              </div>
              <ul className="nav-links">
                    <li><a href="#about">About</a></li>
                    <li><a href="#project">Project</a></li>
                    <li><a href="#contact">Contact</a></li>
              </ul>
          </nav>
      </header>
        <main className="main-content">
            <section id="hero" className="hero">
                <h1>Tan Le</h1>
                <p>Student at University of Limerick</p>
            </section>
            <section  className="project-section" id="projects">
            <h2>Projects</h2>
            </section>
            <section  className="contact-section" id="contact">
            <h2>Projects</h2>
            </section>
        </main>
    </>
  )
}

export default App
