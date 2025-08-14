'use client';

import { useState } from 'react';
import { ChevronDown, File, Folder, Plus } from 'lucide-react';
import { FileItem } from '@/lib/fileApi';

interface MobileFileSelectorProps {
  files: FileItem[];
  activeFile: string;
  onFileSelect: (fileName: string) => void;
  onCreateFile: (name: string, type?: 'file' | 'directory') => void;
}

export function MobileFileSelector({ files, activeFile, onFileSelect, onCreateFile }: MobileFileSelectorProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createType, setCreateType] = useState<'file' | 'directory'>('file');
  const [newFileName, setNewFileName] = useState('');

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      onCreateFile(newFileName.trim(), createType);
      setIsCreating(false);
      setNewFileName('');
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="relative bg-card border-b border-border">
      {/* Browser-style file selector */}
      <div className="flex items-center h-12 px-3 gap-2 safe-area-inset">
        {/* Current file display */}
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex-1 flex items-center gap-2 h-8 px-3 bg-muted rounded-md hover:bg-muted/80 transition-colors"
        >
          <File size={16} className="text-muted-foreground" />
          <span className="truncate text-sm">
            {activeFile || 'Select a file'}
          </span>
          <ChevronDown size={16} className="ml-auto text-muted-foreground" />
        </button>

        {/* New file button */}
        <button
          onClick={() => {
            setIsCreating(true);
            setCreateType('file');
            setNewFileName('');
            setIsDropdownOpen(true);
          }}
          className="h-8 w-8 flex items-center justify-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsDropdownOpen(false)}
          />
          
          {/* Dropdown content */}
          <div className="absolute top-full left-0 right-0 z-50 bg-popover border border-border shadow-lg max-h-80 overflow-y-auto">
            {/* Create new file input */}
            {isCreating && (
              <div className="p-3 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() => setCreateType('file')}
                    className={`px-2 py-1 text-xs rounded ${
                      createType === 'file' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    File
                  </button>
                  <button
                    onClick={() => setCreateType('directory')}
                    className={`px-2 py-1 text-xs rounded ${
                      createType === 'directory' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    Folder
                  </button>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCreateFile();
                      } else if (e.key === 'Escape') {
                        setIsCreating(false);
                        setNewFileName('');
                      }
                    }}
                    placeholder={createType === 'directory' ? 'Folder name' : 'File name'}
                    className="flex-1 px-2 py-1 text-sm border border-border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                  />
                  <button
                    onClick={handleCreateFile}
                    disabled={!newFileName.trim()}
                    className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded disabled:opacity-50"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}

            {/* Files list */}
            <div className="py-1">
              {/* Directories first */}
              {files
                .filter(file => file.type === 'directory')
                .map((directory) => (
                  <button
                    key={directory.path || directory.name}
                    onClick={() => {
                      onFileSelect(directory.name);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-muted"
                  >
                    <Folder size={16} className="text-muted-foreground" />
                    <span className="text-sm">{directory.name}</span>
                  </button>
                ))}
              
              {/* Files */}
              {files
                .filter(file => file.type === 'file')
                .map((file) => (
                  <button
                    key={file.path || file.name}
                    onClick={() => {
                      onFileSelect(file.name);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-muted ${
                      activeFile === file.name ? 'bg-muted' : ''
                    }`}
                  >
                    <File size={16} className="text-muted-foreground" />
                    <span className="text-sm">{file.name}</span>
                    {activeFile === file.name && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full" />
                    )}
                  </button>
                ))}

              {files.length === 0 && (
                <div className="px-4 py-6 text-center text-muted-foreground text-sm">
                  No files yet. Create your first file!
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}