'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, ArrowRight, Settings, MessageSquare, X, File, Maximize2, Minimize2, Eye, Send } from 'lucide-react';
import { getWorkspaceMode } from '@/lib/fileApi';
import { getLocalFile } from '@/lib/localFileApi';

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
);

// Async function to process HTML content with local file reading capability
async function processHTMLForPreviewAsync(htmlContent: string, openFiles: {[key: string]: string}): Promise<string> {
  const workspaceMode = getWorkspaceMode();
  console.log('processHTMLForPreviewAsync: workspaceMode =', workspaceMode);
  console.log('processHTMLForPreviewAsync: openFiles keys =', Object.keys(openFiles));
  console.log('processHTMLForPreviewAsync: original HTML =', htmlContent.substring(0, 200));
  
  if (workspaceMode === 'remote') {
    console.log('processHTMLForPreviewAsync: Processing for remote mode');
    // Rewrite relative asset URLs to use workspace assets endpoint
    const processedHTML = htmlContent
      .replace(/href=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.css)["']/gm, 'href="/api/workspace-assets/$1"')
      .replace(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.js)["']/gm, 'src="/api/workspace-assets/$1"')
      .replace(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.(png|jpg|jpeg|gif|svg|ico))["']/gm, 'src="/api/workspace-assets/$1"');
    
    // Debug: show what we're replacing
    const cssMatches = htmlContent.match(/href=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.css)["']/gm);
    const jsMatches = htmlContent.match(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.js)["']/gm);
    console.log('processHTMLForPreviewAsync: CSS matches found:', cssMatches);
    console.log('processHTMLForPreviewAsync: JS matches found:', jsMatches);
    console.log('processHTMLForPreviewAsync: processed remote HTML =', processedHTML.substring(0, 400));
    return processedHTML;
  } else if (workspaceMode === 'local') {
    console.log('processHTMLForPreviewAsync: Processing for local mode');
    let processedHTML = htmlContent;
    
    // Find all CSS and JS files referenced in the HTML
    const cssMatches = htmlContent.match(/href=["']([^"']+\.css)["']/g) || [];
    const jsMatches = htmlContent.match(/src=["']([^"']+\.js)["']/g) || [];
    
    console.log('processHTMLForPreviewAsync: Found CSS references:', cssMatches);
    console.log('processHTMLForPreviewAsync: Found JS references:', jsMatches);
    
    // Process CSS files - try open files first, then read from local folder
    for (const match of cssMatches) {
      const cssFile = match.match(/href=["']([^"']+\.css)["']/)?.[1];
      if (!cssFile) continue;
      
      console.log('processHTMLForPreviewAsync: Processing CSS file:', cssFile);
      
      // First try to get from open files
      let cssContent = openFiles[cssFile];
      
      // If not in open files, try to read from local folder
      if (!cssContent) {
        try {
          console.log('processHTMLForPreviewAsync: Reading CSS from local folder:', cssFile);
          const localFile = await getLocalFile(cssFile);
          if (localFile.content) {
            cssContent = localFile.content;
            console.log('processHTMLForPreviewAsync: Successfully read CSS from local folder');
          }
        } catch (error) {
          console.warn(`processHTMLForPreviewAsync: Failed to read CSS file "${cssFile}" from local folder:`, error);
        }
      }
      
      if (cssContent) {
        console.log('processHTMLForPreviewAsync: Inlining CSS for:', cssFile);
        processedHTML = processedHTML.replace(
          new RegExp(`<link[^>]+rel=["']stylesheet["'][^>]*href=["']${cssFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'gi'),
          `<style>${cssContent}</style>`
        );
      } else {
        console.warn(`processHTMLForPreviewAsync: CSS file "${cssFile}" not found in open files or local folder`);
      }
    }
    
    // Process JS files - try open files first, then read from local folder
    for (const match of jsMatches) {
      const jsFile = match.match(/src=["']([^"']+\.js)["']/)?.[1];
      if (!jsFile) continue;
      
      console.log('processHTMLForPreviewAsync: Processing JS file:', jsFile);
      
      // First try to get from open files
      let jsContent = openFiles[jsFile];
      
      // If not in open files, try to read from local folder
      if (!jsContent) {
        try {
          console.log('processHTMLForPreviewAsync: Reading JS from local folder:', jsFile);
          const localFile = await getLocalFile(jsFile);
          if (localFile.content) {
            jsContent = localFile.content;
            console.log('processHTMLForPreviewAsync: Successfully read JS from local folder');
          }
        } catch (error) {
          console.warn(`processHTMLForPreviewAsync: Failed to read JS file "${jsFile}" from local folder:`, error);
        }
      }
      
      if (jsContent) {
        console.log('processHTMLForPreviewAsync: Inlining JS for:', jsFile);
        processedHTML = processedHTML.replace(
          new RegExp(`<script[^>]*src=["']${jsFile.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*><\/script>`, 'gi'),
          `<script>${jsContent}</script>`
        );
      } else {
        console.warn(`processHTMLForPreviewAsync: JS file "${jsFile}" not found in open files or local folder`);
      }
    }
    
    console.log('processHTMLForPreviewAsync: processed local HTML =', processedHTML.substring(0, 200));
    return processedHTML;
  }
  
  console.log('processHTMLForPreviewAsync: No processing, returning original HTML');
  return htmlContent;
}

// Fallback sync version for immediate display
function processHTMLForPreviewSync(htmlContent: string): string {
  const workspaceMode = getWorkspaceMode();
  
  if (workspaceMode === 'remote') {
    return htmlContent
      .replace(/href=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.css)["']/gm, 'href="/api/workspace-assets/$1"')
      .replace(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.js)["']/gm, 'src="/api/workspace-assets/$1"')
      .replace(/src=["'](?!https?:\/\/|\/\/|\/api\/)([^"']+\.(png|jpg|jpeg|gif|svg|ico))["']/gm, 'src="/api/workspace-assets/$1"');
  }
  
  return htmlContent;
}

interface EditorAreaProps {
  openFiles: {[key: string]: string};
  activeFile: string;
  onFileChange: (fileName: string, content: string) => void;
  onFileClose: (fileName: string) => void;
  onFileSelect: (fileName: string) => void;
  isPreviewFullscreen?: boolean;
  onTogglePreviewFullscreen?: () => void;
  onAddQueuedMessage?: (element: string, message: string) => void;
}

export function EditorArea({ openFiles, activeFile, onFileChange, onFileClose, onFileSelect, isPreviewFullscreen, onTogglePreviewFullscreen, onAddQueuedMessage }: EditorAreaProps) {
  const [activeView, setActiveView] = useState<'code' | 'preview' | 'split'>('code');
  const [isInspectionMode, setIsInspectionMode] = useState(false);
  const [inspectionPrompt, setInspectionPrompt] = useState<{
    element: string;
    position: { x: number; y: number };
    show: boolean;
  } | null>(null);
  const [promptMessage, setPromptMessage] = useState('');
  const [processedHTML, setProcessedHTML] = useState<string>('');

  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  const currentFileContent = openFiles[activeFile];
  const openFileNames = Object.keys(openFiles);

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

  // Process HTML when content changes or view changes to preview
  useEffect(() => {
    if (activeFile?.endsWith('.html') && currentFileContent && (activeView === 'preview' || activeView === 'split')) {
      // Start with sync version for immediate display
      const syncProcessed = processHTMLForPreviewSync(currentFileContent);
      setProcessedHTML(syncProcessed);
      
      // Then process async for better local file handling
      processHTMLForPreviewAsync(currentFileContent, openFiles)
        .then(processed => {
          setProcessedHTML(processed);
        })
        .catch(error => {
          console.error('Error processing HTML:', error);
        });
    } else {
      setProcessedHTML('');
    }
  }, [currentFileContent, openFiles, activeView, activeFile]);

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

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
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
          {openFileNames.map((fileName) => (
            <div
              key={fileName}
              className={`group max-w-[200px] py-1 flex items-center border-l border-border rounded-none px-3 text-xs h-full cursor-pointer ${
                activeFile === fileName 
                  ? 'bg-muted text-foreground' 
                  : 'hover:bg-muted/50 text-muted-foreground'
              }`}
              onClick={() => onFileSelect(fileName)}
            >
              <File size={14} className="mr-2 text-muted-foreground" />
              <span className="truncate max-w-[120px]">{fileName}</span>
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
          ))}
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

      {/* Editor Controls */}
      <div className="bg-muted flex w-full select-none items-center justify-between border-b border-border">
        <div className="px-4 py-2 flex items-center text-muted-foreground text-sm flex-grow truncate">
          <span className="text-muted-foreground">{activeFile || 'No file selected'}</span>
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
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden relative font-mono text-sm flex flex-col md:flex-row">
        {activeView === 'code' && (
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
        
        {activeView === 'preview' && (
          <div className="w-full h-full bg-white relative">
            {activeFile?.endsWith('.html') && currentFileContent ? (
              <>
                <iframe
                  ref={iframeRef}
                  srcDoc={processedHTML || currentFileContent}
                  className="w-full h-full border-none"
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
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Preview not available for this file type
              </div>
            )}
          </div>
        )}
        
        {activeView === 'split' && (
          <div className="flex w-full h-full">
            <div className="w-1/2 h-full">
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
            <div className="w-1/2 h-full border-l border-border bg-white relative">
              {activeFile?.endsWith('.html') && currentFileContent ? (
                <>
                  <iframe
                    ref={activeView === 'split' ? iframeRef : undefined}
                    srcDoc={processedHTML || currentFileContent}
                    className="w-full h-full border-none"
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
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Preview not available for this file type
                </div>
              )}
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
