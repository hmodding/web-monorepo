import { Body, Controller, Get, Path, Post, Route, Security } from 'tsoa';
import { LoaderVersion } from '../entities/LoaderVersion';
import { LoaderVersionService } from '../services/LoaderVersionService';

export interface LoaderVersionCreateData
  extends Pick<LoaderVersion, 'rmlVersion' | 'readme'> {}

@Route('/loaderVersions')
export class LoaderVersionController extends Controller {
  @Get()
  @Security('everyone')
  public async list() {
    return LoaderVersionService.getAll();
  }

  @Get('/{rmlVersion}')
  @Security('everyone')
  public async read(@Path() rmlVersion: string) {
    return LoaderVersionService.getByRmlVersion(rmlVersion);
  }

  @Post()
  @Security('admin')
  public async create(@Body() { rmlVersion, readme }: LoaderVersionCreateData) {
    LoaderVersionService.releaseNew(rmlVersion, readme);
  }
}
