// noinspection ES6PreferShortImport

import {NextFunction, Request as ExRequest, Response as ExResponse} from "express";
import {ValidateError} from "tsoa";
import {HttpStatusCode} from "../types/HttpStatusCode";

export const errorHandler = (err: unknown, req: ExRequest, res: ExResponse, next: NextFunction) => {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    const status = HttpStatusCode.InternalServerError;
    console.warn(
      `❗${status} ERROR:`,
      '\n  url:',
      req.url,
      '\n  body:',
      req.body,
      '\n  error:',
      err,
    );
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }

  next();
}