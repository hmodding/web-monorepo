import express from 'express';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';

import cfg from './cfg';

const app = express();
app.use(
  json({
    limit: cfg.requestSizeLimit,
  }),
);
app.use(urlencoded({ extended: false }));
app.use(cors());

export default app;
