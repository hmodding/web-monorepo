import {
  Body,
  Controller,
  Get,
  Header,
  Path,
  Post,
  Put,
  Route,
  Security,
} from 'tsoa';
import { Mod } from '../entities/Mod';
import { ApiError } from '../errors/ApiError';
import { UploadFile } from '../services/LauncherVersionService';
import { ModService } from '../services/ModService';
import { SessionService } from '../services/SessionService';

type ModUpdateKeys =
  | 'title'
  | 'description'
  | 'readme'
  | 'category'
  | 'bannerImageUrl'
  | 'iconImageUrl'
  | 'repositoryUrl';
type ModCreateKeys = ModUpdateKeys | 'id';

type SupportedHashes = 'md5' | 'sha256';

export type FileHashes = Record<SupportedHashes, string>;

interface ModCreateUpdateData {
  minRaftVersionId: number;
  maxRaftVersionId: number;
  definiteMaxRaftVersion: boolean;
  version: string;
}

export interface ModUpdateData
  extends ModCreateUpdateData,
    Pick<Mod, ModUpdateKeys> {}

export interface ModCreateData
  extends ModCreateUpdateData,
    Pick<Mod, ModCreateKeys> {
  file: UploadFile;
}

@Route('/mods')
export class ModController extends Controller {
  @Get()
  @Security('everyone')
  public async list() {
    return await ModService.getAll();
  }

  @Get('/mostLiked')
  @Security('everyone')
  public async listMostLiked() {
    this.setStatus(200);
    return await ModService.getMostLiked();
  }

  // @Get('/{id}')
  // @Security('everyone')
  // public async read(@Path() id: string) {
  //   const mod = await ModService.getById(id);
  //   const likeCount = mod?.likes;

  //   return {
  //     ...mod,
  //     likeCount,
  //   };
  // }

  @Post()
  @Security('user')
  public async create(@Body() data: ModCreateData) {
    const isValidData = await ModService.isValidCreateData(data);

    if (!isValidData) {
      this.setStatus(403);
      return { error: 'Invalid form' };
    }

    try {
      return await ModService.create(data);
    } catch (err) {
      const apiErr = err as ApiError;
      this.setStatus(apiErr.status);
      return { error: apiErr.message };
    }
  }

  @Put('/{id}')
  @Security('user')
  public async update(
    @Header('authtoken') authToken: string,
    @Path() id: string,
    @Body() data: ModUpdateData,
  ) {
    const session = (await SessionService.getByToken(authToken))!;

    if (!(await ModService.isUpdateAllowed(id, session.user!))) {
      this.setStatus(403);
      return { error: 'You are not the owner of the mod!' };
    }

    return await ModService.update(id, data);
  }
}
