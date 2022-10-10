import { password, username } from './commons.schema';

export const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      ...username.schema,
    },
    password: {
      type: 'string',
      title: 'Password',
    },
  },
  required: ['username', 'password'],
};

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/username',
      options: {
        focus: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/password',
      ...password.uischema,
    },
  ],
};
