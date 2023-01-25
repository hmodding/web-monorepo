import {json, OptionsJson, OptionsUrlencoded, urlencoded} from 'body-parser';
import history from 'connect-history-api-fallback';
import cors from 'cors';
import express, {RequestHandler} from 'express';
import path from 'path';
import {generateRoutes, generateSpec} from 'tsoa';
import {cfg} from './cfg';
import {badRequestHandler} from './handlers/badRequestHandler';
import {internalServerErrorHandler} from './handlers/internalServerErrorHandler';
import {notFoundHandler} from './handlers/notFoundHandler';
import {unauthorizedHandler} from './handlers/unauthorizedHandler';
import {tsoaRouteOptions, tsoaSpecOptions} from './tsoaConfig';

export const server = express();

export const startServer = async () => {
  console.log('⏳ starting server...');
  const host = 'localhost';
  const port = process.env.PORT || 3000;
  const jsonOptions: OptionsJson = {limit: cfg.requestSizeLimit};
  const urlencodedOptions: OptionsUrlencoded = {extended: false};
  const staticAppFilesMiddleware = express.static(
    path.join(__dirname, '..', '..', 'app/dist'),
  );

  server.use(cors());
  console.log('    ✔️ bound CORS');
  server.use(json(jsonOptions) as RequestHandler);
  console.log(`    ✔️ bound json body-parser: `, jsonOptions);
  server.use(urlencoded(urlencodedOptions) as RequestHandler);
  console.log(`    ✔️ bound url-encoded: `, urlencodedOptions);

  //serve app
  server.use(staticAppFilesMiddleware);
  server.use(history({index: '/index.html'}));
  server.use(staticAppFilesMiddleware);

  if (process.env.NODE_ENV === 'development') {
    await generateSpec(tsoaSpecOptions); // generates {@link: router/routes.ts}
    console.log('    ✔️ generated specs');
    await generateRoutes(tsoaRouteOptions); //generates {@link: ../public/swagger.json}
    console.log('    ✔️ generated routes');
  }
  require('./router/routes').RegisterRoutes(server); //lazy-load because its a generated file otherwise an compilation error would be thrown
  console.log('    ✔️ registered routes');

  // DO NOT use error handlers before registering routes!
  server.use(internalServerErrorHandler);
  console.log('    ✔️ bound internal-server-error-handler');
  server.use(notFoundHandler);
  console.log('    ✔️ bound not-found-handler');
  server.use(badRequestHandler);
  console.log('    ✔️ bound bad-request-handler');
  server.use(unauthorizedHandler);
  console.log('    ✔️ bound unauthorized-handler');

  server.listen(port, () => {
    console.log(`    📡 listening at http://${host}:${port}`);
    console.log('✅ server started!');
  });
};
