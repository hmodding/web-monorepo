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
import { LauncherVersionDto } from '../../../shared/dto/LauncherVersionDto';
import { LauncherVersionService } from '../services/LauncherVersionService';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/launcherVersions')
export class LauncherVersionController extends Controller {
  @Get()
  @Security('everyone')
  public async list(@Query() sort?: string) {
    return LauncherVersionService.getAll(sort);
  }

  @Get('/{version}')
  @Security('everyone')
  public async read(@Path() version: string) {
    return LauncherVersionService.getByVersion(version);
  }

  @Post()
  @Security('api_key', ['admin'])
  public async create(@Body() body: LauncherVersionDto) {
    const newLauncherVersion = await LauncherVersionService.releaseNew(body);

    this.setStatus(HttpStatusCode.Created);
    return newLauncherVersion;
  }
}
