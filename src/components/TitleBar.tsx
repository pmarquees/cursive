'use client';

interface TitleBarProps {
  activeFile?: string;
  workspaceName?: string;
}

// Extend CSSProperties to include webkit app region
declare module 'react' {
  interface CSSProperties {
    WebkitAppRegion?: 'drag' | 'no-drag';
  }
}

export function TitleBar({ activeFile, workspaceName }: TitleBarProps) {
  const displayPath = workspaceName && activeFile 
    ? `${workspaceName}/${activeFile}`
    : activeFile || 'Cursive';

  const fileName = activeFile || 'No file open';

  return (
    <div 
      className="flex items-center justify-center h-10 px-4 text-sm select-none relative"
      style={{ 
        backgroundColor: '#171717',
        WebkitAppRegion: 'drag',
        color: '#ffffff'
      }}
    >
      {/* Traffic light area - non-draggable */}
      <div 
        className="absolute left-0 top-0 h-full w-20"
        style={{ WebkitAppRegion: 'no-drag' }}
      />
      
      {/* Center content */}
      <div className="flex items-center space-x-2 text-center">
        <span className="font-medium">{fileName}</span>
        {activeFile && (
          <>
            <span className="text-gray-300">•</span>
            <span className="text-gray-300 text-xs">{displayPath}</span>
          </>
        )}
      </div>
    </div>
  );
}