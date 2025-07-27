// lib/content-gap.ts
import { PrismaClient, GapStatus } from '@prisma/client';

const prisma = new PrismaClient();

export async function createContentGap(contentItemId: string, description: string, priority: number) {
  return await prisma.contentGap.create({
    data: {
      contentItemId,
      description,
      priority,
    },
  });
}

export async function getContentGaps(contentItemId: string) {
  return await prisma.contentGap.findMany({
    where: {
      contentItemId,
    },
  });
}

export async function updateContentGapStatus(id: string, status: GapStatus) {
  return await prisma.contentGap.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}
