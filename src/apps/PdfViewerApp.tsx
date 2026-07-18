import { Download } from 'lucide-react'

interface PdfViewerAppProps {
  title: string
  filename: string
  source: string
  pages: readonly string[]
  status: string
  downloadable?: boolean
}

export default function PdfViewerApp({
  title,
  filename,
  source,
  pages,
  status,
  downloadable = false,
}: PdfViewerAppProps) {
  return (
    <div className="pdf-viewer-app">
      <header className="pdf-viewer-toolbar">
        <p>
          <span>preview://</span>
          {filename}
        </p>
        {downloadable ? (
          <a href={source} download={filename}>
            <Download aria-hidden="true" />
            Download PDF
          </a>
        ) : (
          <span className="terminal-status">{status}</span>
        )}
      </header>

      <div className="pdf-viewer-pages" role="document" aria-label={`${title} preview`}>
        {pages.map((page, index) => (
          <figure className="pdf-viewer-page" key={page}>
            <img
              src={page}
              alt={`${title}, page ${index + 1} of ${pages.length}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable="false"
            />
            {pages.length > 1 ? (
              <figcaption>
                page {String(index + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  )
}
