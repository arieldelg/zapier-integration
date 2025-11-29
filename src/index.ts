import zapier, { defineApp } from 'zapier-platform-core';
import packageJson from '../package.json' with { type: 'json' };
import authentication from './authentication.js';
import { befores, afters } from './middleware.js';
import getProject from './triggers/project.js';
import createProject from './creates/create_project.js';
import createDeleteProject from './creates/delete_project.js';



/**
 * Define the app
 * @return App definition for Zapier
 */
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
    [getProject.key]: getProject,
  },
  
  // Add your creates here for them to show up!
  creates: {
    [createProject.key]: createProject,
    [createDeleteProject.key]: createDeleteProject
  },
});
