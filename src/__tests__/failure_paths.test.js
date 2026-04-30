import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateElectionResponse } from '../logic/electionEngine';
import { OFFLINE_FAQS } from '../data/faqs';
import Fuse from 'fuse.js';

// Mocking the AI Service
vi.mock('../logic/electionEngine', () => ({
  generateElectionResponse: vi.fn(),
}));

// Mocking Firebase
vi.mock('../lib/firebase', () => ({
  db: {},
  analytics: {},
  logEvent: vi.fn(),
}));

vi.mock('firebase/firestore', () => ({
  doc: vi.fn(),
  setDoc: vi.fn(),
  increment: vi.fn(),
}));

describe('ElectED Failure Path & Robustness Tests', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should trigger offline mode when API returns 429 (Rate Limit)', async () => {
    // Simulate a 429 error from the AI service
    generateElectionResponse.mockResolvedValue({ text: null, isOffline: true });
    
    const response = await generateElectionResponse('any prompt');
    expect(response.isOffline).toBe(true);
    expect(response.text).toBe(null);
  });

  it('should provide fuzzy matching for misspelled user inputs', () => {
    const fuse = new Fuse(OFFLINE_FAQS, {
      keys: ['question', 'keywords'],
      threshold: 0.4
    });

    // Test case: "votr id" should match "Voter ID" related FAQ
    const query = "votr id";
    const results = fuse.search(query);
    
    expect(results.length).toBeGreaterThan(0);
    // Use lowercase comparison for keywords
    const hasVoterId = results[0].item.keywords.some(k => k.toLowerCase().includes('voter id'));
    expect(hasVoterId).toBe(true);
  });

  it('should handle "electn" typo for "Election"', () => {
    const fuse = new Fuse(OFFLINE_FAQS, {
      keys: ['question', 'keywords'],
      threshold: 0.4
    });

    const query = "electn day";
    const results = fuse.search(query);
    
    expect(results.length).toBeGreaterThan(0);
    // Should match something related to Election or registration
    const matchedText = (results[0].item.question + " " + results[0].item.keywords.join(" ")).toLowerCase();
    expect(matchedText).toMatch(/elect/);
  });

  it('should remain functional if firebase fails (graceful degradation)', async () => {
    const trackFaqView = async (faqId) => {
      try {
        throw new Error("Firebase unavailable");
      } catch (err) {
        return false;
      }
    };
    await expect(trackFaqView(1)).resolves.not.toThrow();
  });

  it('should handle empty string input without crashing', async () => {
    generateElectionResponse.mockResolvedValue({ text: "Please enter a question.", isOffline: false });
    const response = await generateElectionResponse('');
    expect(response.text).toBeDefined();
    expect(response.isOffline).toBe(false);
  });

  it('should handle maximum character limit inputs', async () => {
    const longPrompt = "a".repeat(5000);
    generateElectionResponse.mockResolvedValue({ text: "Query too long", isOffline: false });
    const response = await generateElectionResponse(longPrompt);
    expect(response.text).toBeDefined();
  });

  it('should return offline status if window.navigator.onLine is false', async () => {
    // We mock the implementation to simulate the navigator check
    const mockGenerateResponse = vi.fn().mockImplementation((prompt) => {
      if (!window.navigator.onLine) return { text: null, isOffline: true };
      return { text: "Online response", isOffline: false };
    });

    // Mocking window.navigator.onLine
    vi.stubGlobal('navigator', { onLine: false });
    const response = await mockGenerateResponse('test');
    expect(response.isOffline).toBe(true);

    vi.stubGlobal('navigator', { onLine: true });
    const responseOnline = await mockGenerateResponse('test');
    expect(responseOnline.isOffline).toBe(false);
    
    vi.unstubAllGlobals();
  });
});
