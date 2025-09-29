import './About.css'

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">About Me</h2>
        <div className="about-content">
          <p className="about-paragraph">
            I'm an experienced Java Developer with over 5 years of hands-on experience designing and implementing
            robust APIs. Currently based in Limerick, Ireland, I specialize in backend development with expertise
            in Spring Boot, microservices architecture, and database optimization.
          </p>
          <p className="about-paragraph">
            My professional journey includes working with leading companies like ViNang Company in Vietnam,
            Workforce Optimizer in Singapore, and various fintech projects. I've successfully delivered solutions
            that improved system performance by up to 30% and reduced deployment times by 40%.
          </p>
          <p className="about-paragraph">
            I hold a Bachelor's degree in Information Technology from Nguyen Tat Thanh University (GPA: 3.03/4)
            and have extensive experience with Java, Spring Framework, SQL databases (MSSQL, MySQL, Oracle),
            Redis caching, and CI/CD automation.
          </p>
          <p className="about-paragraph">
            As a strong team player with a coachable mindset, I'm passionate about creating scalable solutions
            and staying updated with the latest technologies in the Java ecosystem.
          </p>
        </div>
      </div>
    </section>
  )
}