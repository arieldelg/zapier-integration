import {
  defineTrigger,
  HttpResponse,
  type PollingTriggerPerform,
} from 'zapier-platform-core';
import inputFields from '../types/inputs.js';
import {ProjectResponse} from '../types/projects.js';
import objects from '../utils/sampleObject.js';

// triggers on a new contact with a certain tag
const perform = (async (z, bundle) => {
  const queryParams = new URLSearchParams();

  if (bundle.inputData.page) {
    queryParams.append('page', bundle.inputData.page.toString());
  }
  if (bundle.inputData.per_page) {
    queryParams.append('per_page', bundle.inputData.per_page.toString());
  }

  const response: HttpResponse<ProjectResponse[]> = await z.request({
    url: `${bundle.authData.api_base_url}/projects?${queryParams.toString()}`,
  });
 
  return response.data.map(project => ({
    ...project,
    id: project.id.toString(),
  }));
  
}) satisfies PollingTriggerPerform;

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
    inputFields: inputFields.trigger,
    sample: {...objects.sampleObject},

    outputFields: objects.outputFields,
  },
});
