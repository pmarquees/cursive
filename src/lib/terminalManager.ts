import { spawn, type ChildProcessWithoutNullStreams } from 'child_process';

type StartOptions = {
  cwd: string;
  env?: NodeJS.ProcessEnv;
  shell?: boolean;
};

const processes = new Map<number, ChildProcessWithoutNullStreams>();

export function startProcess(command: string, args: string[] = [], options: StartOptions): ChildProcessWithoutNullStreams {
  const proc = spawn(command, args, {
    cwd: options.cwd,
    env: options.env,
    shell: options.shell ?? false,
    stdio: 'pipe'
  });

  if (proc.pid) {
    processes.set(proc.pid, proc);
    proc.on('exit', () => {
      processes.delete(proc.pid as number);
    });
  }

  return proc;
}

export function stopProcess(pid: number): boolean {
  const proc = processes.get(pid);
  if (!proc) return false;

  proc.kill('SIGTERM');
  const timeout = setTimeout(() => {
    try {
      proc.kill('SIGKILL');
    } catch {
      // ignore
    }
  }, 2000);

  proc.on('exit', () => clearTimeout(timeout));
  return true;
}

export function hasProcess(pid: number): boolean {
  return processes.has(pid);
}
