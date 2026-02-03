import { NextRequest } from 'next/server';
import { stopProcess } from '@/lib/terminalManager';
import { isProductionEnvironment } from '@/lib/terminalCore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  if (isProductionEnvironment()) {
    return new Response('Terminal is not available in production.', { status: 403 });
  }

  try {
    const { pid } = await request.json();
    if (!pid || typeof pid !== 'number') {
      return new Response('pid is required.', { status: 400 });
    }

    const stopped = stopProcess(pid);
    return Response.json({ success: stopped });
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : 'Failed to stop process.',
      { status: 500 }
    );
  }
}
