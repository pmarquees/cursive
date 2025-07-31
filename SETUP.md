# Baby Cursor Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
```bash
# Copy the example environment file
cp .env.local.example .env.local

# Edit .env.local and add your API keys
# - OpenAI API Key: https://platform.openai.com/api-keys
# - Anthropic API Key: https://console.anthropic.com/
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Features

### File Management
- ✅ **Create Files**: Click the file icon (📄) in the sidebar
- ✅ **Create Folders**: Click the folder+ icon (📁+) in the sidebar  
- ✅ **Delete Files/Folders**: Hover over items and click the X button
- ✅ **Auto-save**: Files are automatically saved as you type
- ✅ **Multi-tab Editor**: Open multiple files in tabs

### AI Assistant
- ✅ **Model Selection**: Choose between OpenAI (GPT-4o, GPT-4o Mini, GPT-4 Turbo) and Claude models (3.5 Sonnet, 3.5 Haiku, 3 Opus)
- ✅ **File Context**: Reference files in chat using `@filename`
- ✅ **Real-time Chat**: Streaming responses from AI models
- ✅ **Code Understanding**: AI has access to file contents when referenced

### Editor Features  
- ✅ **Monaco Editor**: Full VS Code editor experience
- ✅ **Syntax Highlighting**: Support for HTML, CSS, JS, TS, JSON, Markdown
- ✅ **Live Preview**: HTML files show live preview in split/preview mode
- ✅ **Multi-view**: Switch between Code, Preview, and Split views

## 🛠️ How to Use

### Creating Files
1. Click the file icon (📄) in the sidebar
2. Type the filename (include extension, e.g., `index.html`)
3. Press Enter or click away to create

### Using AI Chat
1. Type your question in the chat input
2. Use `@filename` to reference specific files (e.g., "Explain @index.html")
3. Choose your preferred AI model from the dropdown
4. Get context-aware responses based on your code

### File Operations
- **Edit**: Click any file in the sidebar to open it
- **Delete**: Hover over a file and click the X button
- **Auto-save**: Changes are saved automatically
- **Multi-tab**: Files stay open in tabs until you close them

## 🔧 API Keys Setup

### OpenAI Setup
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to `.env.local` as `OPENAI_API_KEY=your_key_here`

### Anthropic Setup  
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create a new API key
3. Add to `.env.local` as `ANTHROPIC_API_KEY=your_key_here`

## 📁 Project Structure

```
baby-cursor-nextjs/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/route.ts      # AI chat endpoint
│   │   │   └── files/             # File operations API
│   │   ├── page.tsx               # Main IDE interface
│   │   └── layout.tsx             # App layout
│   ├── components/
│   │   ├── ChatPanel.tsx          # AI chat interface
│   │   ├── EditorArea.tsx         # Monaco editor
│   │   ├── Sidebar.tsx            # File explorer
│   │   └── StatusBar.tsx          # Bottom status
│   └── lib/
│       ├── fileApi.ts             # File operations
│       └── chatApi.ts             # Chat utilities
├── workspace/                     # User files stored here
└── .env.local                     # API keys (create from example)
```

## 🐛 Troubleshooting

### Common Issues

1. **"API key not found"**
   - Make sure `.env.local` exists and has valid API keys
   - Restart the dev server after adding keys

2. **"Failed to create file"**  
   - Check that the `workspace/` directory exists
   - Ensure proper file permissions

3. **Chat not working**
   - Verify API keys are correct
   - Check browser console for errors
   - Try switching AI models

### Development Tips

- Files are stored in the `workspace/` directory
- Use the browser dev tools to debug issues
- Check the terminal for server-side errors
- The app will create sample files if workspace is empty

## 🎯 Next Steps

Want to extend Baby Cursor? Consider adding:
- Git integration
- Terminal access  
- Plugin system
- Collaborative editing
- More file types
- Syntax checking/linting
- Code formatting
- Search across files

Happy coding! 🚀