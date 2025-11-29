import { describe, expect, it } from 'vitest';
import zapier from 'zapier-platform-core';

import App from '../../index';

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.contact', () => {
  it('should create a project', async () => {
    const bundle = {
      authData: {
        api_base_url: process.env.authData_api_base_url || 'https://api.wistia.com/v1',
        api_token: process.env.authData_api_token || 'your_api_token_here'
      },
      inputData: {
        name: 'Test Project',
        admin_email: 'arieldelgrande@gmail.com'
      }
    };

   
    const perform = App.creates.create_project.operation["perform"];
    if (!perform) {
      throw new Error('Perform function is undefined');
    }
    if (typeof perform !== 'function') {
      throw new Error('Perform is not a function');
    }
    const result = await appTester(perform, bundle);
    expect(result).toBeDefined();
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name', 'Test Project');
  });
});
