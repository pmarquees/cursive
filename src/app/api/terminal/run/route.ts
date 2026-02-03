import { NextRequest } from 'next/server';
import { startProcess, stopProcess } from '@/lib/terminalManager';
import { isProductionEnvironment, resolveCwd } from '@/lib/terminalCore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60; // seconds

export async function POST(request: NextRequest) {
  if (isProductionEnvironment()) {
    return new Response('Terminal is not available in production.', { status: 403 });
  }

  try {
    const { command, cwd, env } = await request.json();

    if (!command || typeof command !== 'string') {
      return new Response('Command is required.', { status: 400 });
    }

    const resolvedCwd = await resolveCwd(cwd, { allowOutside: true });
    const proc = startProcess(command, [], {
      cwd: resolvedCwd,
      env: {
        ...process.env,
        ...(env && typeof env === 'object' ? env : {}),
        FORCE_COLOR: '1'
      },
      shell: true
    });

    if (!proc.pid) {
      return new Response('Failed to start process.', { status: 500 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(`__META__${JSON.stringify({ pid: proc.pid, cwd: resolvedCwd })}\n`)
        );

        proc.stdout.setEncoding('utf8');
        proc.stderr.setEncoding('utf8');

        proc.stdout.on('data', (chunk: string) => {
          controller.enqueue(encoder.encode(chunk));
        });

        proc.stderr.on('data', (chunk: string) => {
          controller.enqueue(encoder.encode(chunk));
        });

        proc.on('close', (code, signal) => {
          controller.enqueue(
            encoder.encode(`\n__EXIT__${JSON.stringify({ code, signal })}\n`)
          );
          controller.close();
        });

        proc.on('error', (error) => {
          controller.enqueue(encoder.encode(`\n__ERROR__${error.message}\n`));
          controller.close();
        });
      },
      cancel() {
        stopProcess(proc.pid as number);
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : 'Terminal execution failed.',
      { status: 500 }
    );
  }
}
