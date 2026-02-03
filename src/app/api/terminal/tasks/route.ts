import { isProductionEnvironment, readPackageScripts } from '@/lib/terminalCore';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (isProductionEnvironment()) {
    return new Response('Tasks are not available in production.', { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const cwd = searchParams.get('cwd') || undefined;
    const data = await readPackageScripts(cwd);
    return Response.json(data);
  } catch (error) {
    return new Response(
      error instanceof Error ? error.message : 'Failed to load tasks.',
      { status: 500 }
    );
  }
}
