import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Path,
  Post,
  Route,
  Security,
} from 'tsoa';
import { ModLike } from '../entities/ModLike';
import { ModLikeService } from '../services/ModLikeService';
import { SessionService } from '../services/SessionService';
import { HttpStatusCode } from '../types/HttpStatusCode';

interface ModLikeCreateData extends Pick<ModLike, 'modId'> {}

@Route('/modLikes')
export class ModLikeController extends Controller {
  @Get()
  @Security('user')
  public async list(@Header() authtoken: string) {
    const session = await SessionService.getByToken(authtoken);

    if (!session?.user) {
      this.setStatus(HttpStatusCode.Unauthorized);
      return { error: 'Invalid session!' };
    }

    return ModLikeService.getAllByUserId(session.user.id);
  }

  @Post()
  @Security('user')
  public async create(
    @Header() authtoken: string,
    @Body() { modId }: ModLikeCreateData,
  ) {
    const session = await SessionService.getByToken(authtoken);
    const modLike = ModLikeService.create(modId, session!.user!.id);

    this.setStatus(201);
    return modLike;
  }

  @Delete('/{modId}')
  @Security('user')
  public async delete(
    @Header('authtoken') authToken: string,
    @Path() modId: string,
  ) {
    const session = await SessionService.getByToken(authToken);

    await ModLikeService.delete(modId, session!.user!.id);

    return { sucess: true };
  }
}
