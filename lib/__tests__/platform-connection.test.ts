// lib/__tests__/platform-connection.test.ts
import { createPlatformConnection, getPlatformConnections, deletePlatformConnection } from '../platform-connection';
import { PrismaClient, PlatformType } from '@prisma/client';

const prisma = new PrismaClient();

describe('Platform Connection API', () => {
  let user: any;

  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'password',
      },
    });
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    await prisma.$disconnect();
  });

  it('should create a new platform connection', async () => {
    const platformConnection = await createPlatformConnection(user.id, PlatformType.BLOG, 'https://example.com');
    expect(platformConnection).toHaveProperty('id');
    expect(platformConnection.type).toBe(PlatformType.BLOG);
    expect(platformConnection.url).toBe('https://example.com');
  });

  it('should get all platform connections for a user', async () => {
    await createPlatformConnection(user.id, PlatformType.YOUTUBE, 'https://youtube.com');
    const platformConnections = await getPlatformConnections(user.id);
    expect(platformConnections.length).toBe(2);
  });

  it('should delete a platform connection', async () => {
    const platformConnection = await createPlatformConnection(user.id, PlatformType.TWITTER, 'https://twitter.com');
    await deletePlatformConnection(platformConnection.id);
    const platformConnections = await getPlatformConnections(user.id);
    expect(platformConnections.length).toBe(2);
  });
});
