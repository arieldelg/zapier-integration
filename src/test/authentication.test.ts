import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../index.js";
const appTester = zapier.createAppTester(App);
zapier.tools.env.inject();

describe("basic auth", () => {
  it("automatically has Authorize Header add", async () => {
    const bundle = {
      authData: {
        api_token: process.env.authData_api_token,
        api_base_url: process.env.authData_api_base_url,
      },
    };

    if (!App.authentication || typeof App.authentication.test !== "function") {
      throw new Error("App.authentication.test is not a function");
    }

    const response = await appTester(App.authentication.test, bundle);

    expect(response.status).toBe(200);
    expect(response.request.headers.Authorization).toBe(
      `Bearer ${process.env.authData_api_token}`
    );
  });

  it("fails on bad auth", async () => {
    const bundle = {
      authData: {
        api_token: process.env.authData_api_token + "invalid",
        api_base_url: process.env.authData_api_base_url,
      },
    };

    try {
      if (
        !App.authentication ||
        typeof App.authentication.test !== "function"
      ) {
        throw new Error("App.authentication.test is not a function");
      }
      await appTester(App.authentication.test, bundle);
    } catch (err) {
      expect(
        err.message.includes("The username and/or password you supplied is incorrect") ||
        err.message.includes("The API token and/or base URL you supplied is incorrect") ||
        err.code === "AuthenticationError"
      ).toBe(true);
      return;
    }
    throw new Error("appTester should have thrown");
  });
});
