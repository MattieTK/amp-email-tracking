import { NextRequest, NextResponse } from 'next/server';
import { createUser, createSend } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const userId = createUser();
    const sendId = createSend(userId);

    const { remoteDomain } = await request.json();

    // Generate the AMP carousel HTML
    const trackingPixels = Array.from({ length: 60 }, (_, i) => {
      const seconds = i + 1;
      return `
        <amp-img src="${remoteDomain}/api/pixel?sid=${sendId}&uid=${userId}&s=${seconds}" width="1" height="1"></amp-img>`;
    }).join('\n');

    const carouselHtml = `
      <amp-carousel id="tracking-carousel" type="slides" width="1" height="1" layout="responsive" autoplay delay="1000" style="opacity: 0;">
        ${trackingPixels}
      </amp-carousel>
    `;

    return NextResponse.json({
      userId,
      sendId,
      carouselHtml,
    });
  } catch (error) {
    console.error('Error creating tracking IDs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}