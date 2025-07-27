// app/api/repurposed-content/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const repurposedContent = await prisma.repurposedContent.findMany({
    where: {
      contentItem: {
        platformConnection: {
          userId: session.user.id,
        },
      },
    },
  });

  return NextResponse.json(repurposedContent);
}
