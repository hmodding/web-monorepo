// noinspection ES6PreferShortImport

import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Security,
} from 'tsoa';
import { LoaderVersionDto } from '../../../shared/dto/LoaderVersionDto';
import { ApiError } from '../errors/ApiError';
import { LoaderVersionService } from '../services/LoaderVersionService';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/loaderVersions')
export class LoaderVersionController extends Controller {
  @Get()
  @Security('everyone')
  public async list(@Query() sort?: string) {
    return LoaderVersionService.getAll(sort);
  }

  @Get('/{rmlVersion}')
  @Security('everyone')
  public async read(@Path() rmlVersion: string) {
    return LoaderVersionService.getByRmlVersion(rmlVersion);
  }

  @Post()
  @Security('auth_token', ['admin'])
  public async create(@Body() body: LoaderVersionDto) {
    try {
      const newLoaderVersion = await LoaderVersionService.releaseNew(body);
      this.setStatus(HttpStatusCode.Created);
      return newLoaderVersion;
    } catch (err) {
      const { status, message } = err as ApiError;
      this.setStatus(status);
      return { error: message };
    }
  }
}
