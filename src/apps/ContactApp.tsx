import { AtSign, Briefcase, ExternalLink, GitBranch, MapPin, Phone } from 'lucide-react'
import { contact } from '../data/resume'

const contactMethods = [
  {
    label: 'email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    command: `open mailto:${contact.email}`,
    icon: AtSign,
    external: false,
  },
  {
    label: 'phone',
    value: contact.phone,
    href: contact.phoneHref,
    command: `open ${contact.phoneHref}`,
    icon: Phone,
    external: false,
  },
  {
    label: 'linkedin',
    value: 'linkedin.com/in/amechi-aduba',
    href: contact.linkedin,
    command: 'open linkedin',
    icon: Briefcase,
    external: true,
  },
  {
    label: 'github',
    value: 'github.com/amechi-aduba',
    href: contact.github,
    command: 'open github',
    icon: GitBranch,
    external: true,
  },
] as const

export default function ContactApp() {
  return (
    <div className="terminal-app contact-app">
      <header className="terminal-commandbar">
        <p>
          <span>amechi@portfolio</span>:~$ cat contact.txt
        </p>
        <span className="terminal-status">ONLINE</span>
      </header>

      <main className="contact-terminal-content">
        <p className="terminal-comment">// direct lines</p>
        <h1>Ways to reach me</h1>
        <p className="contact-terminal-intro">
          I’m available for software engineering, AI, and technical support opportunities.
          Choose any command below.
        </p>

        <div className="contact-methods">
          {contactMethods.map((method) => {
            const Icon = method.icon
            return (
              <a
                href={method.href}
                key={method.label}
                target={method.external ? '_blank' : undefined}
                rel={method.external ? 'noopener noreferrer' : undefined}
              >
                <Icon aria-hidden="true" />
                <span className="contact-method__command">
                  <strong>$ {method.command}</strong>
                  <span>{method.value}</span>
                </span>
                {method.external ? <ExternalLink aria-hidden="true" /> : null}
              </a>
            )
          })}

          <div className="contact-method contact-method--location">
            <MapPin aria-hidden="true" />
            <span className="contact-method__command">
              <strong>$ pwd</strong>
              <span>{contact.location}</span>
            </span>
          </div>
        </div>

        <p className="terminal-cursor">
          amechi@portfolio:~$ <span aria-hidden="true">█</span>
        </p>
      </main>
    </div>
  )
}
