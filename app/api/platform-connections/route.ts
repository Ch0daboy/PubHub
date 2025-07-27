// app/api/platform-connections/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createPlatformConnection, getPlatformConnections } from '@/lib/platform-connection';
import { PlatformType } from '@prisma/client';
import { isValidPlatformUrl } from '@/lib/url-validator';
import { getCache, setCache, invalidateCache } from '@/lib/cache';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cacheKey = `platform-connections:${session.user.id}`;
  const cachedConnections = await getCache(cacheKey);

  if (cachedConnections) {
    return NextResponse.json(cachedConnections);
  }

  const platformConnections = await getPlatformConnections(session.user.id);
  await setCache(cacheKey, platformConnections);

  return NextResponse.json(platformConnections);
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { type, url } = await request.json();

  if (!type || !url) {
    return NextResponse.json({ error: 'Type and url are required' }, { status: 400 });
  }

  if (!isValidPlatformUrl(type as PlatformType, url)) {
    return NextResponse.json({ error: 'Invalid URL for the selected platform' }, { status: 400 });
  }

  const platformConnection = await createPlatformConnection(session.user.id, type as PlatformType, url);

  const cacheKey = `platform-connections:${session.user.id}`;
  await invalidateCache(cacheKey);

  return NextResponse.json(platformConnection);
}
