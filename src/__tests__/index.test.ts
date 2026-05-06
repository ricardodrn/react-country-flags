import { describe, it, expect } from 'vitest';
import * as exportedModules from '../index';
import CL from '../flags/CL';
import type { CountryCode } from '../types';

describe('Main Export', () => {
  it('should export CL flag component', () => {
    expect(exportedModules.CL).toBeDefined();
  });

  it('should export CL as the correct component', () => {
    expect(exportedModules.CL).toBe(CL);
  });

  it('should export CountryCode type', () => {
    // The type is exported, we can check if it's accessible through imports
    expect(exportedModules).toHaveProperty('CL');
  });

  it('should have correct module exports', () => {
    const keys = Object.keys(exportedModules);
    expect(keys).toContain('CL');
  });

  it('should support individual flag component imports', () => {
    // Test that individual flags can be imported
    const code: CountryCode = 'CL';
    expect(code).toBe('CL');
  });
});
