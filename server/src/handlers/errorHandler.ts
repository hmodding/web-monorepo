// noinspection ES6PreferShortImport

import {NextFunction, Request as ExRequest, Response as ExResponse} from "express";
import {ValidateError} from "tsoa";
import {HttpStatusCode} from "../types/HttpStatusCode";
import {AuthenticationError} from "../errors/AuthenticationError";
import {JsonWebTokenError} from "jsonwebtoken";

export const errorHandler = (err: unknown, req: ExRequest, res: ExResponse, next: NextFunction) => {
  if (err instanceof ValidateError) {
    const status = HttpStatusCode.BadRequest;
    //const json = {error: {message: 'Validation failed!', details: err?.fields}};
    console.warn(`Caught validation error for ${req.path}:`, err.fields);
    return res.status(status).json(err);
  } else if (err instanceof AuthenticationError) {
    const status = err.status;
    console.warn(`Caught authentication error for ${req.path}`);
    return res.status(status).json(err);
  } else if (err instanceof Error) {
    const status = HttpStatusCode.InternalServerError;
    console.warn(`Caught error for ${req.path}:`, req.body, err);
    return res.status(status).json(err);
  }

  next();
}