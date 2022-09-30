import { ExtendedRoutesConfig, ExtendedSpecConfig } from 'tsoa';
import { cfg } from './cfg';

const entryFile = `${__dirname}/app.ts`;
const basePath = cfg.apiBase;
const noImplicitAdditionalProperties = 'throw-on-extras';
const controllerPathGlobs = [`${__dirname}/controllers/**/*Controller.ts`];

/**
 * DO NOT tamper with unless you know what you are doing!
 * {@link https://tsoa-community.github.io/reference/interfaces/extendedroutesconfig.html}
 */
export const tsoaRouteOptions: ExtendedRoutesConfig = {
  entryFile,
  basePath,
  noImplicitAdditionalProperties,
  controllerPathGlobs,
  routesDir: `${__dirname}/router/`,
  routesFileName: 'routes.ts',
  authenticationModule: `${__dirname}/authenticators/expressAuthenticator.ts`,
};

/**
 * DO NOT tamper with unless you know what you are doing!
 * {@link https://tsoa-community.github.io/reference/interfaces/extendedspecconfig.html}
 */
export const tsoaSpecOptions: ExtendedSpecConfig = {
  entryFile,
  basePath,
  controllerPathGlobs,
  noImplicitAdditionalProperties,
  outputDirectory: `${__dirname}/../public`,
  specFileBaseName: 'swagger',
  specVersion: 3,
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
};
