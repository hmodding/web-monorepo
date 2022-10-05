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
import { LoaderVersion } from '../entities/LoaderVersion';
import { LoaderVersionService } from '../services/LoaderVersionService';

export interface LoaderVersionCreateData
  extends Pick<LoaderVersion, 'rmlVersion' | 'readme'> {}

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
  @Security('admin')
  public async create(@Body() { rmlVersion, readme }: LoaderVersionCreateData) {
    LoaderVersionService.releaseNew(rmlVersion, readme);
  }
}
