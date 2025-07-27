// app/api/content-items/[id]/analyze/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { analyzeContent } from '@/lib/ai-analyzer';
import { updateContentItemAnalysis } from '@/lib/content-item';

const prisma = new PrismaClient();

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contentItem = await prisma.contentItem.findUnique({
    where: {
      id: params.id,
    },
    include: {
      platformConnection: true,
    },
  });

  if (contentItem?.platformConnection?.userId !== session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const analysis = await analyzeContent(contentItem.content);
    await updateContentItemAnalysis(params.id, analysis);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze content' }, { status: 500 });
  }
}
