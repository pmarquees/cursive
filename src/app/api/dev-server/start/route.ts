import { NextRequest, NextResponse } from 'next/server';
import { spawn, ChildProcess } from 'child_process';
import { join } from 'path';
import { existsSync } from 'fs';

// Store running processes globally
declare global {
  var runningProcesses: Map<string, ChildProcess> | undefined;
}

// Use global variable to persist across requests in development
if (!global.runningProcesses) {
  global.runningProcesses = new Map<string, ChildProcess>();
}

const runningProcesses = global.runningProcesses;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspacePath } = body;
    
    // Default to workspace directory if no path provided
    const projectPath = workspacePath || join(process.cwd(), 'workspace');
    
    console.log('Starting Next.js dev server for:', projectPath);
    
    // Check if package.json exists and has Next.js
    const packageJsonPath = join(projectPath, 'package.json');
    if (!existsSync(packageJsonPath)) {
      return NextResponse.json(
        { error: 'No package.json found in workspace' },
        { status: 400 }
      );
    }
    
    try {
      const packageJson = require(packageJsonPath);
      const hasNextJs = packageJson.dependencies?.next || packageJson.devDependencies?.next;
      
      if (!hasNextJs) {
        return NextResponse.json(
          { error: 'Next.js not found in dependencies' },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Error reading package.json' },
        { status: 400 }
      );
    }
    
    // Check if server is already running for this project
    if (runningProcesses.has(projectPath)) {
      return NextResponse.json(
        { error: 'Server already running for this project', url: 'http://localhost:3000' },
        { status: 400 }
      );
    }
    
    // Find available port (start with 3000)
    let port = 3000;
    
    // Start Next.js development server
    const child = spawn('npm', ['run', 'dev'], {
      cwd: projectPath,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: {
        ...process.env,
        PORT: port.toString(),
        NODE_ENV: 'development'
      }
    });
    
    // Store the process
    runningProcesses.set(projectPath, child);
    
    // Handle process events
    let serverReady = false;
    let serverUrl = '';
    
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        if (!serverReady) {
          child.kill();
          runningProcesses.delete(projectPath);
          resolve(NextResponse.json(
            { error: 'Server failed to start within timeout' },
            { status: 500 }
          ));
        }
      }, 30000); // 30 second timeout
      
      child.stdout?.on('data', (data) => {
        const output = data.toString();
        console.log('Next.js stdout:', output);
        
        // Look for server ready indicators
        if (output.includes('Ready') || output.includes('started server') || output.includes('Local:')) {
          if (!serverReady) {
            serverReady = true;
            serverUrl = `http://localhost:${port}`;
            clearTimeout(timeout);
            
            resolve(NextResponse.json({
              success: true,
              url: serverUrl,
              port: port,
              pid: child.pid
            }));
          }
        }
      });
      
      child.stderr?.on('data', (data) => {
        const output = data.toString();
        console.log('Next.js stderr:', output);
        
        // Handle port in use error
        if (output.includes('EADDRINUSE') || output.includes('port') || output.includes('address already in use')) {
          // Try next port
          port++;
          console.log(`Port ${port - 1} in use, trying port ${port}`);
          
          // Kill current process and try with new port
          child.kill();
          runningProcesses.delete(projectPath);
          
          if (port > 3010) { // Don't try too many ports
            clearTimeout(timeout);
            resolve(NextResponse.json(
              { error: 'No available ports found (tried 3000-3010)' },
              { status: 500 }
            ));
            return;
          }
          
          // Restart with new port
          const newChild = spawn('npm', ['run', 'dev'], {
            cwd: projectPath,
            stdio: ['ignore', 'pipe', 'pipe'],
            env: {
              ...process.env,
              PORT: port.toString(),
              NODE_ENV: 'development'
            }
          });
          
          runningProcesses.set(projectPath, newChild);
          
          newChild.stdout?.on('data', (data) => {
            const output = data.toString();
            console.log('Next.js stdout (retry):', output);
            
            if (output.includes('Ready') || output.includes('started server') || output.includes('Local:')) {
              if (!serverReady) {
                serverReady = true;
                serverUrl = `http://localhost:${port}`;
                clearTimeout(timeout);
                
                resolve(NextResponse.json({
                  success: true,
                  url: serverUrl,
                  port: port,
                  pid: newChild.pid
                }));
              }
            }
          });
          
          newChild.on('error', (error) => {
            console.error('Next.js process error (retry):', error);
            if (!serverReady) {
              clearTimeout(timeout);
              runningProcesses.delete(projectPath);
              resolve(NextResponse.json(
                { error: `Failed to start server: ${error.message}` },
                { status: 500 }
              ));
            }
          });
        }
      });
      
      child.on('error', (error) => {
        console.error('Next.js process error:', error);
        if (!serverReady) {
          clearTimeout(timeout);
          runningProcesses.delete(projectPath);
          resolve(NextResponse.json(
            { error: `Failed to start server: ${error.message}` },
            { status: 500 }
          ));
        }
      });
      
      child.on('exit', (code) => {
        console.log('Next.js process exited with code:', code);
        runningProcesses.delete(projectPath);
        if (!serverReady) {
          clearTimeout(timeout);
          resolve(NextResponse.json(
            { error: `Server exited with code ${code}` },
            { status: 500 }
          ));
        }
      });
    });
    
  } catch (error) {
    console.error('Error starting dev server:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}