import type { ZObject, Bundle } from 'zapier-platform-core';

    // This function runs after every outbound request. You can use it to check for
// errors or modify the response. You can have as many as you need. They'll need
// to each be registered in your index.js file.
const handleBadResponses = (response, z: ZObject, bundle: Bundle) => {
    if (response.status === 401) {
      throw new z.errors.Error(
    "The username and/or password you supplied is incorrect",
    "AuthenticationError",
    response.status
  )
    }

return response
}

/**
 * Add the API key to the request headers
 * @param request The request object
 * @param z Zapier provided utility functions
 * @param bundle Data bundle containing auth data
 * @returns The modified request object
 */
const addApiKeyToHeader = (request: any, z: ZObject, bundle: Bundle) => {
  request.headers["Authorization"] = `Bearer ${bundle.authData.api_token}`;
  return request;
};

export const befores = [addApiKeyToHeader]

export const afters = [handleBadResponses]