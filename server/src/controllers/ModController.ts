import {
  Body,
  Controller,
  Get,
  Header,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
} from 'tsoa';
import { ILike } from 'typeorm';
import { ModCreateDto, ModUpdateDto } from '../../../shared/dto/ModDto';
import { ApiError } from '../errors/ApiError';
import { ModService } from '../services/ModService';
import { SessionService } from '../services/SessionService';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/mods')
export class ModController extends Controller {
  @Get()
  @Security('everyone')
  public async list(
    @Query() author?: string,
    @Query() sort?: string,
    @Query() q?: string,
  ) {
    return await ModService.getAll(
      { author, id: q ? ILike(q) : undefined },
      sort,
    );
  }

  /**
   * MUST be defined before /{id} otherwise it won't work
   * @returns list of most liked mods
   */
  @Get('/mostLiked')
  @Security('everyone')
  public async listMostLiked() {
    this.setStatus(200);
    return await ModService.getMostLiked();
  }

  /**
   * MUST be defined before /{id} otherwise it won't work
   * @returns list of most downloaded mods
   */
  @Get('/mostDownloaded')
  @Security('everyone')
  public async listMostDownloaded() {
    this.setStatus(200);
    return await ModService.getMostDownloaded();
  }

  /**
   * MUST be defined before /{id} otherwise it won't work
   * @returns mod-categories
   */
  @Get('/categories')
  @Security('everyone')
  public async listModCategories() {
    return ModService.getCategories();
  }

  @Get('/{id}')
  @Security('everyone')
  public async read(@Path() id: string) {
    const mod = await ModService.getById(id);

    if (!mod) {
      this.setStatus(HttpStatusCode.NotFound);
      return;
    }

    return mod;
  }

  @Post()
  @Security('user')
  public async create(
    @Body()
    data: ModCreateDto,
  ) {
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
    @Header() authtoken: string,
    @Path() id: string,
    @Body() data: ModUpdateDto,
  ) {
    const session = (await SessionService.getByToken(authtoken))!;

    if (!(await ModService.isUpdateAllowed(id, session.user!))) {
      this.setStatus(403);
      return { error: 'You are not the owner of the mod!' };
    }

    data.id = id;

    return await ModService.update(data);
  }
}
