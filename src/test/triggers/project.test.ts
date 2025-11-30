import { describe, expect, it } from 'vitest';
import zapier from 'zapier-platform-core';

import App from '../../index';
import {ProjectResponse} from '../../types/projects';
import handleRateLimits from '../../utils/rateLimit';

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('triggers.project', () => {
  it('should run', async () => {
    const bundle = {
      authData: {
        api_base_url: process.env.authData_api_base_url || 'https://api.wistia.com/v1',
        api_token: process.env.authData_api_token || 'your_api_token_here'
      },
      inputData: {
        page: 1,
        per_page: 1
      }
    };

    const results: ProjectResponse[] = await appTester(App.triggers.project.operation["perform"], bundle);
    expect(results).toBeDefined();
    expect(Array.isArray(results)).toBe(true);
    if (results.length > 0) {
      expect(results[0]).toHaveProperty('id');
      expect(results[0]).toHaveProperty('name');
    }
  });

  it('should retry and eventually throw after exhausting retries on 429', async () => {
    let callCount = 0;
    const fake429 = () => {
      callCount++;
      const error: any = new Error('Too Many Requests');
      error.status = 429;
      error.headers = { 'Retry-After': '0' };
      throw error;
    };

    await expect(
      handleRateLimits(() => Promise.resolve().then(fake429), 2)
    ).rejects.toThrow('Rate limit retries exhausted.');
    expect(callCount).toBe(2);
  });

  it('should succeed if function eventually succeeds before retries exhausted', async () => {
    let callCount = 0;
    const maybe429 = () => {
      callCount++;
      if (callCount < 2) {
        const error: any = new Error('Too Many Requests');
        error.status = 429;
        error.headers = { 'Retry-After': '0' };
        throw error;
      }
      return 'success';
    };

    const result = await handleRateLimits(() => Promise.resolve().then(maybe429), 3);
    expect(result).toBe('success');
    expect(callCount).toBe(2);
  });
});
