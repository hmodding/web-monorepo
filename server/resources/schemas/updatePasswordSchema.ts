import { password } from './commons.schema';

export const schema = {
  type: 'object',
  properties: {
    password: {
      type: 'string',
      title: 'New password',
      description: `Please type in a new password. It must be at least 8 characters long and contain both an upper-case and lower-case letter and a number.`,
      ...password.schema,
    },
    passwordConfirm: {
      type: 'string',
      title: 'Confirm new password',
      description: 'Please type in the new password again.',
      ...password.schema,
    },
  },
  required: ['password', 'passwordConfirm'],
};

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/password',
      ...password.uischema,
    },
    {
      type: 'Control',
      scope: '#/properties/passwordConfirm',
      ...password.uischema,
    },
  ],
};
