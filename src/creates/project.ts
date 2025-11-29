import {
  defineCreate,
  HttpResponse,
  type CreatePerform,
  type InferInputData,
} from 'zapier-platform-core';
import inputFields from '../types/inputs.js';
import ProjectResponse from '../types/projects.js';


const perform = (async (z, bundle) => {
  const response: HttpResponse<ProjectResponse> = await z.request({
    method: 'POST',
    url: `${bundle.authData.api_base_url}/projects`,
    body: {
      name: bundle.inputData.name,
      adminEmail: bundle.inputData.admin_email,
    },
  });
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputFields.create>>;

export default defineCreate({
  key: 'project' as const,
  noun: 'Project-Create',

  display: {
    label: 'Create Project',
    description: 'Creates a new project, probably with input from previous steps.'
  },

  operation: {
    perform,
    inputFields: inputFields.create,

    sample: {
      id: "10261508",
      public: true,
      description: null,
      name: 'Untitled Folder',
      mediaCount: 0,
      created: '2025-11-29T19:00:49+00:00',
      updated: '2025-11-29T19:00:49+00:00',
      hashedId: 'bmsyscoesv',
      anonymousCanUpload: false,
      anonymousCanDownload: false,
      publicId: 'bmsyscoesv'
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
