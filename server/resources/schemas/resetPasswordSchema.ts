import { mail, recaptcha } from './commons.schema';

export const schema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      title: 'E-Mail',
      ...mail.schema,
    },
    recaptcha: {
      type: 'string',
      title: 'Recaptcha',
    },
  },
  required: ['email', 'recaptcha'],
};

export const uischema = {
  type: 'Vertical',
  elements: [
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
      scope: '#/properties/recaptcha',
      ...recaptcha.uischema,
    },
  ],
};
