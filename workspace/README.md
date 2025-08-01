# Cursive Next.js

Cursive is a custom AI-first IDE inspired by Cursor and [Ryo's Baby cursor](https://x.com/ryolu_/status/1908328050154233863). Built with Next.js, React, and Monaco Editor, Cursive provides a complete coding environment in your browser with AI chat assistance.

## ✨ Features

- 📝 **Monaco Editor** - Full VS Code editor experience in the browser
- 🗂️ **File Explorer** - Navigate and manage your project files
- 💬 **AI Chat** - Get coding assistance with integrated AI chat
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


3. **Follow the prompts and your Cursive IDE will be live!**

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Editor:** Monaco Editor (@monaco-editor/react)
- **Icons:** Lucide React
- **UI Components:** Radix UI primitives
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
├── public/                  # Static assets
├── vercel.json             # Vercel deployment config
└── package.json            # Dependencies and scripts
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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - The editor that powers VS Code
- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful & consistent icons
- [Vercel](https://vercel.com/) - Platform for frontend developers

---

Built with ❤️ by the Cursive team. 

**Happy coding!** 🚀