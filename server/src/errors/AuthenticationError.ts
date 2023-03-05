// noinspection ES6PreferShortImport

import {ApiError} from "./ApiError";
import {HttpStatusCode} from "../types/HttpStatusCode";

export class AuthenticationError extends ApiError {
  constructor(
    public details: string = '',
    public isTokenExpired: boolean = false,
  ) {
    super(HttpStatusCode.Unauthorized, 'Authentication failed!');
  }
}