// lib/ai-analyzer.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function makeRequestWithRetry<T>(request: () => Promise<T>, retries = 3): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... attempts left: ${retries}`);
      return await makeRequestWithRetry(request, retries - 1);
    }
    throw error;
  }
}

export async function analyzeContent(content: string): Promise<{ themes: string[]; tone: string; style: string }> {
  return makeRequestWithRetry(async () => {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert content analyst. Analyze the following text and identify its main themes, tone, and style. Return the result as a JSON object with the keys "themes", "tone", and "style".',
        },
        {
          role: 'user',
          content,
        },
      ],
    });

    const result = JSON.parse(response.choices[0].message.content!);
    return result;
  });
}

export async function generateCreatorProfile(contentItems: { content: string }[]): Promise<{ voice: string; style: string; niche: string; topics: string[] }> {
  return makeRequestWithRetry(async () => {
    const content = contentItems.map((item) => item.content).join('\n\n');
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert creator profiler. Analyze the following content and generate a creator profile. The profile should include the creator\'s voice, style, niche, and main topics. Return the result as a JSON object with the keys "voice", "style", "niche", and "topics".',
        },
        {
          role: 'user',
          content,
        },
      ],
    });

    const result = JSON.parse(response.choices[0].message.content!);
    return result;
  });
}

export async function compareContent(content1: string, content2: string): Promise<{ similarity: number; gap: string }> {
  return makeRequestWithRetry(async () => {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert content analyst. Compare the following two pieces of content and determine their similarity on a scale of 0 to 1. Also, identify any content gaps between them. A content gap is a topic or a piece of information that is present in one content but not in the other. Return the result as a JSON object with the keys "similarity" and "gap".',
        },
        {
          role: 'user',
          content: `Content 1: ${content1}\n\nContent 2: ${content2}`,
        },
      ],
    });

    const result = JSON.parse(response.choices[0].message.content!);
    return result;
  });
}

export async function repurposeContent(content: string, targetPlatform: string): Promise<string> {
  return makeRequestWithRetry(async () => {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an expert content repurposer. Repurpose the following content for ${targetPlatform}.`,
        },
        {
          role: 'user',
          content,
        },
      ],
    });

    return response.choices[0].message.content!;
  });
}
