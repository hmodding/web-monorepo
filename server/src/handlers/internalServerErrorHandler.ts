import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../types/HttpStatusCode';

export const internalServerErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);
  res
    .status(HttpStatusCode.InternalServerError)
    .send({ error: 'Something went wrong! Sorry' });
};
