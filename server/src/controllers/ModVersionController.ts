import {
  Body,
  Controller,
  Header,
  Path,
  Post,
  Put,
  Route,
  Security,
} from 'tsoa';
import { ModVersion } from '../entities/ModVersion';
import { ModVersionService } from '../services/ModVersionService';
import { SessionService } from '../services/SessionService';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { FileHashes } from './ModController';

type ModVersionCreateUpdateKeys =
  | 'version'
  | 'minRaftVersionId'
  | 'maxRaftVersionId'
  | 'definiteMaxRaftVersion';
type ModVersionCreateKeys =
  | ModVersionCreateUpdateKeys
  | 'modId'
  | 'downloadUrl';

type ModVersionUpdateKeys = ModVersionCreateUpdateKeys | 'changelog';

export interface ModVersionCreateData
  extends Pick<ModVersion, ModVersionCreateKeys> {
  fileHashes: FileHashes;
}

export interface ModVersionUpdateData
  extends Pick<ModVersion, ModVersionUpdateKeys> {}

@Route('/modVersions')
export class ModVersionController extends Controller {
  @Post()
  @Security('user')
  public async create(
    @Header() authtoken: string,
    @Body() data: ModVersionCreateData,
  ) {
    const session = await SessionService.getByToken(authtoken);
    const isCreateAllowed = await ModVersionService.isCreateAllowed(
      data.modId,
      session!.user!,
    );

    if (!isCreateAllowed) {
      this.setStatus(HttpStatusCode.Unauthorized);
      return { error: 'You are not the owner of the mod!' };
    }

    const createdModVersion = await ModVersionService.create(data);

    this.setStatus(HttpStatusCode.Created);
    return createdModVersion;
  }

  @Put('/{id}')
  @Security('user')
  public async update(
    @Header() authtoken: string,
    @Path() id: number,
    @Body() data: ModVersionUpdateData,
  ) {
    const session = await SessionService.getByToken(authtoken);
    const isUpdateAllowed = await ModVersionService.isUpdateAllowed(
      id,
      session!.user!,
    );

    if (!isUpdateAllowed) {
      this.setStatus(HttpStatusCode.Unauthorized);
      return { error: 'You are not the owner of the mod!' };
    }

    const modVersion = ModVersionService.update(data);

    this.setStatus(HttpStatusCode.Ok);
    return modVersion;
  }
}
