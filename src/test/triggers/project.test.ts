import { describe, expect, it } from 'vitest';
import zapier from 'zapier-platform-core';

import App from '../../index';
import {ProjectResponse} from '../../types/projects';

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
});
