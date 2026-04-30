import { describe, it, expect } from 'vitest';
import { validateElectionQuery } from '../src/logic/electionEngine';

describe('Guardrail Logic', () => {
  it('should allow election-related keywords', () => {
    expect(validateElectionQuery('how do I vote?')).toBe(true);
    expect(validateElectionQuery('registration for elections')).toBe(true);
    expect(validateElectionQuery('tell me about evm')).toBe(true);
    expect(validateElectionQuery('what is eci?')).toBe(true);
    expect(validateElectionQuery('namaste')).toBe(true);
  });

  it('should filter out non-election queries', () => {
    expect(validateElectionQuery('write a python script')).toBe(false);
    expect(validateElectionQuery('who won the cricket match?')).toBe(false);
    expect(validateElectionQuery('how to make a cake?')).toBe(false);
    expect(validateElectionQuery('tell me a joke')).toBe(false);
  });
});
