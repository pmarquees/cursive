'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, ArrowRight, Settings, MessageSquare, X, File, Maximize2, Minimize2, Eye, Send, Monitor, Tablet, Smartphone } from 'lucide-react';
import { DesignPanel } from './DesignPanel';

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

interface EditorAreaProps {
  openFiles: {[key: string]: string};
  activeFile: string;
  onFileChange: (fileName: string, content: string) => void;
  onFileClose: (fileName: string) => void;
  onFileSelect: (fileName: string) => void;
  isPreviewFullscreen?: boolean;
  onTogglePreviewFullscreen?: () => void;
  onAddQueuedMessage?: (element: string, message: string) => void;
  streamingFiles?: Set<string>;
  unsavedFiles?: Set<string>;
  onManualSave?: (fileName: string) => void;
  // Mobile-specific props
  forcedView?: 'code' | 'preview' | 'split' | 'design';
  hideTabs?: boolean;
  hideViewControls?: boolean;
  // Design mode props
  onElementSelect?: (element: {
    element: HTMLElement | null;
    selector: string;
    styles: CSSStyleDeclaration | null;
  } | null) => void;
  onStyleChange?: (property: string, value: string) => void;
}

export function EditorArea({ openFiles, activeFile, onFileChange, onFileClose, onFileSelect, isPreviewFullscreen, onTogglePreviewFullscreen, onAddQueuedMessage, streamingFiles, unsavedFiles, onManualSave, forcedView, hideTabs, hideViewControls, onElementSelect, onStyleChange }: EditorAreaProps) {
  const [activeView, setActiveView] = useState<'code' | 'preview' | 'split' | 'design'>('code');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isInspectionMode, setIsInspectionMode] = useState(false);
  const [inspectionPrompt, setInspectionPrompt] = useState<{
    element: string;
    position: { x: number; y: number };
    show: boolean;
  } | null>(null);
  const [promptMessage, setPromptMessage] = useState('');
  const [splitRatio, setSplitRatio] = useState(0.5); // 0.5 = 50/50 split
  const [isResizing, setIsResizing] = useState(false);
  const [selectedElement, setSelectedElement] = useState<{
    element: HTMLElement | null;
    selector: string;
    styles: CSSStyleDeclaration | null;
  } | null>(null);
  const [selectedElementSelector, setSelectedElementSelector] = useState<string>('');
  const [designSplitRatio, setDesignSplitRatio] = useState(0.6); // 60% preview, 40% design panel
  const [isDesignResizing, setIsDesignResizing] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const designContainerRef = useRef<HTMLDivElement>(null);
  
  const currentFileContent = openFiles[activeFile];
  const openFileNames = Object.keys(openFiles);
  const isActiveFileStreaming = activeFile && streamingFiles?.has(activeFile);

  // Handle Ctrl+S keyboard shortcut for manual save
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        if (activeFile && onManualSave) {
          onManualSave(activeFile);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeFile, onManualSave]);

  // Get device-specific styles for responsive preview
  const getDeviceStyles = () => {
    switch (deviceView) {
      case 'mobile':
        return {
          width: '375px',
          height: '667px',
          maxWidth: '100%',
          maxHeight: '100%',
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        };
      case 'tablet':
        return {
          width: '768px',
          height: '1024px',
          maxWidth: '100%',
          maxHeight: '100%',
          margin: '0 auto',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        };
      case 'desktop':
      default:
        return {
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '0',
          boxShadow: 'none'
        };
    }
  };

  // Mouse event handlers for resizing split views
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && containerRef.current) {
        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        const newRatio = (e.clientX - containerRect.left) / containerRect.width;
        const constrainedRatio = Math.max(0.1, Math.min(0.9, newRatio));
        setSplitRatio(constrainedRatio);
      }
      
      if (isDesignResizing && designContainerRef.current) {
        const container = designContainerRef.current;
        const containerRect = container.getBoundingClientRect();
        const newRatio = (e.clientX - containerRect.left) / containerRect.width;
        const constrainedRatio = Math.max(0.3, Math.min(0.8, newRatio));
        setDesignSplitRatio(constrainedRatio);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      setIsDesignResizing(false);
    };

    if (isResizing || isDesignResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, isDesignResizing]);

  // Keyboard event listener for inspection mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'c' || e.key === 'C') {
        if (activeView === 'preview' || activeView === 'split') {
          setIsInspectionMode(!isInspectionMode);
          setInspectionPrompt(null);
        }
      }
      if (e.key === 'Escape') {
        setIsInspectionMode(false);
        setInspectionPrompt(null);
        if (activeView === 'design') {
          setSelectedElement(null);
          setSelectedElementSelector('');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInspectionMode, activeView]);

  // Inject inspection script into iframe
  useEffect(() => {
    if (!iframeRef.current || !isInspectionMode) return;
    
    const iframe = iframeRef.current;
    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument;
        if (!iframeDoc) return;

        // Remove existing inspection styles and listeners
        const existingStyle = iframeDoc.getElementById('inspection-styles');
        if (existingStyle) existingStyle.remove();

        if (isInspectionMode) {
          // Add inspection styles
          const style = iframeDoc.createElement('style');
          style.id = 'inspection-styles';
          style.textContent = `
            .inspection-hover {
              outline: 2px solid #3b82f6 !important;
              outline-offset: 2px !important;
              cursor: crosshair !important;
            }
          `;
          iframeDoc.head.appendChild(style);

          // Add event listeners
          const handleMouseOver = (e: Event) => {
            if (!isInspectionMode) return;
            const target = e.target as HTMLElement;
            target.classList.add('inspection-hover');
          };

          const handleMouseOut = (e: Event) => {
            const target = e.target as HTMLElement;
            target.classList.remove('inspection-hover');
          };

          const handleClick = (e: Event) => {
            if (!isInspectionMode) return;
            e.preventDefault();
            e.stopPropagation();
            
            const target = e.target as HTMLElement;
            const rect = target.getBoundingClientRect();
            const iframeRect = iframe.getBoundingClientRect();
            
            // Get element selector/info
            const elementInfo = getElementInfo(target);
            
            setInspectionPrompt({
              element: elementInfo,
              position: {
                x: iframeRect.left + rect.left + rect.width / 2,
                y: iframeRect.top + rect.top + rect.height + 10
              },
              show: true
            });
          };

          // Attach listeners to all elements
          const allElements = iframeDoc.querySelectorAll('*');
          allElements.forEach(el => {
            el.addEventListener('mouseover', handleMouseOver);
            el.addEventListener('mouseout', handleMouseOut);
            el.addEventListener('click', handleClick);
          });
        }
      } catch {
        // Cross-origin restrictions might prevent access
        console.log('Could not access iframe content for inspection');
      }
    };

    iframe.addEventListener('load', handleLoad);
    handleLoad(); // Also try immediately if already loaded

    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
  }, [isInspectionMode]);

  // Design mode element selection
  useEffect(() => {
    if (!iframeRef.current || activeView !== 'design') return;
    
    const iframe = iframeRef.current;
    const handleLoad = () => {
      try {
        const iframeDoc = iframe.contentDocument;
        if (!iframeDoc) return;

        // Remove existing design styles and listeners
        const existingStyle = iframeDoc.getElementById('design-styles');
        if (existingStyle) existingStyle.remove();

        // Add design mode styles
        const style = iframeDoc.createElement('style');
        style.id = 'design-styles';
        style.textContent = `
          .design-hover {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 2px !important;
            cursor: pointer !important;
          }
          .design-selected {
            outline: 2px solid #ef4444 !important;
            outline-offset: 2px !important;
            background: rgba(239, 68, 68, 0.1) !important;
          }
        `;
        iframeDoc.head.appendChild(style);

        // Add event listeners for design mode
        const handleMouseOver = (e: Event) => {
          const target = e.target as HTMLElement;
          if (!target.classList.contains('design-selected')) {
            target.classList.add('design-hover');
          }
        };

        const handleMouseOut = (e: Event) => {
          const target = e.target as HTMLElement;
          target.classList.remove('design-hover');
        };

        const handleClick = (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          
          const target = e.target as HTMLElement;
          
          // Remove previous selection
          if (selectedElement?.element) {
            selectedElement.element.classList.remove('design-selected');
          }
          
          // Add selection to new element
          target.classList.add('design-selected');
          
          // Generate selector for the element
          const selector = generateElementSelector(target);
          
          const elementData = {
            element: target,
            selector,
            styles: window.getComputedStyle(target)
          };
          
          setSelectedElement(elementData);
          setSelectedElementSelector(selector);
          onElementSelect?.(elementData);
        };

        // Attach listeners to all elements
        const allElements = iframeDoc.querySelectorAll('*');
        allElements.forEach(el => {
          el.addEventListener('mouseover', handleMouseOver);
          el.addEventListener('mouseout', handleMouseOut);
          el.addEventListener('click', handleClick);
        });

        // Re-select previously selected element or select body by default
        if (selectedElementSelector) {
          try {
            const element = iframeDoc.querySelector(selectedElementSelector) as HTMLElement;
            if (element) {
              element.classList.add('design-selected');
              const elementData = {
                element,
                selector: selectedElementSelector,
                styles: window.getComputedStyle(element)
              };
              setSelectedElement(elementData);
              onElementSelect?.(elementData);
            }
          } catch {
            // If selector is invalid, fall back to body
            const body = iframeDoc.body;
            if (body) {
              body.classList.add('design-selected');
              const elementData = {
                element: body,
                selector: 'body',
                styles: window.getComputedStyle(body)
              };
              setSelectedElement(elementData);
              setSelectedElementSelector('body');
              onElementSelect?.(elementData);
            }
          }
        } else if (!selectedElement) {
          // Select body by default on first load
          const body = iframeDoc.body;
          if (body) {
            body.classList.add('design-selected');
            const elementData = {
              element: body,
              selector: 'body',
              styles: window.getComputedStyle(body)
            };
            setSelectedElement(elementData);
            setSelectedElementSelector('body');
            onElementSelect?.(elementData);
          }
        }
      } catch {
        console.log('Could not access iframe content for design mode');
      }
    };

    iframe.addEventListener('load', handleLoad);
    handleLoad(); // Also try immediately if already loaded

    return () => {
      iframe.removeEventListener('load', handleLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeView, selectedElementSelector]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (fileChangeTimeoutRef.current) {
        clearTimeout(fileChangeTimeoutRef.current);
      }
    };
  }, []);

  const generateElementSelector = (element: HTMLElement): string => {
    if (element.id) {
      return `#${element.id}`;
    }
    
    const tagName = element.tagName.toLowerCase();
    const classList = Array.from(element.classList);
    
    if (classList.length > 0) {
      // Filter out design-specific classes
      const relevantClasses = classList.filter(cls => 
        !cls.startsWith('design-') && 
        !cls.includes('hover') && 
        !cls.includes('selected')
      );
      if (relevantClasses.length > 0) {
        return `${tagName}.${relevantClasses.join('.')}`;
      }
    }
    
    return tagName;
  };

  const getElementInfo = (element: HTMLElement): string => {
    const tagName = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const className = element.className ? `.${element.className.split(' ').join('.')}` : '';
    const textContent = element.textContent?.substring(0, 50) || '';
    
    return `${tagName}${id}${className} - "${textContent}"`;
  };

  const handleSendInspectionMessage = () => {
    if (!inspectionPrompt || !promptMessage.trim() || !onAddQueuedMessage) return;
    
    onAddQueuedMessage(inspectionPrompt.element, promptMessage.trim());
    setPromptMessage('');
    setInspectionPrompt(null);
    setIsInspectionMode(false);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!value || !activeFile) return;
    onFileChange(activeFile, value);
  };

  // Debounce file changes to prevent excessive re-renders
  const fileChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const handleStyleChange = (property: string, value: string) => {
    if (!selectedElement?.element || !activeFile || !currentFileContent) return;

    // Apply the style immediately to the iframe for instant visual feedback
    if (selectedElement.element && selectedElement.element.style) {
      selectedElement.element.style.setProperty(property, value);
    }

    const selector = selectedElement.selector;
    let updatedContent = currentFileContent;

    // Check if there's already a style tag
    const styleTagRegex = /<style[^>]*>([\s\S]*?)<\/style>/i;
    const styleMatch = updatedContent.match(styleTagRegex);

    let newStyleContent = '';
    if (styleMatch) {
      const existingStyles = styleMatch[1];
      const selectorRegex = new RegExp(`${escapeRegex(selector)}\\s*{([^}]*)}`, 'i');
      const selectorMatch = existingStyles.match(selectorRegex);

      if (selectorMatch) {
        // Update existing selector
        const existingProperties = selectorMatch[1];
        const propertyRegex = new RegExp(`${property}\\s*:[^;]*;?`, 'i');
        
        let updatedProperties = existingProperties;
        if (propertyRegex.test(existingProperties)) {
          updatedProperties = existingProperties.replace(propertyRegex, `${property}: ${value};`);
        } else {
          updatedProperties += ` ${property}: ${value};`;
        }

        newStyleContent = existingStyles.replace(selectorRegex, `${selector} {${updatedProperties}}`);
      } else {
        // Add new selector
        newStyleContent = existingStyles + `\n      ${selector} {\n        ${property}: ${value};\n      }`;
      }

      updatedContent = updatedContent.replace(styleTagRegex, `<style>${newStyleContent}</style>`);
    } else {
      // Add new style tag
      const headCloseRegex = /<\/head>/i;
      const newStyleTag = `  <style>\n      ${selector} {\n        ${property}: ${value};\n      }\n    </style>\n  </head>`;
      
      if (headCloseRegex.test(updatedContent)) {
        updatedContent = updatedContent.replace(headCloseRegex, newStyleTag);
      } else {
        // Add style tag after the opening head tag or at the beginning
        const headOpenRegex = /<head[^>]*>/i;
        if (headOpenRegex.test(updatedContent)) {
          updatedContent = updatedContent.replace(headOpenRegex, (match) => 
            `${match}\n    <style>\n      ${selector} {\n        ${property}: ${value};\n      }\n    </style>`
          );
        }
      }
    }

    // Debounce the file change to prevent excessive updates
    if (fileChangeTimeoutRef.current) {
      clearTimeout(fileChangeTimeoutRef.current);
    }
    
    fileChangeTimeoutRef.current = setTimeout(() => {
      onFileChange(activeFile, updatedContent);
    }, 300); // 300ms debounce
  };

  const escapeRegex = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const getLanguage = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'html': return 'html';
      case 'css': return 'css';
      case 'js': return 'javascript';
      case 'ts': return 'typescript';
      case 'tsx': return 'typescript';
      case 'jsx': return 'javascript';
      case 'json': return 'json';
      case 'md': return 'markdown';
      default: return 'plaintext';
    }
  };

  // Device Switcher Component
  const DeviceSwitcher = () => (
    <div className="bg-muted border-b border-border px-4 py-2 flex items-center justify-center gap-2">
      <button
        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm border transition-colors ${
          deviceView === 'mobile'
            ? 'bg-card border-border text-foreground'
            : 'border-transparent hover:bg-muted/50 text-muted-foreground'
        }`}
        onClick={() => setDeviceView('mobile')}
      >
        <Smartphone size={14} />
        Mobile
      </button>
      <button
        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm border transition-colors ${
          deviceView === 'tablet'
            ? 'bg-card border-border text-foreground'
            : 'border-transparent hover:bg-muted/50 text-muted-foreground'
        }`}
        onClick={() => setDeviceView('tablet')}
      >
        <Tablet size={14} />
        Tablet
      </button>
      <button
        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm border transition-colors ${
          deviceView === 'desktop'
            ? 'bg-card border-border text-foreground'
            : 'border-transparent hover:bg-muted/50 text-muted-foreground'
        }`}
        onClick={() => setDeviceView('desktop')}
      >
        <Monitor size={14} />
        Desktop
      </button>
    </div>
  );

  // Use forced view if provided (mobile mode)
  const currentView = forcedView || activeView;

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar - hidden on mobile */}
      {!hideTabs && (
        <div className="bg-card flex items-center px-2 h-[32px] border-b border-border flex-shrink-0">
          <div className="flex items-center mr-2">
            <button className="size-7 inline-flex items-center justify-center text-muted-foreground hover:text-foreground">
              <ArrowLeft size={16} />
            </button>
            <button className="size-7 inline-flex items-center justify-center text-muted-foreground hover:text-foreground">
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="flex flex-1 overflow-x-auto select-none h-[32px]">
            {openFileNames.map((fileName) => {
              const isFileStreaming = streamingFiles?.has(fileName);
              const hasUnsavedChanges = unsavedFiles?.has(fileName);
              return (
                <div
                  key={`tab-${fileName}`}
                  className={`group max-w-[200px] py-1 flex items-center border-l border-border rounded-none px-3 text-xs h-full cursor-pointer ${
                    activeFile === fileName 
                      ? 'bg-muted text-foreground' 
                      : 'hover:bg-muted/50 text-muted-foreground'
                  } ${isFileStreaming ? 'bg-primary/10 border-primary/30' : ''}`}
                  onClick={() => onFileSelect(fileName)}
                  onDoubleClick={() => onManualSave?.(fileName)}
                  title={hasUnsavedChanges ? 'Double-click to save' : undefined}
                >
                  <File size={14} className="mr-2 text-muted-foreground" />
                  <span className="truncate max-w-[120px]">{fileName}</span>
                  {hasUnsavedChanges && (
                    <span className="ml-1 flex items-center">
                      <span className="text-white text-xs">●</span>
                    </span>
                  )}
                  {isFileStreaming && (
                    <span className="ml-1 flex items-center gap-1">
                      <span className="animate-pulse text-primary text-xs">●</span>
                    </span>
                  )}
                  <button
                    className="ml-2 size-4 inline-flex items-center justify-center text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onFileClose(fileName);
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center ml-auto">
            <button className="size-7 p-1 text-muted-foreground hover:text-foreground">
              <Settings size={16} />
            </button>
            <button className="size-7 p-1 text-muted-foreground hover:text-foreground">
              <MessageSquare size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Editor Controls - hidden on mobile */}
      {!hideViewControls && (
        <div className="bg-muted flex w-full select-none items-center justify-between border-b border-border">
          <div className="px-4 py-2 flex items-center text-muted-foreground text-sm flex-grow truncate">
            <span className="text-muted-foreground">{activeFile || 'No file selected'}</span>
            {isActiveFileStreaming && (
              <span className="ml-3 inline-flex items-center gap-2 px-2 py-1 bg-primary/10 border border-primary/30 rounded text-primary text-xs">
                <span className="animate-pulse">●</span>
                <span className="font-medium">LIVE EDITING</span>
              </span>
            )}
            
            {/* File Sync Indicator */}
            {activeFile && streamingFiles && !streamingFiles.has(activeFile) && (
              <span className="ml-3 inline-flex items-center gap-2 px-2 py-1 bg-green-100 border border-green-300 rounded text-green-700 text-xs">
                <span>✓</span>
                <span className="font-medium">SYNCED</span>
              </span>
            )}
          </div>
          <div className="flex items-center px-2 flex-shrink-0">
            <div className="flex items-center space-x-0.5">
              <button 
                className={`h-7 rounded-md gap-1 px-2 text-sm border ${
                  activeView === 'code' 
                    ? 'bg-card border-border' 
                    : 'border-transparent hover:bg-muted opacity-50'
                }`}
                onClick={() => setActiveView('code')}
              >
                Code
              </button>
              <button 
                className={`h-7 rounded-md gap-1 px-2 text-sm border ${
                  activeView === 'preview' 
                    ? 'bg-card border-border' 
                    : 'border-transparent hover:bg-muted opacity-50'
                }`}
                onClick={() => setActiveView('preview')}
              >
                Preview
              </button>
              <button 
                className={`h-7 rounded-md gap-1 px-2 text-sm border ${
                  activeView === 'split' 
                    ? 'bg-card border-border' 
                    : 'border-transparent hover:bg-muted opacity-50'
                }`}
                onClick={() => setActiveView('split')}
              >
                Split
              </button>
              <button 
                className={`h-7 rounded-md gap-1 px-2 text-sm border ${
                  activeView === 'design' 
                    ? 'bg-card border-border' 
                    : 'border-transparent hover:bg-muted opacity-50'
                }`}
                onClick={() => setActiveView('design')}
              >
                Design
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden relative font-mono text-sm flex flex-col md:flex-row">
        {currentView === 'code' && (
          <div className="w-full h-full">
            {activeFile && currentFileContent !== undefined ? (
              <MonacoEditor
                height="100%"
                language={getLanguage(activeFile)}
                value={currentFileContent}
                onChange={handleEditorChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 12,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: 'on'
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No file selected
              </div>
            )}
          </div>
        )}
        
        {currentView === 'preview' && (
          <div className="w-full h-full flex flex-col">
            {activeFile?.endsWith('.html') && currentFileContent ? (
              <>
                <DeviceSwitcher />
                <div className="flex-1 bg-white relative overflow-auto" style={{ padding: deviceView !== 'desktop' ? '20px' : '0' }}>
                  <iframe
                    ref={iframeRef}
                    srcDoc={currentFileContent}
                    className="border-none"
                    style={getDeviceStyles()}
                    title="Preview"
                  />
                {/* Inspection Mode Indicator */}
                {isInspectionMode && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Eye size={16} />
                    Inspection Mode (Press ESC to exit)
                  </div>
                )}
                
                {/* Fullscreen Toggle Button - Top right of preview area */}
                <button
                  onClick={onTogglePreviewFullscreen}
                  className="absolute top-2 right-2 p-3 bg-black hover:bg-black/80 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
                  title={isPreviewFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  style={{ zIndex: 99999, backgroundColor: '#000000' }}
                >
                  {isPreviewFullscreen ? (
                    <Minimize2 size={16} />
                  ) : (
                    <Maximize2 size={16} />
                  )}
                </button>
                </div>
              </>
            ) : (
              <>
                <DeviceSwitcher />
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                  Preview not available for this file type
                </div>
              </>
            )}
          </div>
        )}
        
        {currentView === 'split' && (
          <div ref={containerRef} className="flex w-full h-full relative">
            {/* Code Editor Pane */}
            <div 
              className="h-full"
              style={{ width: `${splitRatio * 100}%` }}
            >
              {activeFile && currentFileContent !== undefined ? (
                <MonacoEditor
                  height="100%"
                  language={getLanguage(activeFile)}
                  value={currentFileContent}
                  onChange={handleEditorChange}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on'
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No file selected
                </div>
              )}
            </div>
            
            {/* Resizable Divider */}
            <div 
              className="w-1 bg-border cursor-col-resize hover:bg-primary/50 transition-colors duration-150 relative flex-shrink-0"
              onMouseDown={() => setIsResizing(true)}
            >
              <div className="absolute inset-0 w-2 -ml-0.5" /> {/* Larger click target */}
            </div>
            
            {/* Preview Pane */}
            <div 
              className="h-full flex flex-col"
              style={{ width: `${(1 - splitRatio) * 100}%` }}
            >
              {activeFile?.endsWith('.html') && currentFileContent ? (
                <>
                  <DeviceSwitcher />
                  <div className="flex-1 bg-white relative overflow-auto" style={{ padding: deviceView !== 'desktop' ? '20px' : '0' }}>
                    <iframe
                      ref={currentView === 'split' ? iframeRef : undefined}
                      srcDoc={currentFileContent}
                      className="border-none"
                      style={getDeviceStyles()}
                      title="Preview"
                    />
                  {/* Inspection Mode Indicator */}
                  {isInspectionMode && (
                    <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
                      <Eye size={16} />
                      Inspection Mode (Press ESC to exit)
                    </div>
                  )}
                  
                  {/* Fullscreen Toggle Button - Top right of preview area */}
                  <button
                    onClick={onTogglePreviewFullscreen}
                    className="absolute top-2 right-2 p-3 bg-black hover:bg-black/80 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-105"
                    title={isPreviewFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    style={{ zIndex: 99999, backgroundColor: '#000000' }}
                  >
                    {isPreviewFullscreen ? (
                      <Minimize2 size={16} />
                    ) : (
                      <Maximize2 size={16} />
                    )}
                  </button>
                  </div>
                </>
              ) : (
                <>
                  <DeviceSwitcher />
                  <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Preview not available for this file type
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        
        {currentView === 'design' && (
          <div ref={designContainerRef} className="flex w-full h-full relative">
            {/* Preview Pane */}
            <div 
              className="h-full bg-white relative"
              style={{ width: `${designSplitRatio * 100}%` }}
            >
              {activeFile?.endsWith('.html') && currentFileContent ? (
                <>
                  <iframe
                    ref={iframeRef}
                    srcDoc={currentFileContent}
                    className="w-full h-full border-none"
                    title="Design Preview"
                  />
                  
                  {/* Design Mode Indicator */}
                  <div className="absolute top-2 left-2 bg-purple-600 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
                    <Eye size={16} />
                    Design Mode (Click elements to edit)
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Design mode only works with HTML files
                </div>
              )}
            </div>
            
            {/* Resizable Divider */}
            <div 
              className="w-1 bg-border cursor-col-resize hover:bg-primary/50 transition-colors duration-150 relative flex-shrink-0"
              onMouseDown={() => setIsDesignResizing(true)}
            >
              <div className="absolute inset-0 w-2 -ml-0.5" /> {/* Larger click target */}
            </div>
            
            {/* Design Panel */}
            <div 
              className="h-full"
              style={{ width: `${(1 - designSplitRatio) * 100}%` }}
            >
              <DesignPanel 
                selectedElement={selectedElement}
                onStyleChange={handleStyleChange}
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Floating Inspection Prompt */}
      {inspectionPrompt?.show && (
        <div 
          className="fixed z-[100000] bg-card border border-border rounded-lg shadow-xl p-4 min-w-80 max-w-md"
          style={{
            left: inspectionPrompt.position.x - 160, // Center the prompt
            top: inspectionPrompt.position.y,
          }}
        >
          <div className="mb-3">
            <div className="text-sm font-medium text-foreground mb-1">Element Selected:</div>
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded font-mono">
              {inspectionPrompt.element}
            </div>
          </div>
          
          <div className="mb-3">
            <textarea
              value={promptMessage}
              onChange={(e) => setPromptMessage(e.target.value)}
              placeholder="What would you like to do with this element?"
              className="w-full h-20 p-2 border border-border rounded text-sm resize-none bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendInspectionMessage();
                }
                if (e.key === 'Escape') {
                  setInspectionPrompt(null);
                }
              }}
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setInspectionPrompt(null)}
              className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleSendInspectionMessage}
              disabled={!promptMessage.trim()}
              className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <Send size={14} />
              Queue Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
