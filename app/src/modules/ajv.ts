import { createAjv } from '@jsonforms/core';
import ajvErrors from 'ajv-errors';

export const ajv = createAjv({ allErrors: true });
(ajv as any)._opts = ajv.opts; //workaround that is somehow necessary...
ajvErrors(ajv);
