// lib/platform-connection.ts
import { PrismaClient, PlatformType } from '@prisma/client';

const prisma = new PrismaClient();

export async function createPlatformConnection(userId: string, type: PlatformType, url: string) {
  return await prisma.platformConnection.create({
    data: {
      userId,
      type,
      url,
    },
  });
}

export async function getPlatformConnections(userId: string) {
  return await prisma.platformConnection.findMany({
    where: {
      userId,
    },
  });
}

export async function getPlatformConnectionById(id: string) {
  return await prisma.platformConnection.findUnique({
    where: {
      id,
    },
  });
}

export async function deletePlatformConnection(id: string) {
  return await prisma.platformConnection.delete({
    where: {
      id,
    },
  });
}
