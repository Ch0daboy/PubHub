// app/api/platform-connections/[id]/fetch-content/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getPlatformConnectionById } from '@/lib/platform-connection';
import { fetchContent } from '@/lib/content-fetcher';

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const platformConnection = await getPlatformConnectionById(params.id);
  if (platformConnection?.userId !== session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await fetchContent(platformConnection);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}
