import type { ZObject, Bundle, Authentication, HttpResponse } from "zapier-platform-core";

/**
 * Test the authentication by making a request to the API
 * @param z Zapier provided utility functions
 * @param bundle Data bundle containing auth data
 * @returns The response from the API
 */
const test = async (z: ZObject, bundle: Bundle) => {
  const url = bundle.authData.api_base_url;
  if(!url) {
    throw new z.errors.Error(
      'API Base URL is required for authentication.',
      'InvalidAuthField'
    );
  }
  if (!/^https:\/\/.+/i.test(url)) {
    throw new z.errors.Error(
      'API Base URL must start with "https://".',
      "InvalidAuthField"
    );
  }
  const stats: HttpResponse<unknown> = await z.request({ url: `${bundle.authData.api_base_url}/projects.json` });
  
  if (stats.status === 401 || stats.status === 403) {
    throw new z.errors.Error(
      "The API token and/or base URL you supplied is incorrect",
      "AuthenticationError"
    );
  }

  return stats;
};

export default {
  type: "custom" as const,
  fields: [
    {
      key: "api_base_url",
      type: "string",
      required: true,
      label: "API Base URL",
      helpText: "Base URL for API requests, e.g. https://api.wistia.com/v1",
    },
    {
      key: "api_token",
      type: "string",
      required: true,
      label: "API Token",
      helpText:
        "Find your API token here: https://arieldelgrande.wistia.com/account/api",
    },
  ],
  test,
  connectionLabel: "{{bundle.inputData}}",
} satisfies Authentication;
