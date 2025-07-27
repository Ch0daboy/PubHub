// lib/creator-profile.ts
import { PrismaClient } from '@prisma/client';
import { generateCreatorProfile } from './ai-analyzer';

const prisma = new PrismaClient();

export async function createCreatorProfile(userId: string) {
  const contentItems = await prisma.contentItem.findMany({
    where: {
      platformConnection: {
        userId,
      },
    },
  });

  const profile = await generateCreatorProfile(contentItems);

  return await prisma.creatorProfile.upsert({
    where: {
      userId,
    },
    update: {
      ...profile,
    },
    create: {
      userId,
      ...profile,
    },
  });
}

export async function getCreatorProfile(userId: string) {
  return await prisma.creatorProfile.findUnique({
    where: {
      userId,
    },
  });
}