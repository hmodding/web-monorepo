import {
  ExtendedRoutesConfig,
  ExtendedSpecConfig,
  generateRoutes,
  generateSpec,
} from 'tsoa';

const entryFile = './server.ts';
const basePath = '/api/rest';
const noImplicitAdditionalProperties = 'throw-on-extras';

const specOptions: ExtendedSpecConfig = {
  entryFile,
  basePath,
  noImplicitAdditionalProperties,
  outputDirectory: '../dist',
  controllerPathGlobs: [`${__dirname}/controllers/**/*Controller.ts`],
  securityDefinitions: {
    user: {
      type: 'apiKey',
      name: 'authtoken',
      in: 'header',
    },
    admin: {
      type: 'apiKey',
      name: 'authtoken',
      in: 'header',
    },
  },
  specVersion: 3,
};

const routeOptions: ExtendedRoutesConfig = {
  basePath,
  entryFile,
  noImplicitAdditionalProperties,
  routesDir: `${__dirname}/router/routes/generated`,
};

export const tsoaSetup = async () => {
  await generateSpec(specOptions);
  await generateRoutes(routeOptions);
};
