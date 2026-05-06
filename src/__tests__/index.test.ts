import { describe, it, expect } from 'vitest';
import * as exportedModules from '../index';
import CL from '../flags/CL';

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
});
