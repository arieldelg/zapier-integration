import { HttpResponse } from "zapier-platform-core";
import ApiRequestOptions from "../types/request.js";
import handleRateLimits from "./rateLimit.js";

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