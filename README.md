# Cursive – AI‑assisted in‑browser editor

Build, preview, and iterate on web projects with an integrated code editor, visual design tools, and AI assistance—all in the browser.

## Key features

-  Editor: Monaco-based code editor with syntax highlighting
-  Files: Create, rename, and delete files and folders
-  AI chat with file context: Reference files with `@file` mentions to guide the assistant
-  Live preview: See code changes reflected in real time
-  Code/Design split view: Edit code while previewing the rendered UI side-by-side
-  Visual inspector panels: Select elements in the preview and adjust styles/props visually
-  Contextual prompts: Press `C`, then click an element to start an AI prompt scoped to that component
-  Responsive preview: Inspect mobile, tablet, and desktop layouts simultaneously
-  Mobile-friendly UI: Dedicated mobile controls for on-the-go editing and previewing

## Getting started

Requirements:

- Node.js 18+ and npm (or pnpm/yarn)

Install and run:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

Tip: Try `workspace/calculator.html` as a starting example, or create a new file in the file sidebar.

## How to use

- Create/open files from the sidebar and edit them in the Monaco editor
- Preview updates live in the preview panel; switch to split Code/Design view as needed
- Use the visual inspector to tweak selected elements without writing CSS
- For targeted help, press `C` and click an element to open a context-aware AI prompt
- Use the responsive preview to review mobile, tablet, and desktop breakpoints at once

## Keyboard shortcuts

- `C` + click: Start a contextual AI prompt for a selected element
- Standard editor shortcuts apply (e.g., Cmd/Ctrl+S to save)

## Project structure

- `src/app` – Next.js app and API routes (e.g., `api/files`, `api/chat`, optional blob utilities)
- `src/components` – Editor, preview, design panels, and UI building blocks
- `workspace` – Example and user-created files served in the preview (e.g., `calculator.html`)
- `public` – Static assets

## Configuration

- API keys and providers: see `SETUP_API_KEYS.md`
- Storage/Blob setup (optional): see `VERCEL_BLOB_SETUP.md`
- Additional setup notes: see `SETUP.md`

## Notes

Cursive focuses on shortening the gap from idea to working UI by combining code, visual manipulation, and AI guidance in a single workflow.