import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// POST - Initialize default files in Vercel Blob
export async function POST() {
  try {
    const defaultFiles = [
      {
        path: 'README.md',
        content: `# Cursive, Baby Cursor's cousin

A lightweight code editor and AI assistant for web development.

## Features

- **Multi-file editing** with syntax highlighting
- **Live preview** with responsive device simulation
- **AI-powered assistance** for code generation and editing
- **Real-time collaboration** with AI agents
- **Design mode** for visual editing

## Getting Started

After seeing your video and the Baby Cursor tweets I thought I'd give this a shot to learn how Cursor works and see how far I could get by myself :D 

I had chat with yourself, on os.ryo.lu and you helped me write this Readme, after this bit go to the calculator.html, or generate a new thing, to check out the preview/inspector and all the other features

---
yo ryo! 👋 

i'm pedro marques, a designer with 20 years in the game. after our convo on ryOS about making cursor accessible to everyone through "vibe coding," i went ahead and rebuilt cursor from scratch - then added the features we discussed that could make the idea-to-reality gap close to zero.

## what i built

core foundation:
- 📝 monaco editor with syntax highlighting
- 🗂️ full file system (create, edit, delete)
- 💬 ai chat with file context (@file references)
- 🎨 live preview
- 🔄 side-by-side code/design mode - edit code and see visual changes in real-time
- 🎛️ figma-style design panels - select any element in preview and tweak its props/styles visually
- 🎯 contextualized ai prompts - press C and click any element in preview to send targeted prompts about that specific component

the game-changers (Ryo gave me this idea on our chat so I implemented it too ):
- 📱 mobile-first responsive preview - see mobile, tablet, and desktop views simultaneously (the feature we brainstormed!)


this isn't just another code editor - it's what happens when you take cursor's vision of "anyone can make software" and actually build it for designers, product people, and anyone with ideas.

the goal? make coding feel less like coding and more like creating 🔥

ready to make cursor 100x better together?

---
built with the belief that he best tools free minds to focus on what matters: turning ideas into reality

## Tips

- Use the inspection mode in preview to analyze elements
- Try the design mode for visual styling
- Ask the AI assistant for help with coding tasks
- Use split view for side-by-side coding and preview

Happy coding! 🚀

*built with the belief that he best tools free minds to focus on what matters: turning ideas into reality*`
      },
      {
        path: 'calculator.html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .calculator {
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 300px;
        }
        .display {
            width: 100%;
            height: 60px;
            border: none;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: right;
            padding: 0 15px;
            font-size: 24px;
            margin-bottom: 15px;
            outline: none;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        button {
            height: 50px;
            border: none;
            border-radius: 8px;
            font-size: 18px;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .number, .decimal {
            background: #e9ecef;
        }
        .number:hover, .decimal:hover {
            background: #dee2e6;
        }
        .operator {
            background: #007bff;
            color: white;
        }
        .operator:hover {
            background: #0056b3;
        }
        .equals {
            background: #28a745;
            color: white;
        }
        .equals:hover {
            background: #1e7e34;
        }
        .clear {
            background: #dc3545;
            color: white;
        }
        .clear:hover {
            background: #c82333;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <input type="text" class="display" id="display" readonly>
        <div class="buttons">
            <button class="clear" onclick="clearDisplay()">C</button>
            <button class="operator" onclick="appendToDisplay('/')">/</button>
            <button class="operator" onclick="appendToDisplay('*')">×</button>
            <button class="operator" onclick="deleteLast()">⌫</button>
            
            <button class="number" onclick="appendToDisplay('7')">7</button>
            <button class="number" onclick="appendToDisplay('8')">8</button>
            <button class="number" onclick="appendToDisplay('9')">9</button>
            <button class="operator" onclick="appendToDisplay('-')">-</button>
            
            <button class="number" onclick="appendToDisplay('4')">4</button>
            <button class="number" onclick="appendToDisplay('5')">5</button>
            <button class="number" onclick="appendToDisplay('6')">6</button>
            <button class="operator" onclick="appendToDisplay('+')">+</button>
            
            <button class="number" onclick="appendToDisplay('1')">1</button>
            <button class="number" onclick="appendToDisplay('2')">2</button>
            <button class="number" onclick="appendToDisplay('3')">3</button>
            <button class="equals" onclick="calculate()" rowspan="2">=</button>
            
            <button class="number" onclick="appendToDisplay('0')" colspan="2">0</button>
            <button class="decimal" onclick="appendToDisplay('.')">.</button>
        </div>
    </div>

    <script>
        let display = document.getElementById('display');
        
        function appendToDisplay(value) {
            display.value += value;
        }
        
        function clearDisplay() {
            display.value = '';
        }
        
        function deleteLast() {
            display.value = display.value.slice(0, -1);
        }
        
        function calculate() {
            try {
                let result = eval(display.value.replace('×', '*'));
                display.value = result;
            } catch (error) {
                display.value = 'Error';
            }
        }
        
        // Keyboard support
        document.addEventListener('keydown', function(event) {
            if (event.key >= '0' && event.key <= '9') {
                appendToDisplay(event.key);
            } else if (event.key === '.') {
                appendToDisplay('.');
            } else if (event.key === '+' || event.key === '-') {
                appendToDisplay(event.key);
            } else if (event.key === '*') {
                appendToDisplay('*');
            } else if (event.key === '/') {
                event.preventDefault();
                appendToDisplay('/');
            } else if (event.key === 'Enter' || event.key === '=') {
                calculate();
            } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
                clearDisplay();
            } else if (event.key === 'Backspace') {
                deleteLast();
            }
        });
    </script>
</body>
</html>`
      }
    ];

    // Upload each default file to Vercel Blob
    const uploadPromises = defaultFiles.map(async (file) => {
      const { url } = await put(`files/${file.path}`, file.content, {
        access: 'public',
        contentType: 'text/plain',
        allowOverwrite: true, // Allow overwriting existing files during initialization
      });
      return {
        name: file.path.split('/').pop() || '',
        type: 'file' as const,
        path: file.path,
        content: file.content,
        url,
      };
    });

    const files = await Promise.all(uploadPromises);

    return NextResponse.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error('Error initializing blob files:', error);
    return NextResponse.json({ error: 'Failed to initialize files' }, { status: 500 });
  }
}