import { Request, Response } from 'express';
import { HttpStatusCode } from '../types/HttpStatusCode';

//TODO: is this actually called?
export const unauthorizedHandler = (req: Request, res: Response) => {
  const status = HttpStatusCode.Unauthorized;
  console.warn(
    `❗ ${status} UNAUTHORIZED:`,
    '\n  url:',
    req.url,
    '\n  body:',
    req.body,
  );
  res.status(status).send({
    message: 'Unauthorized',
  });
};
