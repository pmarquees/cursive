'use client';

import { Code, Eye, Split, Palette } from 'lucide-react';

interface MobileBottomControlsProps {
  activeView: 'code' | 'preview' | 'split' | 'design';
  onViewChange: (view: 'code' | 'preview' | 'split' | 'design') => void;
}

export function MobileBottomControls({ activeView, onViewChange }: MobileBottomControlsProps) {
  const controls = [
    { id: 'code' as const, icon: Code },
    { id: 'preview' as const, icon: Eye },
    { id: 'split' as const, icon: Split },
    { id: 'design' as const, icon: Palette },
  ];

  return (
    <div className="bg-card border-t border-border shadow-lg safe-area-inset">
      <div className="flex items-center justify-around px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        {controls.map(({ id, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`flex items-center justify-center w-12 h-12 rounded-lg transition-colors p-2 ${
              activeView === id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon size={20} />
          </button>
        ))}
      </div>
    </div>
  );
}