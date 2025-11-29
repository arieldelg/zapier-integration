import { describe, expect, it } from 'vitest';
import zapier from 'zapier-platform-core';

import App from '../../index';

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe('creates.delete_project', () => {
  it('should run', async () => {
    const bundle = { inputData: {} };

    const perform = App.creates.delete_project.operation["perform"];
    if (!perform) {
      throw new Error('Perform function is undefined');
    }
    if (typeof perform !== 'function') {
      throw new Error('Perform is not a function');
    }
    const results = await appTester(perform, bundle);
    expect(results).toBeDefined();
    // TODO: add more assertions
  });
});
