'use client';

// Lightweight wrapper around the File System Access API

export type DirectoryHandle = FileSystemDirectoryHandle;
export type FileHandle = FileSystemFileHandle;

let connectedDirectoryHandle: DirectoryHandle | null = null;

export function isFileSystemAccessSupported(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

export function getConnectedDirectoryHandle(): DirectoryHandle | null {
  return connectedDirectoryHandle;
}

export async function connectDirectory(): Promise<{ handle: DirectoryHandle; name: string }> {
  if (!isFileSystemAccessSupported()) {
    throw new Error('File System Access API is not supported in this browser');
  }
  const handle = await (window as unknown as { showDirectoryPicker: () => Promise<DirectoryHandle> }).showDirectoryPicker();
  // Request readwrite permission up front
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const perm: any = await (handle as unknown as { requestPermission: (opts: { mode: 'read' | 'readwrite' }) => Promise<string> }).requestPermission({ mode: 'readwrite' });
  if (perm !== 'granted') {
    throw new Error('Permission to access the selected folder was not granted');
  }
  connectedDirectoryHandle = handle;
  return { handle, name: (handle as unknown as { name?: string }).name || 'Local' };
}

export function disconnectDirectory(): void {
  connectedDirectoryHandle = null;
}

export async function ensurePermission(dir: DirectoryHandle, mode: 'read' | 'readwrite' = 'readwrite'): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = await (dir as unknown as { queryPermission: (opts: { mode: 'read' | 'readwrite' }) => Promise<string> }).queryPermission({ mode });
  if (query === 'granted') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const req: any = await (dir as unknown as { requestPermission: (opts: { mode: 'read' | 'readwrite' }) => Promise<string> }).requestPermission({ mode });
  if (req !== 'granted') {
    throw new Error('Permission not granted');
  }
}

async function getEntryHandleFromPath(dir: DirectoryHandle, path: string): Promise<FileSystemHandle | null> {
  const segments = path.split('/').filter(Boolean);
  let current: FileSystemDirectoryHandle | FileSystemFileHandle | null = dir;
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    if (!current) return null;
    if ('getDirectoryHandle' in current) {
      const isLast = i === segments.length - 1;
      try {
        // Try file first if last
        if (isLast) {
          try {
            // Casting for File System Access API
            const fh = await (current as unknown as { getFileHandle: (name: string) => Promise<FileSystemFileHandle> }).getFileHandle(segment);
            return fh;
          } catch {
            const dh = await (current as unknown as { getDirectoryHandle: (name: string) => Promise<FileSystemDirectoryHandle> }).getDirectoryHandle(segment);
            current = dh as unknown as FileSystemDirectoryHandle;
          }
        } else {
          const dh = await (current as unknown as { getDirectoryHandle: (name: string) => Promise<FileSystemDirectoryHandle> }).getDirectoryHandle(segment);
          current = dh as unknown as FileSystemDirectoryHandle;
        }
      } catch {
        return null;
      }
    }
  }
  return current as FileSystemHandle;
}

async function getParentDirectoryAndBasename(dir: DirectoryHandle, path: string, createIntermediate = false): Promise<{ parent: DirectoryHandle; base: string } | null> {
  const segments = path.split('/').filter(Boolean);
  const base = segments.pop();
  if (!base) return null;
  let parent: DirectoryHandle = dir;
  for (const segment of segments) {
    try {
      parent = await (parent as unknown as { getDirectoryHandle: (name: string, opts?: { create?: boolean }) => Promise<DirectoryHandle> }).getDirectoryHandle(segment, { create: createIntermediate });
    } catch {
      return null;
    }
  }
  return { parent, base };
}

export interface ListedItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  content?: string;
}

export async function listAll(dir: DirectoryHandle): Promise<ListedItem[]> {
  await ensurePermission(dir, 'read');
  const results: ListedItem[] = [];

  async function walk(currentDir: DirectoryHandle, prefix: string) {
    for await (const [name, handle] of (currentDir as unknown as { entries: () => AsyncIterable<[string, FileSystemHandle]> }).entries()) {
      const relPath = prefix ? `${prefix}/${name}` : name;
      if (handle.kind === 'directory') {
        results.push({ name, path: relPath, type: 'directory' });
        await walk(handle as FileSystemDirectoryHandle, relPath);
      } else {
        const file = await (handle as FileSystemFileHandle).getFile();
        const text = await file.text();
        results.push({ name, path: relPath, type: 'file', content: text });
      }
    }
  }

  await walk(dir, '');
  return results;
}

export async function readFile(dir: DirectoryHandle, path: string): Promise<string> {
  await ensurePermission(dir, 'read');
  const h = await getEntryHandleFromPath(dir, path);
  if (!h || h.kind !== 'file') throw new Error('File not found');
  const file = await (h as FileSystemFileHandle).getFile();
  return await file.text();
}

export async function writeFile(dir: DirectoryHandle, path: string, content: string): Promise<void> {
  await ensurePermission(dir, 'readwrite');
  const parentAndBase = await getParentDirectoryAndBasename(dir, path, true);
  if (!parentAndBase) throw new Error('Invalid path');
  const { parent, base } = parentAndBase;
  const fileHandle: FileSystemFileHandle = await (parent as unknown as { getFileHandle: (name: string, opts?: { create?: boolean }) => Promise<FileSystemFileHandle> }).getFileHandle(base, { create: true });
  const writable = await (fileHandle as unknown as { createWritable: () => Promise<{ write: (c: string) => Promise<void>; close: () => Promise<void> }> }).createWritable();
  await writable.write(content);
  await writable.close();
}

export async function createEntry(dir: DirectoryHandle, path: string, type: 'file' | 'directory', content = ''): Promise<void> {
  if (type === 'directory') {
    await ensurePermission(dir, 'readwrite');
    const parentAndBase = await getParentDirectoryAndBasename(dir, path, true);
    if (!parentAndBase) throw new Error('Invalid path');
    const { parent, base } = parentAndBase;
    await (parent as unknown as { getDirectoryHandle: (name: string, opts?: { create?: boolean }) => Promise<DirectoryHandle> }).getDirectoryHandle(base, { create: true });
  } else {
    await writeFile(dir, path, content);
  }
}

export async function deleteEntry(dir: DirectoryHandle, path: string): Promise<void> {
  await ensurePermission(dir, 'readwrite');
  const parentAndBase = await getParentDirectoryAndBasename(dir, path, false);
  if (!parentAndBase) throw new Error('Invalid path');
  const { parent, base } = parentAndBase;
  await (parent as unknown as { removeEntry: (name: string, opts?: { recursive?: boolean }) => Promise<void> }).removeEntry(base, { recursive: true });
}


