import { NextRequest, NextResponse } from 'next/server';
import { getViewingStats } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sendId = searchParams.get('sid');

  if (!sendId) {
    return NextResponse.json({ error: 'Missing send ID' }, { status: 400 });
  }

  try {
    const stats = getViewingStats(sendId);
    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}