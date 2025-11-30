import {
  defineInputFields,
} from "zapier-platform-core";

export const inputFieldsTrigger = defineInputFields([
    {
        key: "page",
        required: true,
        type: "integer",
        label: "Page",
        helpText: "The page number for pagination."
    },
    {
        key: "per_page",
        required: true,
        type: "integer",
        label: "Results per Page",
        helpText: "The number of results to return per page."
    }
]);

export const inputFieldsCreate = defineInputFields([
  { key: 'name', required: true },
  { key: 'admin_email', label: 'Admin Email', required: true },
]);

export const inputFieldsDelete = defineInputFields([
  { key: 'id', required: true, type: 'integer', label: 'Project ID', helpText: 'Select the project to delete.' },
]);
  
