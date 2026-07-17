import { FileSearch } from 'lucide-react'
import { education } from '../data/resume'

interface EducationAppProps {
  onOpenDiploma: () => void
}

export default function EducationApp({ onOpenDiploma }: EducationAppProps) {
  return (
    <div className="terminal-app section-terminal-app">
      <header className="terminal-commandbar">
        <p>
          <span>amechi@portfolio</span>:~/education$ cat education.txt
        </p>
        <span className="terminal-status">VERIFIED</span>
      </header>

      <main className="terminal-section-content">
        <p className="terminal-comment">// education and community</p>
        <div className="terminal-stack terminal-stack--large">
          {education.map((item) => (
            <article className="resume-entry education-record" key={item.school}>
              <div className="resume-entry__heading">
                <h2>{item.school}</h2>
                <time>{item.date}</time>
              </div>
              <p>{item.degree}</p>
              {'detail' in item ? <p className="terminal-muted">{item.detail}</p> : null}
              {'diplomaUrl' in item ? (
                <div className="education-record__actions">
                  <button type="button" onClick={onOpenDiploma}>
                    <FileSearch aria-hidden="true" />
                    View diploma
                  </button>
                </div>
              ) : null}
            </article>
          ))}
        </div>

        <p className="terminal-cursor">
          amechi@portfolio:~/education$ <span aria-hidden="true">█</span>
        </p>
      </main>
    </div>
  )
}
