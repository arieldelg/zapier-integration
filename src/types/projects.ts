export interface ProjectResponse {
  id: number;
  name: string;
  description: string | null;
  mediaCount: number;
  created: string;
  updated: string;
  hashedId: string;
  anonymousCanUpload: boolean;
  anonymousCanDownload: boolean;
  public: boolean;
  publicId: string;
}

export default ProjectResponse;