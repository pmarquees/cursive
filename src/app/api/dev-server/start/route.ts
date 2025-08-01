import { NextRequest, NextResponse } from 'next/server';
import { spawn, ChildProcess } from 'child_process';
import { join } from 'path';
import { existsSync, readFileSync } from 'fs';

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

    // Check if node_modules exists, install dependencies if not
    const nodeModulesPath = join(projectPath, 'node_modules');
    if (!existsSync(nodeModulesPath)) {
      console.log('Dependencies not found, installing...');
      
      try {
        await new Promise<void>((resolve, reject) => {
          const installProcess = spawn('npm', ['install'], {
            cwd: projectPath,
            stdio: ['ignore', 'pipe', 'pipe']
          });

          let installOutput = '';
          let installError = '';

          installProcess.stdout?.on('data', (data) => {
            const output = data.toString();
            installOutput += output;
            console.log('npm install stdout:', output);
          });

          installProcess.stderr?.on('data', (data) => {
            const output = data.toString();
            installError += output;
            console.error('npm install stderr:', output);
          });

          installProcess.on('close', (code) => {
            if (code === 0) {
              console.log('Dependencies installed successfully');
              resolve();
            } else {
              console.error('npm install failed with code:', code);
              console.error('Install output:', installOutput);
              console.error('Install error:', installError);
              reject(new Error(`npm install failed with code ${code}: ${installError || installOutput}`));
            }
          });

          installProcess.on('error', (error) => {
            console.error('npm install process error:', error);
            reject(error);
          });
        });
      } catch (error) {
        return NextResponse.json(
          { error: `Failed to install dependencies: ${error instanceof Error ? error.message : 'Unknown error'}` },
          { status: 500 }
        );
      }
    }
    
    try {
      const packageJsonContent = readFileSync(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(packageJsonContent);
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
        { error: 'Server already running for this project', url: 'http://localhost:9234' },
        { status: 400 }
      );
    }
    
    // Find available port (start with 9234 to avoid common dev server conflicts)
    let port = 9234;
    
    // Start Next.js development server
    console.log(`Starting Next.js dev server on port ${port} in directory: ${projectPath}`);
    const child = spawn('npm', ['run', 'dev'], {
      cwd: projectPath,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: {
        ...process.env,
        PORT: port.toString(),
        NODE_ENV: 'development'
      }
    });

    if (!child.pid) {
      return NextResponse.json(
        { error: 'Failed to spawn development server process' },
        { status: 500 }
      );
    }
    
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
        console.error('Next.js stderr:', output);
        
        // Check for fatal errors that cause immediate exit
        if (output.includes('Error:') || output.includes('Cannot find module') || output.includes('MODULE_NOT_FOUND')) {
          console.error('Fatal error detected in Next.js stderr:', output);
          if (!serverReady) {
            clearTimeout(timeout);
            runningProcesses.delete(projectPath);
            resolve(NextResponse.json(
              { error: `Server failed to start: ${output.trim()}` },
              { status: 500 }
            ));
            return;
          }
        }
        
        // Handle port in use error
        if (output.includes('EADDRINUSE') || output.includes('port') || output.includes('address already in use')) {
          // Try next port
          port++;
          console.log(`Port ${port - 1} in use, trying port ${port}`);
          
          // Kill current process and try with new port
          child.kill();
          runningProcesses.delete(projectPath);
          
          if (port > 9244) { // Don't try too many ports (9234-9244)
            clearTimeout(timeout);
            resolve(NextResponse.json(
              { error: 'No available ports found (tried 9234-9244)' },
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
      
      child.on('exit', (code, signal) => {
        console.log(`Next.js process exited with code: ${code}, signal: ${signal}`);
        console.log(`Server was ready: ${serverReady}`);
        runningProcesses.delete(projectPath);
        if (!serverReady) {
          clearTimeout(timeout);
          resolve(NextResponse.json(
            { error: `Server exited with code ${code}${signal ? ` (signal: ${signal})` : ''}. Check server logs for details.` },
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