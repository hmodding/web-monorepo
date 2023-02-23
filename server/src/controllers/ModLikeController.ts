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
import { ModLikeDto } from '../../../shared/dto/ModLikeDto';
import { ModLikeService } from '../services/ModLikeService';
import { SessionService } from '../services/SessionService';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/modLikes')
export class ModLikeController extends Controller {
  @Get()
  @Security('api_key', ['user'])
  public async list(@Header() authtoken: string) {
    const session = await SessionService.getByToken(authtoken);

    if (!session?.user) {
      this.setStatus(HttpStatusCode.Unauthorized);
      return { error: 'Invalid session!' };
    }

    return ModLikeService.getAllByUserId(session.user.id);
  }

  @Post()
  @Security('api_key', ['user'])
  public async create(
    @Header() authtoken: string,
    @Body() { modId }: ModLikeDto,
  ) {
    const session = await SessionService.getByToken(authtoken);
    const modLike = ModLikeService.create(modId!, session!.user!.id);

    this.setStatus(201);
    return modLike;
  }

  @Delete('/{modId}')
  @Security('api_key', ['user'])
  public async delete(
    @Header('authtoken') authToken: string,
    @Path() modId: string,
  ) {
    const session = await SessionService.getByToken(authToken);

    await ModLikeService.delete(modId, session!.user!.id);

    return { success: true };
  }
}
