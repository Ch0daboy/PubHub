// app/api/creator-profile/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createCreatorProfile, getCreatorProfile } from '@/lib/creator-profile';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const profile = await getCreatorProfile(session.user.id);
  return NextResponse.json(profile);
}

export async function POST() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const profile = await createCreatorProfile(session.user.id);
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.json();

  const updatedProfile = await prisma.creatorProfile.update({
    where: {
      userId: session.user.id,
    },
    data,
  });

  return NextResponse.json(updatedProfile);
}
