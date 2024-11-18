import { NextRequest, NextResponse } from 'next/server';
import { recordView } from '@/lib/db';

// 1x1 transparent PNG
const TRANSPARENT_PIXEL = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64'
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sendId = searchParams.get('sid');
  const userId = searchParams.get('uid');
  const seconds = searchParams.get('s');

  if (!sendId || !userId || !seconds) {
    return new NextResponse('Missing parameters', { status: 400 });
  }

  try {
    recordView(sendId, userId, parseInt(seconds, 10));
    console.log(`Tracking event: User ${userId} viewed send ${sendId} at ${seconds}s`);

    return new NextResponse(TRANSPARENT_PIXEL, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Error recording view:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export const dynamic = "force-static";
export const revalidate = 0;