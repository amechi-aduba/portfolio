import { AtSign, Briefcase, FileText, Folder, GraduationCap, Terminal } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import AboutApp from './apps/AboutApp'
import ContactApp from './apps/ContactApp'
import EducationApp from './apps/EducationApp'
import ExperienceApp from './apps/ExperienceApp'
import PdfViewerApp from './apps/PdfViewerApp'
import ProjectsApp from './apps/ProjectsApp'
import ResumeApp from './apps/ResumeApp'
import DesktopWindow from './components/DesktopWindow'
import Dock from './components/Dock'
import MenuBar from './components/MenuBar'
import ScrambleText from './components/ScrambleText'
import { documents } from './data/documents'
import type { AppId, DesktopWindowState, Point } from './types'

const initialWindows: Record<AppId, DesktopWindowState> = {
  about: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 56, y: 76 },
    zIndex: 21,
  },
  projects: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 94, y: 92 },
    zIndex: 22,
  },
  resume: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 136, y: 84 },
    zIndex: 23,
  },
  experience: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 172, y: 96 },
    zIndex: 24,
  },
  education: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 208, y: 108 },
    zIndex: 25,
  },
  contact: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 244, y: 118 },
    zIndex: 26,
  },
  'resume-pdf': {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 286, y: 58 },
    zIndex: 27,
  },
  'clark-diploma': {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    position: { x: 334, y: 66 },
    zIndex: 28,
  },
}

const windowConfig = {
  about: { title: 'amechi@macbook — zsh', icon: Terminal },
  projects: { title: 'projects — zsh', icon: Folder },
  resume: { title: 'Amechi_Aduba_Resume_2026.txt', icon: FileText },
  experience: { title: 'experience.log — Terminal', icon: Briefcase },
  education: { title: 'education.txt — Terminal', icon: GraduationCap },
  contact: { title: 'contact.txt — Terminal', icon: AtSign },
  'resume-pdf': { title: documents.resume.filename, icon: FileText },
  'clark-diploma': { title: documents.clarkDiploma.filename, icon: GraduationCap },
} as const

export default function App() {
  const [windows, setWindows] = useState(initialWindows)
  const zIndexRef = useRef(28)

  const nextZIndex = () => {
    zIndexRef.current += 1
    return zIndexRef.current
  }

  const bringToFront = (appId: AppId) => {
    setWindows((current) => ({
      ...current,
      [appId]: { ...current[appId], zIndex: nextZIndex() },
    }))
  }

  const openApp = (appId: AppId) => {
    setWindows((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        isOpen: true,
        isMinimized: false,
        zIndex: nextZIndex(),
      },
    }))
  }

  const closeApp = (appId: AppId) => {
    setWindows((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
      },
    }))
  }

  const minimizeApp = (appId: AppId) => {
    setWindows((current) => ({
      ...current,
      [appId]: { ...current[appId], isMinimized: true },
    }))
  }

  const toggleMaximize = (appId: AppId) => {
    setWindows((current) => ({
      ...current,
      [appId]: {
        ...current[appId],
        isMaximized: !current[appId].isMaximized,
        zIndex: nextZIndex(),
      },
    }))
  }

  const moveWindow = (appId: AppId, position: Point) => {
    setWindows((current) => ({
      ...current,
      [appId]: { ...current[appId], position },
    }))
  }

  useEffect(() => {
    const closeTopWindow = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      const topWindow = (Object.entries(windows) as Array<
        [AppId, DesktopWindowState]
      >)
        .filter(([, state]) => state.isOpen && !state.isMinimized)
        .sort(([, first], [, second]) => second.zIndex - first.zIndex)[0]

      if (topWindow) closeApp(topWindow[0])
    }

    window.addEventListener('keydown', closeTopWindow)
    return () => window.removeEventListener('keydown', closeTopWindow)
  }, [windows])

  const renderWindowContent = (appId: AppId) => {
    switch (appId) {
      case 'about':
        return <AboutApp />
      case 'projects':
        return <ProjectsApp />
      case 'resume':
        return <ResumeApp onOpenPdf={() => openApp('resume-pdf')} />
      case 'experience':
        return <ExperienceApp />
      case 'education':
        return <EducationApp onOpenDiploma={() => openApp('clark-diploma')} />
      case 'contact':
        return <ContactApp />
      case 'resume-pdf':
        return (
          <PdfViewerApp
            title={documents.resume.title}
            filename={documents.resume.filename}
            source={documents.resume.url}
            pages={documents.resume.pages}
            status={documents.resume.status}
            downloadable
          />
        )
      case 'clark-diploma':
        return (
          <PdfViewerApp
            title={documents.clarkDiploma.title}
            filename={documents.clarkDiploma.filename}
            source={documents.clarkDiploma.url}
            pages={documents.clarkDiploma.pages}
            status={documents.clarkDiploma.status}
          />
        )
    }
  }

  return (
    <div className="desktop-shell">
      <a className="skip-link" href="#desktop-actions">
        Skip to applications
      </a>

      <MenuBar />

      <main className="desktop-main" id="desktop-main">
        <section className="hero" aria-labelledby="hero-title">
          <ScrambleText id="hero-title" text="AMECHI ADUBA" />
          <p className="hero__summary">
            Software Developer ~ 22 Years Old
          </p>
        </section>
      </main>

      {(Object.entries(windows) as Array<[AppId, DesktopWindowState]>).map(
        ([appId, state]) => {
          if (!state.isOpen || state.isMinimized) return null

          const config = windowConfig[appId]
          return (
            <DesktopWindow
              appId={appId}
              title={config.title}
              icon={config.icon}
              position={state.position}
              zIndex={state.zIndex}
              isMaximized={state.isMaximized}
              onClose={() => closeApp(appId)}
              onMinimize={() => minimizeApp(appId)}
              onMaximize={() => toggleMaximize(appId)}
              onFocus={() => bringToFront(appId)}
              onMove={(position) => moveWindow(appId, position)}
              key={appId}
            >
              {renderWindowContent(appId)}
            </DesktopWindow>
          )
        },
      )}

      <Dock windows={windows} onOpenApp={openApp} />
    </div>
  )
}
