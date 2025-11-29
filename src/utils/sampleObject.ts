import {ProjectResponse, OutputField} from '../types/projects.js';

const sampleObject: ProjectResponse = {
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
    };

const outputFields: OutputField[] = [
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
    ]

export default { sampleObject, outputFields };
