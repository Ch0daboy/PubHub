// lib/url-validator.ts
import { PlatformType } from '@prisma/client';

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
const twitterRegex = /^(https?:\/\/)?(www\.)?twitter\.com\/.+$/;
const instagramRegex = /^(https?:\/\/)?(www\.)?instagram\.com\/.+$/;
const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/;
const tiktokRegex = /^(https?:\/\/)?(www\.)?tiktok\.com\/.+$/;

export function isValidPlatformUrl(type: PlatformType, url: string): boolean {
  switch (type) {
    case PlatformType.YOUTUBE:
      return youtubeRegex.test(url);
    case PlatformType.TWITTER:
      return twitterRegex.test(url);
    case PlatformType.INSTAGRAM:
      return instagramRegex.test(url);
    case PlatformType.LINKEDIN:
      return linkedinRegex.test(url);
    case PlatformType.TIKTOK:
      return tiktokRegex.test(url);
    case PlatformType.BLOG:
      // For blogs, we can be less strict, just check for a valid URL format
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    default:
      return false;
  }
}
