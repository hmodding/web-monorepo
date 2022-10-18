import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../types/HttpStatusCode';

export const internalServerErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = HttpStatusCode.InternalServerError;
  console.warn(
    `❗ ${status} INTERNAL SERVER ERROR:`,
    '\n  url:',
    req.url,
    '\n  body:',
    req.body,
    '\n  error:',
    err,
  );
  res.status(status).send({ error: 'Something went wrong! Sorry' });
};
