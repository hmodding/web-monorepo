import { Request, Response } from 'express';
import { HttpStatusCode } from '../types/HttpStatusCode';

export const notFoundHandler = (req: Request, res: Response) => {
  const status = HttpStatusCode.NotFound;
  console.log(`### ${status} NOT FOUND:`);
  console.log(req.url, req.body);
  res.status(status).send({
    message: 'Not Found',
  });
};
