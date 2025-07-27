// lib/repurposed-content.ts
import { PrismaClient, PlatformType } from '@prisma/client';

const prisma = new PrismaClient();

export async function createRepurposedContent(contentItemId: string, content: string, platform: PlatformType) {
  return await prisma.repurposedContent.create({
    data: {
      contentItemId,
      content,
      platform,
    },
  });
}

export async function getRepurposedContent(contentItemId: string) {
  return await prisma.repurposedContent.findMany({
    where: {
      contentItemId,
    },
  });
}
