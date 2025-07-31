'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder, Search, GitBranch, Monitor, MoreHorizontal, X, FolderPlus } from 'lucide-react';
import { FileItem } from '@/lib/fileApi';

interface SidebarProps {
  files: FileItem[];
  activeFile: string;
  onFileSelect: (fileName: string) => void;
  onCreateFile: (name: string, type?: 'file' | 'directory') => void;
  onDeleteFile: (fileName: string) => void;
  onConnectLocalFolder?: () => void;
  workspaceName?: string;
  isLocalWorkspace?: boolean;
}

export function Sidebar({ files, activeFile, onFileSelect, onCreateFile, onDeleteFile, onConnectLocalFolder, workspaceName, isLocalWorkspace }: SidebarProps) {
  const [isFilesExpanded, setIsFilesExpanded] = useState(true);
  const [isChatsExpanded, setIsChatsExpanded] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [createType, setCreateType] = useState<'file' | 'directory'>('file');
  const [newFileName, setNewFileName] = useState('');

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-center gap-2 px-2 py-2 flex-shrink-0">
        <button 
          className="p-1 text-muted-foreground hover:text-foreground rounded bg-muted"
          onClick={() => {
            setIsCreating(true);
            setCreateType('file');
            setNewFileName('');
          }}
          title="New File"
        >
          <File size={16} />
        </button>
        <button 
          className="p-1 text-muted-foreground hover:text-foreground rounded"
          onClick={() => {
            setIsCreating(true);
            setCreateType('directory');
            setNewFileName('');
          }}
          title="New Folder"
        >
          <FolderPlus size={16} />
        </button>
        <button className="p-1 text-muted-foreground hover:text-foreground rounded">
          <Search size={16} />
        </button>
        <button className="p-1 text-muted-foreground hover:text-foreground rounded">
          <GitBranch size={16} />
        </button>
        <button 
          className="p-1 text-muted-foreground hover:text-foreground rounded"
          onClick={onConnectLocalFolder}
          title="Connect Local Folder"
        >
          <Monitor size={16} />
        </button>
        <button className="p-1 text-muted-foreground hover:text-foreground rounded">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* File Explorer */}
      <div className="flex-1 overflow-auto px-2 py-1">
        <div className="mb-2">
          <div 
            className="flex items-center py-1 px-2 cursor-pointer hover:bg-muted rounded"
            onClick={() => setIsFilesExpanded(!isFilesExpanded)}
          >
            {isFilesExpanded ? (
              <ChevronDown size={12} className="mr-1 text-muted-foreground" />
            ) : (
              <ChevronRight size={12} className="mr-1 text-muted-foreground" />
            )}
            <span className="font-medium text-xs uppercase text-muted-foreground truncate">Files</span>
          </div>
          
          {isFilesExpanded && (
            <div className="ml-2">
              <div className="mb-px">
                <div className="flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer">
                  <ChevronDown size={12} className="mr-1 text-muted-foreground" />
                  {isLocalWorkspace ? (
                    <Monitor size={16} className="mr-2 text-green-600 flex-shrink-0" />
                  ) : (
                    <Folder size={16} className="mr-2 text-muted-foreground flex-shrink-0" />
                  )}
                  <span className="truncate">{workspaceName || 'workspace'}</span>
                  {isLocalWorkspace && (
                    <span className="ml-1 text-xs text-green-600 font-medium">Local</span>
                  )}
                </div>
                
                <div className="ml-4">
                  {/* Create new file/folder input */}
                  {isCreating && (
                    <div className="flex items-center py-0.5 px-2 mb-1">
                      {createType === 'directory' ? (
                        <Folder size={16} className="mr-2 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <File size={16} className="mr-2 text-muted-foreground flex-shrink-0" />
                      )}
                      <input
                        type="text"
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newFileName.trim()) {
                            onCreateFile(newFileName.trim(), createType);
                            setIsCreating(false);
                            setNewFileName('');
                          } else if (e.key === 'Escape') {
                            setIsCreating(false);
                            setNewFileName('');
                          }
                        }}
                        onBlur={() => {
                          if (newFileName.trim()) {
                            onCreateFile(newFileName.trim(), createType);
                          }
                          setIsCreating(false);
                          setNewFileName('');
                        }}
                        placeholder={createType === 'directory' ? 'Folder name' : 'File name'}
                        className="flex-1 bg-background text-foreground text-xs border border-border rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-primary"
                        autoFocus
                      />
                    </div>
                  )}
                  
                  {/* File list */}
                  {files
                    .filter(file => file.type === 'directory')
                    .map((directory) => (
                      <div
                        key={directory.name}
                        className="flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer group"
                        onClick={() => onFileSelect(directory.name)}
                      >
                        <Folder size={16} className="mr-2 text-muted-foreground flex-shrink-0" />
                        <span className="truncate flex-1">{directory.name}</span>
                        <button
                          className="opacity-0 group-hover:opacity-100 size-4 flex items-center justify-center text-muted-foreground hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteFile(directory.name);
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  
                  {files
                    .filter(file => file.type === 'file')
                    .map((file) => (
                      <div 
                        key={file.name}
                        className={`flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer group ${
                          activeFile === file.name ? 'bg-muted' : ''
                        }`}
                        onClick={() => onFileSelect(file.name)}
                      >
                        <File size={16} className="mr-2 text-muted-foreground flex-shrink-0" />
                        <span className={`truncate flex-1 ${activeFile === file.name ? 'text-foreground' : ''}`}>
                          {file.name}
                        </span>
                        <button
                          className="opacity-0 group-hover:opacity-100 size-4 flex items-center justify-center text-muted-foreground hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteFile(file.name);
                          }}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chats Section */}
        <div className="mb-2">
          <div 
            className="flex items-center py-1 px-2 cursor-pointer text-muted-foreground hover:bg-muted rounded"
            onClick={() => setIsChatsExpanded(!isChatsExpanded)}
          >
            {isChatsExpanded ? (
              <ChevronDown size={12} className="mr-1 text-muted-foreground" />
            ) : (
              <ChevronRight size={12} className="mr-1 text-muted-foreground" />
            )}
            <span className="font-medium text-xs uppercase text-muted-foreground truncate">Chats</span>
          </div>
          
          {isChatsExpanded && (
            <div className="ml-2">
              <div className="mb-px">
                <div className="flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <span className="truncate">Update Videos Def...</span>
                </div>
              </div>
              <div className="mb-px">
                <div className="flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  </div>
                  <span className="truncate">Fix Memory Leak</span>
                </div>
              </div>
              <div className="mb-px">
                <div className="flex items-center py-0.5 px-2 hover:bg-muted rounded cursor-pointer">
                  <div className="w-4 h-4 mr-2 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                  </div>
                  <span className="truncate">Update Help Articles</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
