import { HttpResponse } from "zapier-platform-core";
import { ApiRequestOptions } from "../types/request.js";
import { handleRateLimits } from "./rateLimit.js";

/**
 * Makes an API request to the specified endpoint with rate limit handling.
 * @param z Zapier provided utility functions
 * @param bundle Data bundle containing input data and auth data
 * @param method HTTP method (GET, POST, DELETE, etc.)
 * @param endpoint API endpoint to call
 * @param body Optional request body for POST/PUT requests
 * @param params Optional query parameters for GET requests
 * @returns The HTTP response from the API
 */
export async function makeApiRequest<T>({
  z,
  bundle,
  method = 'GET',
  endpoint,
  body,
  params,
}: ApiRequestOptions): Promise<HttpResponse<T>> {
  let url = `${bundle.authData.api_base_url}${endpoint}`;
  if (params) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      query.append(key, value.toString());
    }
    url += `?${query.toString()}`;
  }

  return handleRateLimits(() =>
    z.request({
      method,
      url,
      ...(body ? { body } : {}),
    })
  );
}