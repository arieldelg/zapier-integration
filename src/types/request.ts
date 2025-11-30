import { Bundle, ZObject } from "zapier-platform-core";

interface ApiRequestOptions {
  z: ZObject;
  bundle: Bundle;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  endpoint: string;
  body?: Record<string, unknown>;
  params?: Record<string, string | number>;
}

export default ApiRequestOptions