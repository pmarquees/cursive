# Cursive Next.js

Cursive is a custom AI-first IDE inspired by Cursor and [Ryo's Baby cursor](https://x.com/ryolu_/status/1908328050154233863). Built with Next.js, React, and Monaco Editor, Cursive provides a complete coding environment in your browser with AI chat assistance.

![Cursive Screenshot](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Cursive+IDE)

## ✨ Features

- 📝 **Monaco Editor** - Full VS Code editor experience in the browser
- 🗂️ **File Explorer** - Navigate and manage your project files
- 💬 **AI Chat** - Get coding assistance with integrated AI chat
- 💭 **UI Inspector** - Turn any code comment into an AI prompt
- 🎨 **Live Preview** - See HTML changes instantly with split view
- 🌙 **Dark Theme** - Beautiful dark interface (light theme coming soon)
- ⚡ **Fast Performance** - Built with Next.js 15 and React 19
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🚀 **Easy Deployment** - One-click deploy to Vercel

## 🚀 Quick Start

### Development

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo>
   cd cursive
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Production Build

```bash
npm run build
npm start
```

### Desktop App (Electron)

Run Cursive as a native macOS desktop application:

#### Development
```bash
# Install dependencies
npm install

# Run in development mode (starts Next.js dev server + Electron)
npm run electron-dev
```

#### Production Build
```bash
# Build and package for macOS
npm run dist

# The built app will be in the `dist/` folder
# - Cursive-1.0.0.dmg (installer)
# - Cursive-1.0.0-mac.zip (standalone app)
```

#### Running the Desktop App
- The Electron app provides a native macOS experience with:
  - Native window controls and title bar
  - Application menu with keyboard shortcuts
  - Proper macOS integration
  - All web app features preserved

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Editor:** Monaco Editor (@monaco-editor/react)
- **Icons:** Lucide React
- **UI Components:** Radix UI primitives
- **Desktop:** Electron (for native macOS app)
- **Deployment:** Vercel (recommended)

## 📁 Project Structure

```
cursive/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and theme variables
│   │   ├── layout.tsx       # Root layout with dark theme
│   │   └── page.tsx         # Main IDE interface
│   └── components/
│       ├── Sidebar.tsx      # File explorer and navigation
│       ├── EditorArea.tsx   # Monaco editor with tabs
│       ├── ChatPanel.tsx    # AI chat interface
│       └── StatusBar.tsx    # Bottom status bar
├── electron/
│   ├── main.js             # Electron main process
│   ├── preload.js          # Preload script for security
│   └── assets/             # App icons and assets
├── public/                 # Static assets
├── vercel.json            # Vercel deployment config
└── package.json           # Dependencies and scripts
```

## 🎯 Components Overview

### Sidebar
- File explorer with expandable folders
- Project navigation
- Chat history
- Quick actions

### EditorArea
- Monaco Editor integration
- Multi-tab support
- Code/Preview/Split view modes
- Syntax highlighting for multiple languages

### ChatPanel
- AI chat interface
- Context-aware coding assistance
- Manual/Auto modes
- Model selection

### StatusBar
- Theme toggle
- File information
- Help and reset options

## 🎨 Theming

Cursive uses a sophisticated dark theme with CSS custom properties:

- **Background colors:** Deep grays and blacks
- **Accent colors:** Subtle blues and whites
- **Syntax highlighting:** VS Code dark theme
- **UI elements:** Consistent spacing and typography

## 🔧 Customization

### Adding New File Types

Edit `EditorArea.tsx` to add support for new languages:

```typescript
const getLanguage = (fileName: string) => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'py': return 'python';
    case 'rs': return 'rust';
    // Add more languages here
    default: return 'plaintext';
  }
};
```

### Modifying the Theme

Update CSS variables in `globals.css`:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* Modify colors here */
}
```
