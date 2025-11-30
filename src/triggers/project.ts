import {
  defineTrigger,
  type PollingTriggerPerform,
} from 'zapier-platform-core';
import { ProjectResponse, trigger,  } from '../types/index.js';
import {makeApiRequest, sampleObject, outputFields} from '../utils/index.js';

/**
 * Get projects
 * @param z Zapier provided utility functions
 * @param bundle Data bundle containing input data and auth data
 * @returns An array of project objects
 */
const perform = (async (z, bundle) => {
  try {
    const params: Record<string, string> = {};
    if (bundle.inputData.page) params.page = bundle.inputData.page.toString();
    if (bundle.inputData.per_page) params.per_page = bundle.inputData.per_page.toString();

    const response = await makeApiRequest<ProjectResponse[]>({
      z,
      bundle,
      endpoint: '/projects',
      params,
    });

    return response.data.map(project => ({
      ...project,
      id: project.id.toString(),
    }));
    
  } catch (error: any) {
    if (error instanceof z.errors.Error) {
      throw error; 
    }
    
    throw new z.errors.Error(
      `Failed to fetch projects: ${error}`,
      'FetchProjectsError',
      error.status || 500
    );
  }
  
}) satisfies PollingTriggerPerform;

/** * Define the get project operation 
 * @return Trigger definition for Zapier
 */
export default defineTrigger({

  key: 'project' as const,
  noun: 'Project',
  
  display: {
    label: 'Get Project',
    description: 'Triggers when a new project is created.',
  },
  operation: {
    type: 'polling',
    perform: perform,
    inputFields: trigger,
    sample: {...sampleObject},

    outputFields: outputFields,
  },
});
