import { NextRequest, NextResponse } from 'next/server';
import { ChildProcess } from 'child_process';
import { join } from 'path';

// Use the same global runningProcesses Map as start/route.ts
declare global {
  var runningProcesses: Map<string, ChildProcess> | undefined;
}

const runningProcesses = global.runningProcesses || new Map<string, ChildProcess>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspacePath } = body;
    
    // Default to workspace directory if no path provided
    const projectPath = workspacePath || join(process.cwd(), 'workspace');
    
    console.log('Stopping Next.js dev server for:', projectPath);
    
    // Find the running process
    const process = runningProcesses.get(projectPath);
    
    if (!process) {
      return NextResponse.json(
        { error: 'No running server found for this project' },
        { status: 404 }
      );
    }
    
    try {
      // Kill the process
      process.kill('SIGTERM');
      
      // Give it a moment to terminate gracefully
      setTimeout(() => {
        if (!process.killed) {
          process.kill('SIGKILL');
        }
      }, 5000);
      
      // Remove from running processes
      runningProcesses.delete(projectPath);
      
      return NextResponse.json({
        success: true,
        message: 'Server stopped successfully'
      });
      
    } catch (error) {
      console.error('Error stopping process:', error);
      
      // Remove from map even if kill failed
      runningProcesses.delete(projectPath);
      
      return NextResponse.json(
        { error: 'Error stopping server, but removed from tracking' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Error stopping dev server:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return status of running servers
  const servers = Array.from(runningProcesses.entries()).map(([path, process]) => ({
    path,
    pid: process.pid,
    killed: process.killed
  }));
  
  return NextResponse.json({
    runningServers: servers
  });
}