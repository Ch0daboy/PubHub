// lib/content-item.ts
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function createContentItem(platformConnectionId: string, title: string, url: string, content: string, metadata?: Prisma.JsonValue) {
  return await prisma.contentItem.create({
    data: {
      platformConnectionId,
      title,
      url,
      content,
      metadata,
    },
  });
}

export async function getContentItems(platformConnectionId: string) {
  return await prisma.contentItem.findMany({
    where: {
      platformConnectionId,
    },
  });
}

export async function updateContentItemAnalysis(id: string, analysis: Prisma.JsonValue) {
  return await prisma.contentItem.update({
    where: {
      id,
    },
    data: {
      analysis,
    },
  });
}
