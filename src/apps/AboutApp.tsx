import { contact, professionalSummary, skills } from '../data/resume'

export default function AboutApp() {
  return (
    <div className="terminal-app section-terminal-app">
      <header className="terminal-commandbar">
        <p>
          <span>amechi@portfolio</span>:~$ whoami
        </p>
        <span className="terminal-status">zsh</span>
      </header>

      <main className="terminal-section-content">
        <div className="terminal-profile">
          <div className="terminal-monogram" aria-hidden="true">
            AA
          </div>
          <div>
            <p className="terminal-comment">// system profile</p>
            <h1>{contact.name}</h1>
            <p>Software engineer · AI systems · technical problem solver</p>
            <p>{contact.location}</p>
          </div>
        </div>

        <section>
          <h2>
            <span>~</span>/summary $ cat profile.txt
          </h2>
          <p>{professionalSummary}</p>
        </section>

        <section>
          <h2>
            <span>~</span>/skills $ ls
          </h2>
          <dl className="skill-definition-list">
            {skills.map((skill) => (
              <div key={skill.label}>
                <dt>{skill.label}</dt>
                <dd>{skill.values}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="terminal-cursor">
          amechi@portfolio:~$ <span aria-hidden="true">█</span>
        </p>
      </main>
    </div>
  )
}
