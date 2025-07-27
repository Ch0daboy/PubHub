// lib/__tests__/ai-analyzer.test.ts
import { analyzeContent, generateCreatorProfile, compareContent, repurposeContent } from '../ai-analyzer';

jest.mock('openai', () => {
  return jest.fn().mockImplementation(() => {
    return {
      chat: {
        completions: {
          create: jest.fn().mockImplementation(() => {
            return Promise.resolve({
              choices: [
                {
                  message: {
                    content: JSON.stringify({
                      themes: ['test'],
                      tone: 'neutral',
                      style: 'formal',
                      voice: 'authoritative',
                      niche: 'tech',
                      topics: ['test'],
                      similarity: 0.5,
                      gap: 'test gap',
                    }),
                  },
                },
              ],
            });
          }),
        },
      },
    };
  });
});

describe('AI Analyzer', () => {
  it('should analyze content', async () => {
    const result = await analyzeContent('This is a test content');
    expect(result).toHaveProperty('themes');
    expect(result).toHaveProperty('tone');
    expect(result).toHaveProperty('style');
  });

  it('should generate a creator profile', async () => {
    const result = await generateCreatorProfile([{ content: 'This is a test content' }]);
    expect(result).toHaveProperty('voice');
    expect(result).toHaveProperty('style');
    expect(result).toHaveProperty('niche');
    expect(result).toHaveProperty('topics');
  });

  it('should compare content', async () => {
    const result = await compareContent('This is a test content', 'This is another test content');
    expect(result).toHaveProperty('similarity');
    expect(result).toHaveProperty('gap');
  });

  it('should repurpose content', async () => {
    const result = await repurposeContent('This is a test content', 'BLOG');
    expect(typeof result).toBe('string');
  });
});
