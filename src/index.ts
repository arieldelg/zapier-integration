import zapier, { defineApp } from 'zapier-platform-core';

import packageJson from '../package.json' with { type: 'json' };

import authentication from './authentication.js';
import { befores, afters } from './middleware.js';

import getContact from './triggers/project.js';

import createContact from './creates/create-project.js';


import createDeleteProject from './creates/delete_project.js';


export default defineApp({
  version: packageJson.version,
  platformVersion: zapier.version,
  flags: {
    cleanInputData: false
  },
  authentication,
  beforeRequest: [...befores],
  afterResponse: [...afters],

  // Add your triggers here for them to show up!
  triggers: {
    [getContact.key]: getContact,
  },
  
  // Add your creates here for them to show up!
  creates: {
    [createContact.key]: createContact,
    [createDeleteProject.key]: createDeleteProject
  },
});
