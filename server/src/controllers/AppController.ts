// noinspection ES6PreferShortImport

import { Controller, Get, Route, Security } from 'tsoa';

import pkg from '../../package.json';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/app')
export class AppController extends Controller {
  @Get('/info')
  @Security('everyone')
  public async signUp() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      status: 'online',
      version: pkg.version,
    };
  }
}
