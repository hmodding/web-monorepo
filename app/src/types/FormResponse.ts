import { JsonSchema, UISchemaElement } from '@jsonforms/core';

export interface FormResponse {
  schema: JsonSchema;
  uischema?: UISchemaElement;
}
