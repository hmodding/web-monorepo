import { mail, password, recaptcha, username } from './commons.schema';

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
    password: {
      type: 'string',
      title: 'Password',
      ...password.schema,
    },
    recaptcha: {
      type: 'string',
      title: 'Recaptcha',
    },
  },
  required: ['username', 'email', 'password', 'recaptcha'],
};

export const uischema = {
  type: 'Vertical',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/username',
    },
    {
      type: 'Control',
      scope: '#/properties/email',
      options: {
        focus: true,
        placeholder: 'your@mail.com',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/password',
      ...password.uischema,
    },
    {
      type: 'Control',
      scope: '#/properties/recaptcha',
      ...recaptcha.uischema,
    },
  ],
};
