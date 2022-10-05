import { Request, Response } from 'express';
import { HttpStatusCode } from '../types/HttpStatusCode';

//TODO: is this actually called?
export const unauthorizedHandler = (req: Request, res: Response) => {
  const status = HttpStatusCode.Unauthorized;
  console.log(`### ${status} Unauthorized:`);
  console.log(req.url, req.body);
  res.status(status).send({
    message: 'Unauthorized',
  });
};
