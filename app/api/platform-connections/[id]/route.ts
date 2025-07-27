// app/api/platform-connections/[id]/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { deletePlatformConnection, getPlatformConnectionById } from '@/lib/platform-connection';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const platformConnection = await getPlatformConnectionById(params.id);
  if (platformConnection?.userId !== session.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await deletePlatformConnection(params.id);
  return NextResponse.json({ message: 'Platform connection deleted' });
}
