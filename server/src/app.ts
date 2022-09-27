import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import cfg from './cfg';
import router from './router';

const app = express();
app.use(
  json({
    limit: cfg.requestSizeLimit,
  }) as RequestHandler,
);
app.use(urlencoded({ extended: false }) as RequestHandler);
app.use(cors());
app.use(cfg.apiBase, router);

export default app;
