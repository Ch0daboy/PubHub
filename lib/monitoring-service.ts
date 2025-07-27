// lib/monitoring-service.ts
import { PrismaClient } from '@prisma/client';
import { fetchContent } from './content-fetcher';
import { detectContentGaps } from './content-gaps/gap-detector';

const prisma = new PrismaClient();

async function runMonitoring() {
  const users = await prisma.user.findMany();

  for (const user of users) {
    const connections = await prisma.platformConnection.findMany({
      where: {
        userId: user.id,
      },
    });

    for (const connection of connections) {
      await fetchContent(connection);
    }

    await detectContentGaps(user.id);
  }
}

export function startMonitoring() {
  setInterval(runMonitoring, 60 * 60 * 1000); // Run every hour
}
