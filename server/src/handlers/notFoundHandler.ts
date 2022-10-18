import { Request, Response } from 'express';
import { HttpStatusCode } from '../types/HttpStatusCode';

export const notFoundHandler = (req: Request, res: Response) => {
  const status = HttpStatusCode.NotFound;
  console.warn(
    `❗ ${status} NOT FOUND:`,
    '\n  url:',
    req.url,
    '\n  body:',
    req.body,
  );
  res.status(status).send({
    message: 'Not Found',
  });
};
