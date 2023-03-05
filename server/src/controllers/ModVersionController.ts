// noinspection ES6PreferShortImport

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
import {
  ModVersionCreateDto,
  ModVersionDto,
} from '../../../shared/dto/ModVersionDto';
import { ModVersion } from '../entities/ModVersion';
import { ModVersionService } from '../services/ModVersionService';
import { HttpStatusCode } from '../types/HttpStatusCode';
import {User} from "../entities/User";

@Route('/modVersions')
export class ModVersionController extends Controller {
  @Get('/{id}')
  @Security('everyone')
  public async read(@Path() id: number) {
    return ModVersion.findOne({ where: { id }, relations: { mod: true } });
  }

  @Post()
  @Security('auth_token', ['user'])
  public async create(
    @Header() authtoken: string,
    @Body() data: ModVersionCreateDto,
  ) {
    const session = {user: {} as User};
    const isCreateAllowed = await ModVersionService.isCreateAllowed(
      data.modId!,
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
  @Security('auth_token', ['user'])
  public async update(
    @Header() authtoken: string,
    @Path() id: number,
    @Body() data: ModVersionDto,
  ) {
    const session = {user: {} as User}
    session!.user!.id = id;
    const isUpdateAllowed = await ModVersionService.isUpdateAllowed(
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
