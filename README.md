# Amechi Aduba — Portfolio

A responsive, macOS-inspired desktop portfolio built with React, TypeScript, and Vite. The interface uses a familiar Mac wallpaper, system menu bar, draggable terminal windows, and a résumé-focused application dock.

## Highlights

- Six intentionally blank terminal project slots for manual editing
- Terminal-style résumé rebuilt from `Amechi_Aduba_Resume_2026.pdf`
- Downloadable résumé PDF served from `public/`
- About, Experience, Education, Résumé, Projects, and Contact applications
- Direct terminal contact methods for email, phone, LinkedIn, GitHub, and location
- Green character-scramble interaction on the hero name
- Draggable windows with close, minimize, maximize, z-order, and Escape-to-close behavior
- Keyboard-visible controls, semantic labels, safe external links, and reduced-motion support
- Responsive window layouts for desktop and mobile viewports

## Development

```bash
npm install
npm run dev
```

Run the full local verification set:

```bash
npm run typecheck
npm run lint
npm run build
```

## Content maintenance

- Blank project slots: `src/data/projects.ts`
- Résumé and contact content: `src/data/resume.ts`
- Desktop/window behavior: `src/App.tsx` and `src/components/DesktopWindow.tsx`
- Visual system and responsive rules: `src/styles/index.css`

Fill in the empty values in `src/data/projects.ts` to publish project titles, descriptions, stacks, repository links, and demo links. External links open in a new tab with `noopener noreferrer`.
