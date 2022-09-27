import { Body, Controller, Get, Path, Post, Route, Security } from 'tsoa';
import { LauncherVersion } from '../entities/LauncherVersion';
import {
  LauncherVersionService,
  UploadFile,
} from '../services/LauncherVersionService';

interface LauncherVersionCreateData
  extends Pick<LauncherVersion, 'version' | 'changelog'> {
  file: UploadFile;
}

@Route('/launcherVersions')
export class LauncherVersionController extends Controller {
  @Get()
  @Security('everyone')
  public async list() {
    return LauncherVersionService.getAll();
  }

  @Get('/{version}')
  @Security('everyone')
  public async read(@Path() version: string) {
    return LauncherVersionService.getByVersion(version);
  }

  @Post()
  @Security('admin')
  public async create(
    @Body() { version, changelog, file }: LauncherVersionCreateData,
  ) {
    LauncherVersionService.releaseNew(version, changelog, file);
  }
}
