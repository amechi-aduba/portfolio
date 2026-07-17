import {
  Maximize2,
  Minimize2,
  Minus,
  X,
  type LucideIcon,
} from 'lucide-react'
import {
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useRef,
} from 'react'
import type { AppId, Point } from '../types'

interface DesktopWindowProps {
  appId: AppId
  title: string
  icon: LucideIcon
  children: ReactNode
  position: Point
  zIndex: number
  isMaximized: boolean
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onMove: (position: Point) => void
}

interface DragState {
  pointerId: number
  offsetX: number
  offsetY: number
}

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum)

export default function DesktopWindow({
  appId,
  title,
  icon: Icon,
  children,
  position,
  zIndex,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
}: DesktopWindowProps) {
  const windowRef = useRef<HTMLElement>(null)
  const dragState = useRef<DragState | null>(null)
  const titleId = `${appId}-window-title`

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    if (
      target.closest('button') ||
      event.button !== 0 ||
      isMaximized ||
      window.innerWidth <= 720
    ) {
      return
    }

    const bounds = windowRef.current?.getBoundingClientRect()
    if (!bounds) return

    onFocus()
    dragState.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragState.current
    const bounds = windowRef.current?.getBoundingClientRect()
    if (!drag || drag.pointerId !== event.pointerId || !bounds) return

    const visibleWidth = Math.min(bounds.width, 300)
    const maxX = Math.max(8, window.innerWidth - visibleWidth)
    const maxY = Math.max(52, window.innerHeight - 130)

    onMove({
      x: clamp(event.clientX - drag.offsetX, 8, maxX),
      y: clamp(event.clientY - drag.offsetY, 48, maxY),
    })
  }

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId !== event.pointerId) return
    dragState.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section
      ref={windowRef}
      className={`desktop-window desktop-window--${appId}${isMaximized ? ' is-maximized' : ''}`}
      style={{ left: position.x, top: position.y, zIndex }}
      role="dialog"
      aria-modal="false"
      aria-labelledby={titleId}
      onPointerDown={onFocus}
    >
      <div
        className="window-titlebar"
        onDoubleClick={onMaximize}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className="window-controls"
          aria-label={`${title} window controls`}
          onDoubleClick={(event) => event.stopPropagation()}
        >
          <button
            className="window-control window-control--close"
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            title="Close"
          >
            <X aria-hidden="true" />
          </button>
          <button
            className="window-control window-control--minimize"
            type="button"
            onClick={onMinimize}
            aria-label={`Minimize ${title}`}
            title="Minimize"
          >
            <Minus aria-hidden="true" />
          </button>
          <button
            className="window-control window-control--maximize"
            type="button"
            onClick={onMaximize}
            aria-label={`${isMaximized ? 'Restore' : 'Maximize'} ${title}`}
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? (
              <Minimize2 aria-hidden="true" />
            ) : (
              <Maximize2 aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="window-title" id={titleId}>
          <Icon aria-hidden="true" />
          <span>{title}</span>
        </div>

        <div className="window-titlebar-spacer" aria-hidden="true" />
      </div>

      <div className="window-content">{children}</div>
    </section>
  )
}
