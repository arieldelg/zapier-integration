import {
  defineInputFields,
} from "zapier-platform-core";

const inputFieldsTrigger = defineInputFields([
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

const inputFieldsCreate = defineInputFields([
  { key: 'name', required: true },
  { key: 'admin_email', label: 'Admin Email', required: true },
]);

const inputFieldsDelete = defineInputFields([
  { key: 'id', required: true, type: 'integer', label: 'Project ID', helpText: 'Select the project to delete.' },
]);
  
export default {
    trigger: inputFieldsTrigger,
    create: inputFieldsCreate,
    delete: inputFieldsDelete
}