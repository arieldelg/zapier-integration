export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  mediaCount: number;
  created: string;
  updated: string;
  hashedId: string;
  anonymousCanUpload: boolean;
  anonymousCanDownload: boolean;
  public: boolean;
  publicId: string;
}

export interface OutputField {
  key: string;
  label: string;
  type: 'string' | 'integer' | 'boolean' | 'number';
  helpText?: string;
  required?: boolean;
}
