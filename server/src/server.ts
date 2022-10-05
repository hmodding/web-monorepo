import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { generateRoutes, generateSpec, ValidateError } from 'tsoa';
import { cfg } from './cfg';
import { notFoundHandler } from './handlers/notFoundHandler';
import { unauthorizedHandler } from './handlers/unauthorizedHandler';
import { tsoaRouteOptions, tsoaSpecOptions } from './tsoaConfig';
import { HttpStatusCode } from './types/HttpStatusCode';

export const server = express();
server.use(cors());
server.use(
  json({
    limit: cfg.requestSizeLimit,
  }) as RequestHandler,
);
server.use(urlencoded({ extended: false }) as RequestHandler);
server.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log('bla');
  if (err instanceof ValidateError) {
    console.warn(`Caught ValidationError for ${req.path}:`, err.fields);
    return res.status(HttpStatusCode.Unauthorized).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }

  if (err instanceof Error) {
    return res.status(HttpStatusCode.InternalServerError).json({
      message: 'Internal Server Error',
    });
  }

  next();
});

export const startServer = async () => {
  const port = process.env.PORT || 3000;

  await generateSpec(tsoaSpecOptions); // generates {@link: router/routes.ts}
  await generateRoutes(tsoaRouteOptions); //generates {@link: ../public/swagger.json}
  require('./router/routes').RegisterRoutes(server); //lazy-load because its a generated file otherwise an compilation error would be thrown

  // DO NOT use error handlers before registering routes!
  server.use(notFoundHandler);
  server.use(unauthorizedHandler);

  server.listen(port, () => {
    console.log('listening at http://%s:%s', 'localhost', port);
  });
};