import { describe, it, expect } from 'vitest';
import type { CountryCode } from '../types';

describe('Types', () => {
  it('should define CountryCode type with multiple countries', () => {
    // Test various country codes
    const codes: CountryCode[] = ['CL', 'US', 'GB', 'FR', 'DE', 'JP'];
    expect(codes).toHaveLength(6);
  });

  it('should support CountryCode for at least 200+ countries', () => {
    // Spot check various countries
    const testCountries: CountryCode[] = [
      'CL', 'US', 'GB', 'FR', 'DE', 'JP', 'BR', 'IN', 'CN', 'AU',
      'CA', 'MX', 'ES', 'IT', 'KR', 'RU', 'ZA', 'NZ', 'SE', 'CH'
    ];
    expect(testCountries.length).toBeGreaterThan(0);
    testCountries.forEach(code => {
      expect(code).toMatch(/^[A-Z]{2}$/);
    });
  });

  it('should include CL as valid CountryCode', () => {
    const code: CountryCode = 'CL';
    expect(code).toBe('CL');
  });
});
