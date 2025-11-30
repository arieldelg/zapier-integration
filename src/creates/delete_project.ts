import {
  defineCreate,
  type CreatePerform,
  type InferInputData,
} from 'zapier-platform-core';
import { ProjectResponse, inputDelete,  } from '../types/index.js';
import {makeApiRequest, sampleObject, outputFields} from '../utils/index.js';

/**
 * Delete a project
 * @param z Zapier provided utility functions
 * @param bundle Data bundle containing input data and auth data
 * @returns The deleted project object
 */
const perform = (async (z, bundle) => {
  try {
    if (!bundle.inputData.id) {
      throw new z.errors.Error('Project ID is required to delete a project.', 'MissingProjectID', 400);
    }

    const response = await makeApiRequest<ProjectResponse>({
      z,
      bundle,
      method: 'DELETE',
      endpoint: `/projects/${bundle.inputData.id}`,
    });

    return response.data;
  } catch (error: any) {

    if (error instanceof z.errors.Error) {
      throw error; 
    }
    
    throw new z.errors.Error(
      `Failed to delete project: ${error.message}`,
      'DeleteProjectError',
      error.status || 500
    );
  }
  
}) satisfies CreatePerform<InferInputData<typeof inputDelete>>;

/** * Define the delete project operation 
 * @return Create definition for Zapier
 */
export default defineCreate({
  key: 'delete_project',
  noun: 'Delete-project',

  display: {
    label: 'Delete Project',
    description: 'Creates a new delete project, probably with input from previous steps.'
  },

  operation: {
    perform,
    inputFields: inputDelete,
    sample: { ...sampleObject },
    outputFields: outputFields,
  },
});
