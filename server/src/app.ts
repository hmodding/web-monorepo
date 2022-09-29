import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { RequestHandler } from 'express';
import cfg from './cfg';
import { RegisterRoutes } from './router/routes/generated/routes';

export const app = express();