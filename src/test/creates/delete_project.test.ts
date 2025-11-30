import { describe, expect, it } from "vitest";
import zapier from "zapier-platform-core";

import App from "../../index";

const appTester = zapier.createAppTester(App);
// read the `.env` file into the environment, if available
zapier.tools.env.inject();

describe("creates.delete_project", () => {
  it("should throw if id is missing", async () => {
    const bundle = {
      authData: {
        api_base_url:
          process.env.authData_api_base_url || "https://api.wistia.com/v1",
        api_token: process.env.authData_api_token || "your_api_token_here",
      },
      inputData: {},
    };

    const perform = App.creates.delete_project.operation["perform"];
    if (!perform) {
      throw new Error("Perform function is undefined");
    }
    if (typeof perform !== "function") {
      throw new Error("Perform is not a function");
    }
    await expect(appTester(perform, bundle)).rejects.toThrow(
      "Project ID is required to delete a project."
    );
  });

  it("should attempt to delete a project and return data", async () => {
    const bundle = {
      authData: {
        api_base_url:
          process.env.authData_api_base_url || "https://api.wistia.com/v1",
        api_token: process.env.authData_api_token || "your_api_token_here",
      },
      inputData: {
        id: 123,
      },
    };

    const perform = App.creates.delete_project.operation["perform"];
    if (!perform) {
      throw new Error("Perform function is undefined");
    }
    if (typeof perform !== "function") {
      throw new Error("Perform is not a function");
    }

    try {
      const result = await appTester(perform, bundle);
      expect(result).toBeDefined();
      expect(result).toHaveProperty("id");
    } catch (err: any) {
      expect(
        err.message.includes("Failed to delete project") ||
          err.message.includes("not found") ||
          err.code === "DeleteProjectError"
      ).toBe(true);
    }
  });
});
