// lib/content-repurposer.ts
import { PrismaClient, PlatformType } from '@prisma/client';
import { repurposeContent } from './ai-analyzer';
import { createRepurposedContent } from './repurposed-content';

const prisma = new PrismaClient();

export async function repurpose(contentItemId: string, targetPlatform: PlatformType) {
  const contentItem = await prisma.contentItem.findUnique({
    where: {
      id: contentItemId,
    },
  });

  if (!contentItem) {
    throw new Error('Content item not found');
  }

  const repurposedContent = await repurposeContent(contentItem.content, targetPlatform);

  return await createRepurposedContent(contentItemId, repurposedContent, targetPlatform);
}