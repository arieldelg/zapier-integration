import {
  defineTrigger,
  HttpResponse,
  type PollingTriggerPerform,
} from 'zapier-platform-core';
import inputFields from '../types/inputs.js';
import ProjectResponse from '../types/projects.js';

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

  key: 'trigger_project' as const,
  noun: 'Project',
  
  display: {
    label: 'Get Project',
    description: 'Triggers when a new project is created.',
  },
  operation: {
    type: 'polling',
    perform: perform,
    inputFields: inputFields.trigger,
    sample: {
      id: "10261322",
      name: "photos",
      description: "Get started by adding a video to your folder - you can always delete it later!",
      mediaCount: 1,
      created: "2025-11-29T15:07:56+00:00",
      updated: "2025-11-29T16:03:16+00:00",
      hashedId: "gxkc956dhe",
      anonymousCanUpload: false,
      anonymousCanDownload: false,
      public: true,
      publicId: "gxkc956dhe"
    },

    outputFields: [
      { key: 'id', label: 'ID' , type: 'string'},
      { key: 'name', label: 'Name', type: 'string' },
      { key: 'description', label: 'Description', type: 'string' },
      { key: 'mediaCount', label: 'Media Count', type: 'integer' },
      { key: 'created', label: 'Created At', type: 'string' },
      { key: 'updated', label: 'Updated At', type: 'string' },
      { key: 'hashedId', label: 'Hashed ID', type: 'string' },
      { key: 'anonymousCanUpload', label: 'Anonymous Can Upload', type: 'boolean' },
      { key: 'anonymousCanDownload', label: 'Anonymous Can Download', type: 'boolean' },
      { key: 'public', label: 'Public', type: 'boolean' },
      { key: 'publicId', label: 'Public ID', type: 'string' },
    ],
  },
});
