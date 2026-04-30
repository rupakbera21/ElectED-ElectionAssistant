import { describe, it, expect } from 'vitest';
import { electionSteps } from '../src/data/electionData';

describe('Election Data Validation', () => {
  it('should contain the required election phases', () => {
    const titles = electionSteps.map(step => step.title);
    
    expect(titles).toContain('Registration');
    expect(titles).toContain('Voting Day');
    expect(titles).toContain('Results');
  });

  it('should have 3 distinct phases', () => {
    expect(electionSteps.length).toBe(3);
  });

  it('should have non-empty content for each phase', () => {
    electionSteps.forEach(step => {
      expect(step.description.length).toBeGreaterThan(0);
      expect(step.whatToDo.length).toBeGreaterThan(0);
      expect(step.proTips.length).toBeGreaterThan(0);
    });
  });
});
