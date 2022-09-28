import { Controller, Delete, Get, Path, Route, Security } from 'tsoa';
import { ScheduledModDeletion } from '../entities/ScheduledModDeletion';
import { SessionService } from '../services/SessionService';
import { HttpStatusCode } from '../types/HttpStatusCode';

type ScheduledModDeletionCreateKeys = 'modId';

interface ScheduledModDeletionCreateBody
  extends Pick<ScheduledModDeletion, ScheduledModDeletionCreateKeys> {}

@Route('/session')
export class SessionController extends Controller {
  @Get('/{token}')
  @Security('everyone')
  public async read(@Path() token: string) {
    const session = await SessionService.getByToken(token);

    if (!session) {
      this.setStatus(HttpStatusCode.BadRequest);
      return { error: 'Session not found' };
    }

    this.setStatus(HttpStatusCode.Ok);
    return session;
  }

  @Delete('/{token}')
  @Security('everyone')
  public async delete(@Path() token: string) {
    await SessionService.deleteByToken(token);

    this.setStatus(HttpStatusCode.Ok);
    return { success: true };
  }
}
