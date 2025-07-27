// lib/platform-adapters/__tests__/platform-adapter-factory.test.ts
import { getPlatformAdapter } from '../platform-adapter-factory';
import { PlatformConnection, PlatformType } from '@prisma/client';
import { YoutubeAdapter } from '../youtube-adapter';
import { TwitterAdapter } from '../twitter-adapter';
import { BlogAdapter } from '../blog-adapter';

describe('Platform Adapter Factory', () => {
  it('should return a YoutubeAdapter for YOUTUBE platform type', () => {
    const connection: PlatformConnection = {
      id: '1',
      userId: '1',
      type: PlatformType.YOUTUBE,
      url: 'https://youtube.com',
      status: 'CONNECTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const adapter = getPlatformAdapter(connection);
    expect(adapter).toBeInstanceOf(YoutubeAdapter);
  });

  it('should return a TwitterAdapter for TWITTER platform type', () => {
    const connection: PlatformConnection = {
      id: '1',
      userId: '1',
      type: PlatformType.TWITTER,
      url: 'https://twitter.com',
      status: 'CONNECTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const adapter = getPlatformAdapter(connection);
    expect(adapter).toBeInstanceOf(TwitterAdapter);
  });

  it('should return a BlogAdapter for BLOG platform type', () => {
    const connection: PlatformConnection = {
      id: '1',
      userId: '1',
      type: PlatformType.BLOG,
      url: 'https://example.com',
      status: 'CONNECTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const adapter = getPlatformAdapter(connection);
    expect(adapter).toBeInstanceOf(BlogAdapter);
  });

  it('should throw an error for unsupported platform type', () => {
    const connection: PlatformConnection = {
      id: '1',
      userId: '1',
      type: 'UNSUPPORTED' as PlatformType,
      url: 'https://unsupported.com',
      status: 'CONNECTED',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(() => getPlatformAdapter(connection)).toThrow('Unsupported platform type: UNSUPPORTED');
  });
});
