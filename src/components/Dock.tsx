import {
  AtSign,
  Briefcase,
  FileText,
  Folder,
  GraduationCap,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import type { AppId, DesktopWindowState } from '../types'

interface DockProps {
  windows: Record<AppId, DesktopWindowState>
  onOpenApp: (appId: AppId) => void
}

interface DockItem {
  id: AppId
  label: string
  icon: LucideIcon
}

const dockItems: DockItem[] = [
  { id: 'about', label: 'About', icon: Terminal },
  { id: 'projects', label: 'Projects', icon: Folder },
  { id: 'resume', label: 'Résumé', icon: FileText },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: AtSign },
]

export default function Dock({ windows, onOpenApp }: DockProps) {
  return (
    <nav className="dock" id="desktop-actions" aria-label="Applications">
      {dockItems.map((item) => {
        const Icon = item.icon
        const state = windows[item.id]
        const action = state.isMinimized ? 'Restore' : state.isOpen ? 'Focus' : 'Open'

        return (
          <button
            className={`dock-item dock-item--${item.id}${state.isOpen ? ' is-running' : ''}`}
            type="button"
            key={item.id}
            onClick={() => onOpenApp(item.id)}
            aria-label={`${action} ${item.label}`}
          >
            <span className="dock-tooltip" role="tooltip">
              {item.label}
            </span>
            <Icon aria-hidden="true" />
          </button>
        )
      })}
    </nav>
  )
}
