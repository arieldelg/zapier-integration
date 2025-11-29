import {
  defineCreate,
  type CreatePerform,
  type InferInputData,
  HttpResponse,
} from 'zapier-platform-core';

import inputs from '../types/inputs.js';
import objects from '../utils/sampleObject.js';
import { ProjectResponse } from '../types/projects.js';

const perform = (async (z, bundle) => {
  if (!bundle.inputData.id) {
    throw new Error('Project ID is required to delete a project.');
  }
  const response: HttpResponse<ProjectResponse> = await z.request({
    method: 'DELETE',
    url: `${bundle.authData.api_base_url}/projects/${bundle.inputData.id}`,
  });
  return response.data;
}) satisfies CreatePerform<InferInputData<typeof inputs.delete>>;

export default defineCreate({
  key: 'delete_project',
  noun: 'Delete-project',

  display: {
    label: 'Create Delete-project',
    description: 'Creates a new delete-project, probably with input from previous steps.'
  },

  operation: {
    perform,
    inputFields: inputs.delete,
    sample: { ...objects.sampleObject },
    outputFields: objects.outputFields,
  },
});
