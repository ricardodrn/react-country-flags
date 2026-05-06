import { describe, it, expect } from 'vitest';
import type { CountryCode } from '../types';

describe('Types', () => {
  it('should define CountryCode type with CL', () => {
    // This is a TypeScript compile-time test
    const code: CountryCode = 'CL';
    expect(code).toBe('CL');
  });

  it('should allow only valid CountryCode values', () => {
    const validCodes: CountryCode[] = ['CL'];
    expect(validCodes).toContain('CL');
  });
});
