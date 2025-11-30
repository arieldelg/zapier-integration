import { Bundle, ZObject } from "zapier-platform-core";

export interface ApiRequestOptions {
  z: ZObject;
  bundle: Bundle;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
  endpoint: string;
  body?: Record<string, unknown>;
  params?: Record<string, string | number>;
}
