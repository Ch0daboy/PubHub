// lib/platform-adapters/platform-adapter-factory.ts
import { PlatformConnection, PlatformType } from '@prisma/client';
import { YoutubeAdapter } from './youtube-adapter';
import { TwitterAdapter } from './twitter-adapter';
import { BlogAdapter } from './blog-adapter';
import { InstagramAdapter } from './instagram-adapter';
import { TiktokAdapter } from './tiktok-adapter';
import { PlatformAdapter } from './base-adapter';

export function getPlatformAdapter(connection: PlatformConnection): PlatformAdapter {
  switch (connection.type) {
    case PlatformType.YOUTUBE:
      return new YoutubeAdapter(connection);
    case PlatformType.TWITTER:
      return new TwitterAdapter(connection);
    case PlatformType.BLOG:
      return new BlogAdapter(connection);
    case PlatformType.INSTAGRAM:
      return new InstagramAdapter(connection);
    case PlatformType.TIKTOK:
      return new TiktokAdapter(connection);
    default:
      throw new Error(`Unsupported platform type: ${connection.type}`);
  }
}