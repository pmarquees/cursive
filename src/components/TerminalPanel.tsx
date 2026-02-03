'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bug, ListChecks, Play, Square, Terminal, Trash2, X } from 'lucide-react';
import { getLocalFolderLabel, getLocalFolderPath, isLocalFolderMode, setLocalFolderPath } from '@/lib/fileApi';

interface TaskInfo {
  cwd: string;
  packageJsonPath: string | null;
  scripts: Record<string, string>;
}

interface TerminalPanelProps {
  onClose: () => void;
}

type TerminalTab = 'terminal' | 'tasks' | 'debug';

type RunOptions = {
  cwd?: string;
  env?: Record<string, string>;
};

export function TerminalPanel({ onClose }: TerminalPanelProps) {
  const [activeTab, setActiveTab] = useState<TerminalTab>('terminal');
  const [commandInput, setCommandInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [activePid, setActivePid] = useState<number | null>(null);
  const [taskInfo, setTaskInfo] = useState<TaskInfo | null>(null);
  const [tasksError, setTasksError] = useState<string | null>(null);
  const [debugPort, setDebugPort] = useState(9229);
  const [debugScript, setDebugScript] = useState<string>('');
  const [panelHeight, setPanelHeight] = useState(240);
  const [isResizing, setIsResizing] = useState(false);
  const [terminalCwd, setTerminalCwd] = useState(() => getLocalFolderPath());
  const outputEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const loadTasks = useCallback(async () => {
    try {
      setTasksError(null);
      const params = new URLSearchParams();
      if (isLocalFolderMode()) {
        const localCwd = terminalCwd || getLocalFolderPath();
        if (localCwd) {
          params.set('cwd', localCwd);
        }
      }
      const response = await fetch(`/api/terminal/tasks${params.toString() ? `?${params.toString()}` : ''}`);
      if (!response.ok) {
        throw new Error(await response.text());
      }
      const data = (await response.json()) as TaskInfo;
      setTaskInfo(data);
      const scriptNames = Object.keys(data.scripts ?? {});
      if (scriptNames.includes('dev')) {
        setDebugScript('dev');
      } else if (scriptNames.includes('start')) {
        setDebugScript('start');
      } else {
        setDebugScript(scriptNames[0] ?? '');
      }
    } catch (error) {
      setTasksError(error instanceof Error ? error.message : 'Failed to load tasks');
    }
  }, [terminalCwd]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    if (!isLocalFolderMode()) return;
    const stored = getLocalFolderPath();
    if (stored && stored !== terminalCwd) {
      setTerminalCwd(stored);
    }
  }, [terminalCwd]);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [output]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      const panel = panelRef.current;
      if (!panel) return;
      const rect = panel.getBoundingClientRect();
      const nextHeight = rect.bottom - event.clientY;
      const minHeight = 180;
      const maxHeight = Math.min(window.innerHeight * 0.8, rect.bottom - 80);
      const clamped = Math.max(minHeight, Math.min(maxHeight, nextHeight));
      setPanelHeight(clamped);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing]);

  const appendOutput = useCallback((text: string) => {
    setOutput((prev) => {
      const next = prev + text;
      if (next.length > 200000) {
        return next.slice(-200000);
      }
      return next;
    });
  }, []);

  const handleStreamLine = useCallback(
    (line: string) => {
      if (!line) {
        appendOutput('\n');
        return;
      }
      if (line.startsWith('__META__')) {
        try {
          const meta = JSON.parse(line.replace('__META__', '')) as { pid?: number };
          if (meta.pid) {
            setActivePid(meta.pid);
          }
        } catch {
          appendOutput(`${line}\n`);
        }
        return;
      }
      if (line.startsWith('__EXIT__')) {
        try {
          const meta = JSON.parse(line.replace('__EXIT__', '')) as { code?: number; signal?: string };
          appendOutput(`\n[process exited with code ${meta.code ?? 'unknown'}${meta.signal ? `, signal ${meta.signal}` : ''}]\n`);
        } catch {
          appendOutput(`${line}\n`);
        }
        return;
      }
      if (line.startsWith('__ERROR__')) {
        appendOutput(`\n${line.replace('__ERROR__', '[error] ')}\n`);
        return;
      }
      appendOutput(`${line}\n`);
    },
    [appendOutput]
  );

  const runCommand = useCallback(
    async (command: string, options?: RunOptions) => {
      if (!command.trim()) return;
      if (isRunning) return;

      const effectiveCwd = options?.cwd ?? (isLocalFolderMode() ? (terminalCwd || getLocalFolderPath()) : undefined);
      setIsRunning(true);
      appendOutput(`\n$ ${command}\n`);

      try {
        const response = await fetch('/api/terminal/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            command,
            cwd: effectiveCwd,
            env: options?.env
          })
        });

        if (!response.ok || !response.body) {
          appendOutput(`${await response.text()}\n`);
          setIsRunning(false);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          lines.forEach(handleStreamLine);
        }

        if (buffer.trim()) {
          handleStreamLine(buffer.trim());
        }
      } catch (error) {
        appendOutput(`\n[error] ${error instanceof Error ? error.message : 'Command failed'}\n`);
      } finally {
        setIsRunning(false);
        setActivePid(null);
      }
    },
    [appendOutput, handleStreamLine, isRunning]
  );

  const stopActiveProcess = useCallback(async () => {
    if (!activePid) return;
    try {
      await fetch('/api/terminal/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pid: activePid })
      });
      appendOutput(`\n[stopped pid ${activePid}]\n`);
    } catch (error) {
      appendOutput(`\n[error] Failed to stop process ${activePid}\n`);
    }
  }, [activePid, appendOutput]);

  const scripts = taskInfo?.scripts ?? {};
  const scriptEntries = useMemo(() => Object.entries(scripts), [scripts]);

  const runScript = (scriptName: string, env?: Record<string, string>) => {
    if (!taskInfo) return;
    const effectiveCwd = isLocalFolderMode() ? (terminalCwd || getLocalFolderPath()) : taskInfo.cwd;
    runCommand(`npm run ${scriptName}`, { cwd: effectiveCwd, env });
  };

  const quickRunScript = scripts.dev ? 'dev' : scripts.start ? 'start' : '';

  return (
    <div
      ref={panelRef}
      className="bg-card border-t border-border flex flex-col relative"
      style={{ height: `${panelHeight}px` }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 cursor-row-resize z-10 bg-border/40 hover:bg-primary/40"
        onMouseDown={() => setIsResizing(true)}
        onDoubleClick={() => setPanelHeight(240)}
      />
      <div className="flex items-center justify-between px-3 h-9 border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium">Terminal</span>
          {taskInfo?.packageJsonPath && (
            <span className="text-[10px] text-muted-foreground">
              {taskInfo.packageJsonPath.split('/').slice(-2).join('/')}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            className={`h-7 px-2 text-xs rounded-md border ${activeTab === 'terminal' ? 'bg-muted border-border' : 'border-transparent text-muted-foreground hover:bg-muted'}`}
            onClick={() => setActiveTab('terminal')}
          >
            <Terminal size={12} className="mr-1 inline" />
            Terminal
          </button>
          <button
            className={`h-7 px-2 text-xs rounded-md border ${activeTab === 'tasks' ? 'bg-muted border-border' : 'border-transparent text-muted-foreground hover:bg-muted'}`}
            onClick={() => setActiveTab('tasks')}
          >
            <ListChecks size={12} className="mr-1 inline" />
            Tasks
          </button>
          <button
            className={`h-7 px-2 text-xs rounded-md border ${activeTab === 'debug' ? 'bg-muted border-border' : 'border-transparent text-muted-foreground hover:bg-muted'}`}
            onClick={() => setActiveTab('debug')}
          >
            <Bug size={12} className="mr-1 inline" />
            Debug
          </button>
          <button
            className="ml-2 size-7 inline-flex items-center justify-center text-muted-foreground hover:text-foreground"
            onClick={onClose}
            title="Close terminal"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {activeTab === 'terminal' && (
          <div className="flex flex-1 flex-col">
            {isLocalFolderMode() && (
              <div className="px-3 pt-2 pb-1 text-[11px] text-muted-foreground border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="uppercase text-[10px]">Local Mode</span>
                  <span className="truncate">Folder: {getLocalFolderLabel()}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    className="flex-1 h-7 rounded-md border border-border bg-background px-2 text-[11px] font-mono"
                    placeholder="Local folder path for terminal"
                    value={terminalCwd}
                    onChange={(e) => setTerminalCwd(e.target.value)}
                    onBlur={() => {
                      const trimmed = terminalCwd.trim();
                      setTerminalCwd(trimmed);
                      setLocalFolderPath(trimmed);
                      loadTasks();
                    }}
                  />
                  {(window as unknown as { electronAPI?: { selectDirectory?: () => Promise<string | null> } }).electronAPI?.selectDirectory && (
                    <button
                      className="h-7 px-2 text-[11px] rounded-md border border-border text-muted-foreground hover:text-foreground"
                      onClick={async () => {
                        const api = (window as unknown as { electronAPI?: { selectDirectory?: () => Promise<string | null> } }).electronAPI;
                        if (!api?.selectDirectory) return;
                        const selected = await api.selectDirectory();
                        if (!selected) return;
                        setTerminalCwd(selected);
                        setLocalFolderPath(selected);
                        loadTasks();
                      }}
                    >
                      Pick
                    </button>
                  )}
                  <button
                    className="h-7 px-2 text-[11px] rounded-md border border-border text-muted-foreground hover:text-foreground"
                    onClick={() => {
                      setTerminalCwd('');
                      setLocalFolderPath('');
                      loadTasks();
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
            <div className="flex-1 overflow-auto bg-background px-3 py-2 font-mono text-xs text-foreground">
              <pre className="whitespace-pre-wrap">{output}</pre>
              <div ref={outputEndRef} />
            </div>
            <div className="border-t border-border px-3 py-2 flex items-center gap-2">
              <input
                className="flex-1 h-8 rounded-md border border-border bg-background px-2 text-xs font-mono"
                placeholder="Run a command"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    runCommand(commandInput);
                  }
                }}
                disabled={isRunning}
              />
              <button
                className="h-8 px-2 text-xs rounded-md bg-primary text-primary-foreground disabled:opacity-50"
                onClick={() => runCommand(commandInput)}
                disabled={isRunning || !commandInput.trim()}
              >
                <Play size={12} className="mr-1 inline" />
                Run
              </button>
              <button
                className="h-8 px-2 text-xs rounded-md border border-border text-muted-foreground hover:text-foreground disabled:opacity-50"
                onClick={stopActiveProcess}
                disabled={!activePid}
              >
                <Square size={12} className="mr-1 inline" />
                Stop
              </button>
              <button
                className="h-8 px-2 text-xs rounded-md border border-border text-muted-foreground hover:text-foreground"
                onClick={() => setOutput('')}
              >
                <Trash2 size={12} className="mr-1 inline" />
                Clear
              </button>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="flex-1 overflow-auto p-3 text-xs">
            {isLocalFolderMode() && (
              <div className="mb-3 text-[11px] text-muted-foreground">
                Tasks running in: {terminalCwd || getLocalFolderPath() || getLocalFolderLabel()}
              </div>
            )}
            {tasksError && (
              <div className="text-red-500">{tasksError}</div>
            )}
            {!tasksError && taskInfo && (
              <>
                <div className="mb-3">
                  <div className="text-muted-foreground mb-1">Quick actions</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className="h-8 px-2 text-xs rounded-md border border-border disabled:opacity-50"
                      onClick={() => runScript('build')}
                      disabled={!scripts.build}
                    >
                      Build
                    </button>
                    <button
                      className="h-8 px-2 text-xs rounded-md border border-border disabled:opacity-50"
                      onClick={() => runScript('lint')}
                      disabled={!scripts.lint}
                    >
                      Lint
                    </button>
                    <button
                      className="h-8 px-2 text-xs rounded-md border border-border disabled:opacity-50"
                      onClick={() => runScript('test')}
                      disabled={!scripts.test}
                    >
                      Test
                    </button>
                    <button
                      className="h-8 px-2 text-xs rounded-md border border-border disabled:opacity-50"
                      onClick={() => runScript(quickRunScript)}
                      disabled={!quickRunScript}
                    >
                      Run
                    </button>
                  </div>
                </div>

                <div className="text-muted-foreground mb-1">Available scripts</div>
                {scriptEntries.length === 0 && (
                  <div className="text-muted-foreground">No npm scripts found.</div>
                )}
                <div className="space-y-2">
                  {scriptEntries.map(([name, script]) => (
                    <div key={name} className="flex items-center justify-between gap-2 rounded-md border border-border px-2 py-1">
                      <div>
                        <div className="font-medium">{name}</div>
                        <div className="text-muted-foreground font-mono text-[10px]">{script}</div>
                      </div>
                      <button
                        className="h-7 px-2 text-xs rounded-md bg-primary text-primary-foreground"
                        onClick={() => runScript(name)}
                      >
                        Run
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'debug' && (
          <div className="flex-1 overflow-auto p-3 text-xs">
            <div className="mb-2 text-muted-foreground">Debugger</div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Script</label>
                <select
                  className="w-full h-8 rounded-md border border-border bg-background px-2"
                  value={debugScript}
                  onChange={(e) => setDebugScript(e.target.value)}
                >
                  {scriptEntries.map(([name]) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                  {scriptEntries.length === 0 && (
                    <option value="">No scripts available</option>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-xs text-muted-foreground mb-1">Inspector port</label>
                <input
                  type="number"
                  className="w-full h-8 rounded-md border border-border bg-background px-2"
                  value={debugPort}
                  onChange={(e) => setDebugPort(Number(e.target.value))}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="h-8 px-3 text-xs rounded-md bg-primary text-primary-foreground disabled:opacity-50"
                  onClick={() => runScript(debugScript, { NODE_OPTIONS: `--inspect=0.0.0.0:${debugPort}` })}
                  disabled={!debugScript}
                >
                  Start Debug
                </button>
                <button
                  className="h-8 px-3 text-xs rounded-md border border-border disabled:opacity-50"
                  onClick={stopActiveProcess}
                  disabled={!activePid}
                >
                  Stop
                </button>
              </div>
              <div className="text-[11px] text-muted-foreground">
                This runs the selected script with Node inspector enabled on port {debugPort}. Attach with Chrome DevTools or your debugger client.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
