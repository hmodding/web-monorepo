import { Request, Response } from 'express';
import { HttpStatusCode } from '../types/HttpStatusCode';

export const badRequestHandler = (req: Request, res: Response) => {
  const status = HttpStatusCode.BadRequest;
  console.warn(
    `❗ ${status} BAD REQUEST:`,
    '\n  url:',
    req.url,
    '\n  body:',
    req.body,
  );
  res.status(status).send({
    message: 'Bad Request',
  });
};
