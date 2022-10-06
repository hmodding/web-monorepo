import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import { generateRoutes, generateSpec } from 'tsoa';
import { cfg } from './cfg';
import { internalServerErrorHandler } from './handlers/internalServerErrorHandler';
import { notFoundHandler } from './handlers/notFoundHandler';
import { unauthorizedHandler } from './handlers/unauthorizedHandler';
import { tsoaRouteOptions, tsoaSpecOptions } from './tsoaConfig';

export const server = express();
server.use(cors());
server.use(
  json({
    limit: cfg.requestSizeLimit,
  }) as RequestHandler,
);
server.use(urlencoded({ extended: false }) as RequestHandler);

export const startServer = async () => {
  const port = process.env.PORT || 3000;

  await generateSpec(tsoaSpecOptions); // generates {@link: router/routes.ts}
  await generateRoutes(tsoaRouteOptions); //generates {@link: ../public/swagger.json}
  require('./router/routes').RegisterRoutes(server); //lazy-load because its a generated file otherwise an compilation error would be thrown

  // DO NOT use error handlers before registering routes!
  server.use(internalServerErrorHandler);
  server.use(notFoundHandler);
  server.use(unauthorizedHandler);

  server.listen(port, () => {
    console.log('listening at http://%s:%s', 'localhost', port);
  });
};
