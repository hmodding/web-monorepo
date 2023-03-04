import {Controller, Delete, Get, Path, Route, Security} from 'tsoa';
import {HttpStatusCode} from '../types/HttpStatusCode';
import {SessionService} from "../services/SessionService";

@Route('/sessions')
export class SessionController extends Controller {
  @Get('/{token}')
  @Security('everyone')
  public async read(@Path() token: string) {
    const session = await SessionService.getBySid(token);

    if (!session) {
      this.setStatus(HttpStatusCode.BadRequest);
      return {error: 'Session not found'};
    }

    this.setStatus(HttpStatusCode.Ok);
    return session;
  }

  @Delete('/{token}')
  @Security('everyone')
  public async delete(@Path() token: string) {
    await SessionService.deleteBySid(token);

    this.setStatus(HttpStatusCode.Ok);
    return {success: true};
  }
}
