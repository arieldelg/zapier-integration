import {
  defineCreate,
  HttpResponse,
  type CreatePerform,
  type InferInputData,
} from 'zapier-platform-core';
import inputFields from '../types/inputs.js';
import {ProjectResponse} from '../types/projects.js';
import objects from '../utils/sampleObject.js';

/**
 * Create a new project
 * @param z Zapier provided utility functions
 * @param bundle Data bundle containing input data and auth data
 * @returns The created project object
 */
const perform = (async (z, bundle) => {
  try {
    if (!bundle.inputData.name || !bundle.inputData.admin_email) {
      throw new z.errors.Error('Both name and admin email are required to create a project.', 'MissingFields', 400);
    }

    const response: HttpResponse<ProjectResponse> = await z.request({
      method: 'POST',
      url: `${bundle.authData.api_base_url}/projects`,
      body: {
        name: bundle.inputData.name,
        adminEmail: bundle.inputData.admin_email,
      },
    });
    
    return response.data;
  } catch (error: any) {
    if (error instanceof z.errors.Error) {
      throw error; // Re-throw Zapier errors as is
    }
    
    throw new z.errors.Error(
      `Failed to create project: ${error}`,
      'CreateProjectError',
      error.status || 500
    );
  }
}) satisfies CreatePerform<InferInputData<typeof inputFields.create>>;



/**
 * Define the create project operation 
 * @return Create definition for Zapier
 */
export default defineCreate({
  key: 'create_project' as const,
  noun: 'Create-project',

  display: {
    label: 'Create Project',
    description: 'Creates a new project, probably with input from previous steps.'
  },

  operation: {
    perform,
    inputFields: inputFields.create,
    sample: {...objects.sampleObject},
    outputFields: objects.outputFields,
  },
});
