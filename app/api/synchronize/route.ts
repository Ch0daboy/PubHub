// app/api/synchronize/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { fetchContent } from '@/lib/content-fetcher';
import { detectContentGaps } from '@/lib/content-gaps/gap-detector';
import { createCreatorProfile } from '@/lib/creator-profile';

const prisma = new PrismaClient();

export async function POST() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  const connections = await prisma.platformConnection.findMany({
    where: {
      userId,
    },
  });

  for (const connection of connections) {
    await fetchContent(connection);
  }

  await detectContentGaps(userId);
  await createCreatorProfile(userId);

  return NextResponse.json({ success: true });
}
