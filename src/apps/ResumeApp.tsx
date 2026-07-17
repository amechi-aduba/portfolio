import { Download, ExternalLink, FileSearch } from 'lucide-react'
import { documents } from '../data/documents'
import {
  activities,
  contact,
  education,
  experience,
  professionalSummary,
  resumeProjects,
  skills,
} from '../data/resume'

function PromptHeading({ path }: { path: string }) {
  return (
    <h2 className="terminal-heading">
      <span aria-hidden="true">~/</span>
      {path}
      <span aria-hidden="true"> $</span>
    </h2>
  )
}

interface ResumeAppProps {
  onOpenPdf: () => void
}

export default function ResumeApp({ onOpenPdf }: ResumeAppProps) {
  return (
    <div className="terminal-app resume-app">
      <header className="terminal-commandbar">
        <p>
          <span>amechi@portfolio</span>:~$ cat Amechi_Aduba_Resume_2026.txt
        </p>
        <div className="terminal-commandbar__actions">
          <button type="button" onClick={onOpenPdf}>
            <FileSearch aria-hidden="true" />
            View PDF
          </button>
          <a href={documents.resume.url} download={documents.resume.filename}>
            <Download aria-hidden="true" />
            Download PDF
          </a>
        </div>
      </header>

      <article className="resume-document">
        <header className="resume-identity">
          <p className="terminal-comment">// software engineer, data scientist, ai engineer</p>
          <h1>{contact.name}</h1>
          <div className="resume-contact-line">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <span>{contact.location}</span>
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub <ExternalLink aria-hidden="true" />
            </a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <ExternalLink aria-hidden="true" />
            </a>
          </div>
        </header>

        <section>
          <PromptHeading path="summary" />
          <p>{professionalSummary}</p>
        </section>

        <section>
          <PromptHeading path="education" />
          <div className="terminal-stack">
            {education.map((item) => (
              <div className="resume-entry" key={item.school}>
                <div className="resume-entry__heading">
                  <h3>{item.school}</h3>
                  <time>{item.date}</time>
                </div>
                <p>{item.degree}</p>
                {'detail' in item ? <p className="terminal-muted">{item.detail}</p> : null}
              </div>
            ))}
          </div>
        </section>

        <section>
          <PromptHeading path="skills" />
          <dl className="skill-definition-list">
            {skills.map((skill) => (
              <div key={skill.label}>
                <dt>{skill.label}</dt>
                <dd>{skill.values}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <PromptHeading path="experience" />
          <div className="terminal-stack terminal-stack--large">
            {experience.map((item) => (
              <div className="resume-entry" key={`${item.company}-${item.role}`}>
                <div className="resume-entry__heading">
                  <h3>
                    {item.company} <span>— {item.role}</span>
                  </h3>
                  <time>{item.date}</time>
                </div>
                <ul>
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <PromptHeading path="projects" />
          <div className="terminal-stack terminal-stack--large">
            {resumeProjects.map((project) => (
              <div className="resume-entry" key={project.name}>
                <div className="resume-entry__heading">
                  <h3>{project.name}</h3>
                  <time>{project.date}</time>
                </div>
                <ul>
                  {project.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <PromptHeading path="activities" />
          <p>{activities}</p>
        </section>

        <p className="terminal-cursor">
          amechi@portfolio:~$ <span aria-hidden="true">█</span>
        </p>
      </article>
    </div>
  )
}
