import { mail, username } from './commons.schema';

export const schema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      title: 'Username',
      ...username.schema,
    },
    email: {
      type: 'string',
      title: 'E-Mail',
      ...mail.schema,
    },
  },
  required: ['username', 'email'],
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
      scope: '#/properties/email',
      options: {
        placeholder: 'your@mail.com',
      },
    },
  ],
};
