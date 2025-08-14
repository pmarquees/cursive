'use client';

import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function StatusBar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex items-center justify-between h-6 text-xs border-t bg-muted text-muted-foreground border-border pl-[calc(0.75rem+env(safe-area-inset-left))] pr-[calc(0.75rem+env(safe-area-inset-right))] md:pl-[calc(1.25rem+env(safe-area-inset-left))] md:pr-[calc(1.25rem+env(safe-area-inset-right))]">
      <div className="flex items-center space-x-2">
        <button className="text-xs hover:text-foreground cursor-pointer">
          Help
        </button>
        <button className="text-xs hover:text-foreground cursor-pointer">
          Reset
        </button>
        <button
          onClick={toggleTheme}
          className="size-6 w-6 h-6 inline-flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded"
        >
          {theme === 'light' ? (
            <Sun size={14} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          ) : (
            <Moon size={14} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          )}
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="font-mono tabular-nums cursor-default">
          EOF Past
        </span>
        <span>UTF-8</span>
        <span>HTML</span>
      </div>
    </div>
  );
}
