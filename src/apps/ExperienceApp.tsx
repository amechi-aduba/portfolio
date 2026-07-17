import { experience } from '../data/resume'

export default function ExperienceApp() {
  return (
    <div className="terminal-app section-terminal-app">
      <header className="terminal-commandbar">
        <p>
          <span>amechi@portfolio</span>:~/career$ cat experience.log
        </p>
        <span className="terminal-status">{experience.length} records</span>
      </header>

      <main className="terminal-section-content">
        <p className="terminal-comment">// professional history, newest first</p>
        <div className="terminal-stack terminal-stack--large">
          {experience.map((item, index) => (
            <article className="resume-entry standalone-resume-entry" key={`${item.company}-${item.role}`}>
              <p className="record-index">[{String(index + 1).padStart(2, '0')}]</p>
              <div className="resume-entry__heading">
                <h2>
                  {item.company} <span>— {item.role}</span>
                </h2>
                <time>{item.date}</time>
              </div>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="terminal-cursor">
          amechi@portfolio:~/career$ <span aria-hidden="true">█</span>
        </p>
      </main>
    </div>
  )
}
