import { Controller, Get, Route, Security } from 'tsoa';

import pkg from '../../package.json';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/')
export class AppController extends Controller {
  @Get()
  @Security('everyone')
  public async signUp() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      status: 'online',
      version: pkg.version,
    };
  }
}
