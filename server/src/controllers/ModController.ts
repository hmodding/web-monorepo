// noinspection ES6PreferShortImport

import {
  Body,
  Controller, Delete,
  Get,
  Header,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
  Request,
} from 'tsoa';
import {ModCreateDto, ModUpdateDto} from '../../../shared/dto/ModDto';
import {ApiError} from '../errors/ApiError';
import {ModService} from '../services/ModService';
import {HttpStatusCode} from '../types/HttpStatusCode';
import {User} from "../entities/User";
import {Request as ExRequest} from 'express';

@Route('/mods')
export class ModController extends Controller {
  @Get()
  @Security('everyone')
  public async list(
    @Query() author?: string,
    @Query() sort?: string,
    @Query() q?: string,
  ) {
    return await ModService.getAll({
      q,
      sort,
      author,
    });
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

  @Post('/{id}/like')
  @Security('auth_token', ['user'])
  public async like(
    @Request() request: any,
    @Path() id: string
  ) {
    console.log('JOJOJOJOJOOo')
    return {...request.jwt}
  }

  @Get('/{id}')
  @Security('everyone')
  public async read(@Path() id: string) {
    console.log('read mod with id:', id);
    const mod = await ModService.getById(id);

    if (!mod) {
      this.setStatus(HttpStatusCode.NotFound);
      return;
    }

    return mod;
  }

  @Post()
  @Security('auth_token', ['user'])
  public async create(
    @Body()
      data: ModCreateDto,
  ) {
    const isValidData = await ModService.isValidCreateData(data);

    if (!isValidData) {
      this.setStatus(403);
      return {error: 'Invalid form'};
    }

    try {
      return await ModService.create(data);
    } catch (err) {
      const apiErr = err as ApiError;
      this.setStatus(apiErr.status);
      return {error: apiErr.message};
    }
  }

  @Put('/{id}')
  @Security('auth_token', ['user'])
  public async update(
    @Header() authtoken: string,
    @Path() id: string,
    @Body() data: ModUpdateDto,
  ) {
    const session = {user: {} as User};

    if (!(await ModService.isUpdateAllowed(id, session.user!))) {
      this.setStatus(403);
      return {error: 'You are not the owner of the mod!'};
    }

    data.id = id;

    return await ModService.update(data);
  }

  @Delete("/{id}/like")
  @Security('auth_token', ['user'])
  public async unlike() {

  }
}
