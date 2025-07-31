import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const name = searchParams.get('name') || 'World'
  
  return NextResponse.json({
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    method: 'GET',
    url: request.url
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  return NextResponse.json({
    message: 'Hello from POST endpoint!',
    received: body,
    timestamp: new Date().toISOString(),
    method: 'POST'
  })
}