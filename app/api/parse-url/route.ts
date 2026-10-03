import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  if (!url || typeof url !== 'string') {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  const property: Record<string, any> = {};

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-IN,en;q=0.9',
        Referer: 'https://www.google.com',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Could not fetch URL: HTTP ${response.status}` },
        { status: 422 }
      );
    }

    const html = await response.text();

    // Try JSON-LD schema first
    const jsonLdMatches = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
    if (jsonLdMatches) {
      for (const block of jsonLdMatches) {
        try {
          const jsonContent = block.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
          const data = JSON.parse(jsonContent);
          if (data.name) property.name = data.name;
          if (data.price) property.price = parseFloat(String(data.price).replace(/[^0-9.]/g, ''));
          if (data.address?.addressLocality) property.location = data.address.addressLocality;
        } catch {}
      }
    }

    // Meta tags
    const ogTitleMatch = html.match(/<meta[^>]+property="og:title"[^>]*content="([^"]+)"/i);
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    if (!property.name) {
      const raw = ogTitleMatch?.[1] || titleMatch?.[1] || '';
      if (raw) property.name = raw.replace(/\s*[|\-–].*$/, '').trim();
    }

    const descMatch =
      html.match(/<meta[^>]+property="og:description"[^>]*content="([^"]+)"/i) ||
      html.match(/<meta[^>]+name="description"[^>]*content="([^"]+)"/i);
    const desc = descMatch?.[1] ?? '';

    // Price extraction helpers
    const parsePriceString = (raw: string): number | null => {
      const cleaned = raw.replace(/,/g, '').trim();
      if (/cr/i.test(cleaned)) return parseFloat(cleaned) * 10000000;
      if (/lac|lakh|l\b/i.test(cleaned)) return parseFloat(cleaned) * 100000;
      const num = parseFloat(cleaned);
      return isNaN(num) ? null : num;
    };

    // MagicBricks
    if (url.includes('magicbricks')) {
      if (!property.price) {
        const pm = html.match(/₹\s*([\d.]+)\s*(L|Lac|Lakh|Cr)/i) || html.match(/"price"\s*:\s*"?([\d,]+)"?/i);
        if (pm) {
          const p = parsePriceString(pm[0].replace('₹', '').trim());
          if (p) property.price = p;
        }
      }
      const bhkM = html.match(/(\d+)\s*BHK/i);
      if (bhkM) property.bhk = `${bhkM[1]} BHK`;
      const sqftM = html.match(/([\d,]+)\s*sq\.?\s*ft/i);
      if (sqftM) property.carpetArea = parseFloat(sqftM[1].replace(/,/g, ''));
    }

    // 99acres
    if (url.includes('99acres')) {
      if (!property.price) {
        const pm = html.match(/₹\s*([\d.]+)\s*(L|Lac|Cr)/i);
        if (pm) {
          const p = parsePriceString(pm[1] + pm[2]);
          if (p) property.price = p;
        }
      }
      const bhkM = html.match(/(\d+)\s*BHK/i);
      if (bhkM) property.bhk = `${bhkM[1]} BHK`;
    }

    // Housing.com
    if (url.includes('housing.com')) {
      if (!property.price) {
        const pm = html.match(/₹\s*([\d.]+)\s*(L|Cr|Lakh)/i);
        if (pm) {
          const p = parsePriceString(pm[1] + pm[2]);
          if (p) property.price = p;
        }
      }
    }

    // Generic: BHK
    if (!property.bhk) {
      const bhkM = (desc + html).match(/(\d+)\s*BHK/i);
      if (bhkM) property.bhk = `${bhkM[1]} BHK`;
    }

    // Generic: location from desc
    if (!property.location && desc) {
      const cityM = desc.match(/in\s+([A-Z][a-z]+(?:,\s*[A-Z][a-z]+)?)/i);
      if (cityM) property.location = cityM[1];
    }

    // Possession status
    if (/ready\s+to\s+move/i.test(html)) property.possessionStatus = 'Ready to move';
    else if (/under\s+construction/i.test(html)) property.possessionStatus = 'Under construction';
    else if (/pre[\s-]launch/i.test(html)) property.possessionStatus = 'Pre-launch';

    // RERA
    const reraM = html.match(/RERA[\s:#]+([A-Z0-9\/]+)/i);
    if (reraM) property.reraId = reraM[1].trim();

    // Source metadata
    property.sourceUrl = url;
    try {
      const hostname = new URL(url).hostname.replace('www.', '');
      const brand = hostname.split('.')[0];
      property.sourceName = brand.charAt(0).toUpperCase() + brand.slice(1);
    } catch {
      property.sourceName = 'Listing URL';
    }

    const hasUsefulData = property.name || property.price || property.location;
    if (!hasUsefulData) {
      return NextResponse.json(
        { error: 'Could not extract property data. Please fill in details manually.', property },
        { status: 422 }
      );
    }

    return NextResponse.json({ property, success: true });
  } catch (err: any) {
    console.error('[parse-url]', err?.message);
    return NextResponse.json(
      { error: err?.message || 'Failed to parse URL', property },
      { status: 500 }
    );
  }
}
