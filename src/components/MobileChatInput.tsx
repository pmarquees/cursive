'use client';

import { Send, AtSign } from 'lucide-react';

interface MobileChatInputProps {
  onOpenSheet?: () => void;
}

export function MobileChatInput({ onOpenSheet }: MobileChatInputProps) {
  return (
    <div className="bg-card border-t border-border">
      <div className="p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex items-center gap-2 h-10">
          {/* @ File reference button */}
          <button
            onClick={onOpenSheet}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground bg-muted rounded border"
          >
            <AtSign size={16} />
          </button>

          {/* Input trigger button */}
          <button
            onClick={onOpenSheet}
            className="flex-1 h-10 px-3 py-2 text-sm border border-border rounded bg-background text-left text-muted-foreground hover:bg-muted/50 transition-colors flex items-center"
          >
            Ask AI for help with your code...
          </button>

          {/* Send button (inactive) */}
          <button
            onClick={onOpenSheet}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}