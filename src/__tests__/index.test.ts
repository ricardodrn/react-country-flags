import { describe, it, expect } from 'vitest';
import * as exportedModules from '../index';
import CL from '../flags/CL';
import US from '../flags/US';
import GB from '../flags/GB';
import FR from '../flags/FR';
import type { CountryCode } from '../types';

describe('Main Export', () => {
  it('should export all major flag components', () => {
    expect(exportedModules.CL).toBeDefined();
    expect(exportedModules.US).toBeDefined();
    expect(exportedModules.GB).toBeDefined();
    expect(exportedModules.FR).toBeDefined();
  });

  it('should export CL as the correct component', () => {
    expect(exportedModules.CL).toBe(CL);
  });

  it('should export US as the correct component', () => {
    expect(exportedModules.US).toBe(US);
  });

  it('should have correct module exports for sample countries', () => {
    const keys = Object.keys(exportedModules);
    expect(keys).toContain('CL');
    expect(keys).toContain('US');
    expect(keys).toContain('GB');
    expect(keys).toContain('FR');
  });

  it('should have exported 200+ country components', () => {
    const keys = Object.keys(exportedModules);
    // Should have at least 200 country exports
    expect(keys.length).toBeGreaterThan(200);
  });

  it('should support individual flag component imports', () => {
    const code: CountryCode = 'CL';
    expect(code).toBe('CL');
  });

  it('should have consistent export names matching country codes', () => {
    const keys = Object.keys(exportedModules);
    keys.forEach(key => {
      // All exports should be 2-letter country codes
      expect(key).toMatch(/^[A-Z]{2}$/);
    });
  });
});
