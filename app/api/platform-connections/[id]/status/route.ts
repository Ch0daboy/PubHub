// app/api/platform-connections/[id]/status/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getPlatformConnectionById } from '@/lib/platform-connection';
import { PrismaClient, ConnectionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const platformConnection = await getPlatformConnectionById(params.id);
  if (platformConnection?.userId !== session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { status } = await request.json();

  if (!status) {
    return NextResponse.json({ error: 'Status is required' }, { status: 400 });
  }

  const updatedPlatformConnection = await prisma.platformConnection.update({
    where: {
      id: params.id,
    },
    data: {
      status: status as ConnectionStatus,
    },
  });

  return NextResponse.json(updatedPlatformConnection);
}
