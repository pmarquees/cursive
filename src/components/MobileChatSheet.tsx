'use client';

import { useEffect, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { ChatPanel } from './ChatPanel';
import { FileItem } from '@/lib/fileApi';

interface MobileChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
  files: FileItem[];
  onFileChange?: () => void;
  onForceRefreshFile?: (fileName: string) => void;
  queuedMessages?: Array<{
    id: string;
    fileName: string;
    element: string;
    message: string;
    timestamp: number;
  }>;
  onClearQueuedMessage?: (id: string) => void;
}

export function MobileChatSheet({ 
  isOpen, 
  onClose, 
  files, 
  onFileChange, 
  onForceRefreshFile, 
  queuedMessages, 
  onClearQueuedMessage 
}: MobileChatSheetProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle mounting and unmounting with animation
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Start animation after render with double RAF for better reliability
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key and back button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handlePopState = () => {
      if (isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('popstate', handlePopState);
      // Add history entry to handle back button
      window.history.pushState({ chatSheet: true }, '');
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
        style={{
          opacity: isAnimating ? 1 : 0,
          transition: 'opacity 250ms ease-out',
        }}
        onClick={onClose}
      />
      
      {/* Sheet Container */}
      <div 
        className="absolute bottom-0 left-0 right-0 w-full bg-background shadow-2xl overflow-hidden pointer-events-auto"
        style={{ 
          height: '75vh',
          maxHeight: '75vh',
          boxShadow: '0 -20px 50px rgba(0, 0, 0, 0.2), 0 -5px 20px rgba(0, 0, 0, 0.1)',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          transform: isAnimating ? 'translateY(0%)' : 'translateY(100%)',
          transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          willChange: 'transform',
        }}
      >
        {/* Pull indicator */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div 
            className="w-9 h-1.5 bg-muted-foreground/30 rounded-full"
            style={{
              opacity: isAnimating ? 1 : 0,
              transition: 'opacity 200ms ease-out 100ms',
            }}
          />
        </div>

        {/* Header */}
        <div 
          className="flex items-center justify-between px-6 py-4 pt-8 border-b border-border/50 bg-background/80 backdrop-blur-xl"
          style={{
            opacity: isAnimating ? 1 : 0,
            transform: isAnimating ? 'translateY(0px)' : 'translateY(-15px)',
            transition: 'opacity 250ms ease-out 50ms, transform 250ms ease-out 50ms',
          }}
        >
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">AI Assistant</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-muted/80 rounded-full transition-all active:scale-95 active:bg-muted"
          >
            <X size={22} />
          </button>
        </div>

        {/* Chat Content */}
        <div 
          className="h-[calc(100%-85px)] overflow-hidden"
          style={{
            opacity: isAnimating ? 1 : 0,
            transform: isAnimating ? 'translateY(0px)' : 'translateY(25px)',
            transition: 'opacity 250ms ease-out 100ms, transform 250ms ease-out 100ms',
          }}
        >
          <ChatPanel
            files={files}
            onFileChange={onFileChange}
            onForceRefreshFile={onForceRefreshFile}
            queuedMessages={queuedMessages}
            onClearQueuedMessage={onClearQueuedMessage}
          />
        </div>
      </div>
    </div>
  );
}