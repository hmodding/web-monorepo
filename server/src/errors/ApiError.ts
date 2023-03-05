// noinspection ES6PreferShortImport

import { HttpStatusCode } from '../types/HttpStatusCode';

export class ApiError extends Error {
  constructor(public status: HttpStatusCode, public message: string = '') {
    super(message);
  }
}
