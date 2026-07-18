import { ExternalLink, GitBranch } from 'lucide-react'
import { projectSlots } from '../data/projects'
import type { ProjectStatus } from '../types'

const slotLabel = (index: number) => `project_${String(index + 1).padStart(2, '0')}`

const statusDisplay: Record<ProjectStatus, { className: string; label: string }> = {
  'in-progress': { className: 'progress-indicator', label: 'In Progress' },
  complete: { className: 'complete-indicator', label: 'Complete' },
}

export default function ProjectsApp() {
  return (
    <div className="terminal-app projects-terminal-app">
      <header className="terminal-commandbar">
        <p>
          <span>amechi@portfolio</span>:~/projects$ ls -la
        </p>
        <span className="terminal-status">{projectSlots.length} active projects</span>
      </header>

      <main className="project-terminal-list">
        <div className="terminal-output-line">
          <span>drwxr-xr-x</span> editable project records
        </div>

        {projectSlots.map((project, index) => {
          const title = project.title || slotLabel(index)
          const status = statusDisplay[project.status]
          return (
            <article className="project-terminal-section" key={project.id}>
              <header>
                <p>
                  <span>amechi@portfolio</span>:~/projects/{title}$ cat project.json
                </p>
                <span className={status.className}>{status.label}</span>
              </header>

              <div className="project-terminal-content">
                <h2>{project.title || '[ add project title ]'}</h2>
                <dl>
                  <div>
                    <dt>description</dt>
                    <dd>{project.description || '""'}</dd>
                  </div>
                  <div>
                    <dt>stack</dt>
                    <dd>{project.stack.length ? `[${project.stack.join(', ')}]` : '[]'}</dd>
                  </div>
                  <div>
                    <dt>repository</dt>
                    <dd>
                      {project.repositoryUrl ? (
                        <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                          <GitBranch aria-hidden="true" /> open repository
                        </a>
                      ) : (
                        'null'
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt>demo</dt>
                    <dd>
                      {project.demoUrl ? (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink aria-hidden="true" /> open demo
                        </a>
                      ) : (
                        'null'
                      )}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          )
        })}

        <p className="terminal-cursor">
          amechi@portfolio:~/projects$ <span aria-hidden="true">█</span>
        </p>
      </main>
    </div>
  )
}
