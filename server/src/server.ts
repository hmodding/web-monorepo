import express from 'express';
import { generateRoutes, generateSpec } from 'tsoa';
import { tsoaRouteOptions, tsoaSpecOptions } from './tsoaConfig';

export const server = express();

export const startServer = async () => {
  const port = process.env.PORT || 3000;

  await generateSpec(tsoaSpecOptions); // generates {@link router/routes.ts}
  await generateRoutes(tsoaRouteOptions); //generates {@link ../public/swagger.json}

  require('./router/routes').RegisterRoutes(server); //lazy-load because its a generated file otherwise and compilation error would occur

  server.listen(port, () => {
    console.log('listening at http://%s:%s', 'localhost', port);
  });
};
