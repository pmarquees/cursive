import { NextRequest, NextResponse } from 'next/server';
import { ChildProcess } from 'child_process';

// Access the global running processes
declare global {
  var runningProcesses: Map<string, ChildProcess> | undefined;
}

export async function GET(request: NextRequest) {
  try {
    const runningProcesses = global.runningProcesses || new Map();
    
    const servers: Array<{
      projectPath: string;
      projectName: string;
      pid: number;
      isAlive: boolean;
      port?: number;
      url?: string;
    }> = [];

    for (const [projectPath, process] of runningProcesses.entries()) {
      const projectName = projectPath.split('/').pop() || 'unknown';
      const isAlive = !process.killed && process.pid !== undefined;
      
      // Try to extract port from environment or assume default pattern
      let port: number | undefined;
      let url: string | undefined;
      
      // For our implementation, we know we start from port 9234
      if (isAlive) {
        // This is a simplification - in a real app you'd track this better
        const basePort = 9234;
        const entries = Array.from(runningProcesses.entries());
        const index = entries.findIndex(([path]) => path === projectPath);
        port = basePort + index;
        url = `http://localhost:${port}`;
      }

      servers.push({
        projectPath,
        projectName,
        pid: process.pid || 0,
        isAlive,
        port,
        url
      });
    }

    // Filter out dead processes
    const aliveServers = servers.filter(server => server.isAlive);
    
    // Clean up dead processes from the map
    for (const [projectPath, process] of runningProcesses.entries()) {
      if (process.killed || process.pid === undefined) {
        runningProcesses.delete(projectPath);
      }
    }

    return NextResponse.json({ 
      servers: aliveServers,
      total: aliveServers.length 
    });
  } catch (error) {
    console.error('Error listing dev servers:', error);
    return NextResponse.json(
      { error: 'Failed to list dev servers' },
      { status: 500 }
    );
  }
}