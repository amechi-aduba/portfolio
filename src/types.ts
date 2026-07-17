export type AppId =
  | 'about'
  | 'projects'
  | 'resume'
  | 'experience'
  | 'education'
  | 'contact'
  | 'resume-pdf'
  | 'clark-diploma'

export type ProjectStatus = 'in-progress' | 'complete'

export interface ProjectSlot {
  id: string
  title: string
  description: string
  stack: string[]
  repositoryUrl: string
  demoUrl: string
  status: ProjectStatus
}

export interface Point {
  x: number
  y: number
}

export interface DesktopWindowState {
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  position: Point
  zIndex: number
}
