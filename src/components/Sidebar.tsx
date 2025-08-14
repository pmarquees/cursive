'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight, File, Folder, Search, GitBranch, Package, MoreHorizontal, X, FolderPlus, Move, Square, Eye, Droplet, Zap, ArrowUp, Layout, Type } from 'lucide-react';
import { FileItem, isLocalFolderMode, getLocalFolderLabel } from '@/lib/fileApi';

interface SidebarProps {
  files: FileItem[];
  activeFile: string;
  onFileSelect: (fileName: string) => void;
  onCreateFile: (name: string, type?: 'file' | 'directory') => void;
  onDeleteFile: (fileName: string) => void;
  mode?: 'files' | 'design';
  selectedElement?: {
    element: HTMLElement | null;
    selector: string;
    styles: CSSStyleDeclaration | null;
  } | null;
  onStyleChange?: (property: string, value: string) => void;
  onConnectLocal?: () => void;
}

export function Sidebar({ 
  files, 
  activeFile, 
  onFileSelect, 
  onCreateFile, 
  onDeleteFile, 
  mode = 'files',
  selectedElement,
  onStyleChange,
  onConnectLocal
}: SidebarProps) {
  const [isFilesExpanded, setIsFilesExpanded] = useState(true);

  const [isCreating, setIsCreating] = useState(false);
  const [createType, setCreateType] = useState<'file' | 'directory'>('file');
  const [newFileName, setNewFileName] = useState('');

  // Design mode state
  const [expandedSections, setExpandedSections] = useState({
    position: true,
    layout: true,
    appearance: true,
    fill: true,
    stroke: false,
    effects: false,
    export: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Helper components for design mode
  const DesignInput = ({ 
    label, 
    value, 
    onChange, 
    type = 'text',
    unit = '',
    min,
    max
  }: { 
    label: string; 
    value: string; 
    onChange: (value: string) => void;
    type?: 'text' | 'number' | 'color';
    unit?: string;
    min?: number;
    max?: number;
  }) => (
    <div className="flex items-center justify-between mb-2">
      <label className="text-xs text-muted-foreground w-8">{label}</label>
      <div className="flex items-center gap-1">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          className="w-16 h-6 px-1 text-xs bg-muted border border-border rounded text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );

  const DesignSection = ({ 
    title, 
    icon: Icon, 
    isExpanded, 
    onToggle, 
    children 
  }: { 
    title: string; 
    icon: React.ComponentType<{ size?: number; className?: string }>; 
    isExpanded: boolean; 
    onToggle: () => void; 
    children: React.ReactNode;
  }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronDown size={12} className="text-muted-foreground" />
        ) : (
          <ChevronRight size={12} className="text-muted-foreground" />
        )}
      </button>
      {isExpanded && (
        <div className="px-3 pb-3">
          {children}
        </div>
      )}
    </div>
  );

  const getStyleValue = (property: string): string => {
    if (!selectedElement?.styles) return '';
    const value = selectedElement.styles[property as keyof CSSStyleDeclaration];
    return (typeof value === 'string' ? value : String(value)) || '';
  };

  const handleStyleChange = (property: string, value: string) => {
    if (onStyleChange) {
      onStyleChange(property, value);
    }
  };

  // If in design mode, return design interface
  if (mode === 'design') {
    return (
      <div className="flex flex-col h-full bg-card">
        {/* Header */}
        <div className="p-3 border-b border-border">
          <h3 className="text-sm font-medium text-foreground">Design</h3>
          {selectedElement && (
            <p className="text-xs text-muted-foreground mt-1">
              {selectedElement.selector}
            </p>
          )}
        </div>

        {/* Design Controls */}
        <div className="flex-1 overflow-auto">
          {selectedElement ? (
            <>
              {/* Position Section */}
              <DesignSection
                title="Position"
                icon={Move}
                isExpanded={expandedSections.position}
                onToggle={() => toggleSection('position')}
              >
                <div className="space-y-2">
                  {/* Alignment buttons */}
                  <div className="grid grid-cols-6 gap-1 mb-3">
                    <button className="h-8 bg-muted hover:bg-muted/80 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-muted-foreground rounded-sm"></div>
                    </button>
                    <button className="h-8 bg-muted hover:bg-muted/80 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-muted-foreground rounded-sm"></div>
                    </button>
                    <button className="h-8 bg-muted hover:bg-muted/80 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-muted-foreground rounded-sm"></div>
                    </button>
                    <button className="h-8 bg-muted hover:bg-muted/80 rounded flex items-center justify-center">
                      <Type size={12} className="text-muted-foreground" />
                    </button>
                    <button className="h-8 bg-muted hover:bg-muted/80 rounded flex items-center justify-center">
                      <div className="flex flex-col gap-0.5">
                        <div className="w-2 h-0.5 bg-muted-foreground"></div>
                        <div className="w-2 h-0.5 bg-muted-foreground"></div>
                      </div>
                    </button>
                    <button className="h-8 bg-muted hover:bg-muted/80 rounded flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <div className="w-0.5 h-2 bg-muted-foreground"></div>
                        <div className="w-0.5 h-2 bg-muted-foreground"></div>
                      </div>
                    </button>
                  </div>
                  
                  <DesignInput
                    label="X"
                    value={getStyleValue('left').replace('px', '')}
                    onChange={(value) => handleStyleChange('left', `${value}px`)}
                    type="number"
                  />
                  <DesignInput
                    label="Y"
                    value={getStyleValue('top').replace('px', '')}
                    onChange={(value) => handleStyleChange('top', `${value}px`)}
                    type="number"
                  />
                  <DesignInput
                    label="°"
                    value="0"
                    onChange={(value) => handleStyleChange('transform', `rotate(${value}deg)`)}
                    type="number"
                    min={0}
                    max={360}
                  />
                </div>
              </DesignSection>

              {/* Layout Section */}
              <DesignSection
                title="Layout"
                icon={Layout}
                isExpanded={expandedSections.layout}
                onToggle={() => toggleSection('layout')}
              >
                <div className="space-y-2">
                  <DesignInput
                    label="W"
                    value={getStyleValue('width').replace('px', '')}
                    onChange={(value) => handleStyleChange('width', `${value}px`)}
                    type="number"
                  />
                  <DesignInput
                    label="H"
                    value={getStyleValue('height').replace('px', '')}
                    onChange={(value) => handleStyleChange('height', `${value}px`)}
                    type="number"
                  />
                  <button className="w-full h-6 bg-muted hover:bg-muted/80 rounded flex items-center justify-center">
                    <Square size={12} className="text-muted-foreground" />
                  </button>
                </div>
              </DesignSection>

              {/* Appearance Section */}
              <DesignSection
                title="Appearance"
                icon={Eye}
                isExpanded={expandedSections.appearance}
                onToggle={() => toggleSection('appearance')}
              >
                <div className="space-y-2">
                  <DesignInput
                    label="100"
                    value="100"
                    onChange={() => {}}
                    unit="%"
                  />
                  <DesignInput
                    label="0"
                    value={getStyleValue('borderRadius').replace('px', '')}
                    onChange={(value) => handleStyleChange('borderRadius', `${value}px`)}
                    type="number"
                  />
                </div>
              </DesignSection>

              {/* Fill Section */}
              <DesignSection
                title="Fill"
                icon={Droplet}
                isExpanded={expandedSections.fill}
                onToggle={() => toggleSection('fill')}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-6 h-6 rounded border border-border cursor-pointer"
                      style={{ backgroundColor: getStyleValue('backgroundColor') || '#D9D9D9' }}
                      onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'color';
                        input.value = getStyleValue('backgroundColor') || '#D9D9D9';
                        input.onchange = (e) => handleStyleChange('backgroundColor', (e.target as HTMLInputElement).value);
                        input.click();
                      }}
                    ></div>
                    <span className="text-xs text-muted-foreground flex-1">
                      {getStyleValue('backgroundColor') || 'D9D9D9'}
                    </span>
                    <span className="text-xs text-muted-foreground">100%</span>
                    <Eye size={12} className="text-muted-foreground" />
                    <button className="text-muted-foreground hover:text-foreground">
                      <X size={12} />
                    </button>
                  </div>
                </div>
              </DesignSection>

              {/* Stroke Section */}
              <DesignSection
                title="Stroke"
                icon={Square}
                isExpanded={expandedSections.stroke}
                onToggle={() => toggleSection('stroke')}
              >
                <div className="text-xs text-muted-foreground p-2">
                  Stroke options coming soon...
                </div>
              </DesignSection>

              {/* Effects Section */}
              <DesignSection
                title="Effects"
                icon={Zap}
                isExpanded={expandedSections.effects}
                onToggle={() => toggleSection('effects')}
              >
                <div className="text-xs text-muted-foreground p-2">
                  Effects options coming soon...
                </div>
              </DesignSection>

              {/* Export Section */}
              <DesignSection
                title="Export"
                icon={ArrowUp}
                isExpanded={expandedSections.export}
                onToggle={() => toggleSection('export')}
              >
                <div className="text-xs text-muted-foreground p-2">
                  Export options coming soon...
                </div>
              </DesignSection>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <Layout size={32} className="text-muted-foreground mb-2 opacity-50" />
              <p className="text-sm text-muted-foreground">Select an element to edit its properties</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // File mode (original sidebar)
  return (
    <div className="flex flex-col h-full">
      {/* Quick access */}
      <div className="px-3 pb-1 flex-shrink-0">
        <div
          className={`flex items-center bg-muted rounded-lg px-3 py-1 ${isLocalFolderMode() ? 'cursor-default' : 'cursor-pointer hover:bg-muted/80 transition-colors'}`}
          onClick={() => {
            if (!isLocalFolderMode()) {
              onConnectLocal && onConnectLocal();
            }
          }}
        >
          <span className="text-muted-foreground truncate">
            {isLocalFolderMode() ? getLocalFolderLabel() : 'remote'}
          </span>
          <div className="ml-auto flex-shrink-0">
            <span className="text-muted-foreground text-xs">⌘P</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
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
        <button className="p-1 text-muted-foreground hover:text-foreground rounded">
          <Package size={16} />
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
                  <Folder size={16} className="mr-2 text-muted-foreground flex-shrink-0" />
                  <span className="truncate">workspace</span>
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
                        key={directory.path || directory.name}
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
                        key={file.path || file.name}
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


      </div>
    </div>
  );
}
