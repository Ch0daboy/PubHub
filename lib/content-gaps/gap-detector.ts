// lib/content-gaps/gap-detector.ts
import { PrismaClient } from '@prisma/client';
import { compareContent } from '../ai-analyzer';
import { createContentGap } from '../content-gap';

const prisma = new PrismaClient();

export async function detectContentGaps(userId: string) {
  const connections = await prisma.platformConnection.findMany({
    where: {
      userId,
    },
    include: {
      contentItems: true,
    },
  });

  for (let i = 0; i < connections.length; i++) {
    for (let j = i + 1; j < connections.length; j++) {
      const connection1 = connections[i];
      const connection2 = connections[j];

      for (const item1 of connection1.contentItems) {
        for (const item2 of connection2.contentItems) {
          const { similarity, gap } = await compareContent(item1.content, item2.content);
          if (similarity < 0.8 && gap) {
            await createContentGap(item1.id, gap, 0);
            await createContentGap(item2.id, gap, 0);
          }
        }
      }
    }
  }
}