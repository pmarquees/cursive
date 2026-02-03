import fs from 'fs/promises';
import path from 'path';

const PROJECT_ROOT = process.cwd();
const WORKSPACE_DIR = path.join(PROJECT_ROOT, 'workspace');

export type PackageScripts = {
  cwd: string;
  packageJsonPath: string | null;
  scripts: Record<string, string>;
};

export function isProductionEnvironment() {
  return process.env.VERCEL || process.env.NODE_ENV === 'production';
}

export async function workspaceHasPackageJson(): Promise<boolean> {
  try {
    await fs.access(path.join(WORKSPACE_DIR, 'package.json'));
    return true;
  } catch {
    return false;
  }
}

export async function ensureWorkspaceDir(): Promise<void> {
  try {
    await fs.mkdir(WORKSPACE_DIR, { recursive: true });
  } catch {
    // ignore
  }
}

export async function getDefaultCwd(): Promise<string> {
  await ensureWorkspaceDir();
  return WORKSPACE_DIR;
}

export async function resolveCwd(
  cwd?: string,
  options?: { allowOutside?: boolean }
): Promise<string> {
  if (!cwd) {
    return getDefaultCwd();
  }

  const allowOutside = options?.allowOutside ?? false;
  const resolved = path.isAbsolute(cwd) ? path.normalize(cwd) : path.resolve(PROJECT_ROOT, cwd);

  if (!allowOutside && !resolved.startsWith(PROJECT_ROOT)) {
    throw new Error('Invalid working directory');
  }

  try {
    const stat = await fs.stat(resolved);
    if (!stat.isDirectory()) {
      throw new Error('Working directory is not a folder');
    }
  } catch {
    throw new Error('Working directory not found');
  }

  return resolved;
}

export function parseCommand(input: string): { cmd: string; args: string[] } {
  const trimmed = input.trim();
  if (!trimmed) {
    throw new Error('Command is empty');
  }

  const args: string[] = [];
  let current = '';
  let quote: '"' | "'" | null = null;
  let escape = false;

  for (let i = 0; i < trimmed.length; i += 1) {
    const ch = trimmed[i];

    if (!quote && (ch === '|' || ch === ';' || ch === '&' || ch === '<' || ch === '>')) {
      throw new Error('Shell operators are not supported in this terminal runner');
    }

    if (escape) {
      current += ch;
      escape = false;
      continue;
    }

    if (ch === '\\' && quote !== "'") {
      escape = true;
      continue;
    }

    if (ch === '"' || ch === "'") {
      if (quote === ch) {
        quote = null;
        continue;
      }
      if (!quote) {
        quote = ch;
        continue;
      }
    }

    if (!quote && /\s/.test(ch)) {
      if (current) {
        args.push(current);
        current = '';
      }
      continue;
    }

    current += ch;
  }

  if (current) {
    args.push(current);
  }

  if (args.length === 0) {
    throw new Error('Command is empty');
  }

  const [cmd, ...rest] = args;
  return { cmd, args: rest };
}

const ALLOWED_COMMANDS = new Set([
  'npm',
  'pnpm',
  'yarn',
  'npx',
  'node',
  'bun',
  'deno',
  'python',
  'python3',
  'pytest',
  'eslint',
  'tsc',
  'vitest',
  'jest'
]);

export function isCommandAllowed(cmd: string): boolean {
  return ALLOWED_COMMANDS.has(cmd);
}

export async function readPackageScripts(cwd?: string): Promise<PackageScripts> {
  const workspacePackage = path.join(WORKSPACE_DIR, 'package.json');
  const projectPackage = path.join(PROJECT_ROOT, 'package.json');

  const readScripts = async (packagePath: string): Promise<Record<string, string> | null> => {
    try {
      const raw = await fs.readFile(packagePath, 'utf-8');
      const json = JSON.parse(raw) as { scripts?: Record<string, string> };
      return json.scripts ?? {};
    } catch {
      return null;
    }
  };

  if (cwd) {
    const resolved = await resolveCwd(cwd, { allowOutside: true });
    const packagePath = path.join(resolved, 'package.json');
    const scripts = await readScripts(packagePath);
    return {
      cwd: resolved,
      packageJsonPath: scripts ? packagePath : null,
      scripts: scripts ?? {}
    };
  }

  const workspaceScripts = await readScripts(workspacePackage);
  if (workspaceScripts) {
    return {
      cwd: WORKSPACE_DIR,
      packageJsonPath: workspacePackage,
      scripts: workspaceScripts
    };
  }

  const projectScripts = await readScripts(projectPackage);
  return {
    cwd: PROJECT_ROOT,
    packageJsonPath: projectScripts ? projectPackage : null,
    scripts: projectScripts ?? {}
  };
}

export function getWorkspaceDir(): string {
  return WORKSPACE_DIR;
}

export function getProjectRoot(): string {
  return PROJECT_ROOT;
}
