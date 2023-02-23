import dayjs, { UnitTypeShort } from 'dayjs';
import { Body, Controller, Header, Post, Route, Security } from 'tsoa';
import { ScheduledModDeletionDto } from '../../../shared/dto/ScheduledModDeletionDto';
import { cfg } from '../cfg';
import { ScheduledModDeletion } from '../entities/ScheduledModDeletion';
import { ModService } from '../services/ModService';
import { SessionService } from '../services/SessionService';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/scheduledModDeletions')
export class ScheduledModDeletionController extends Controller {
  @Post()
  @Security('api_key', ['admin'])
  public async create(
    @Header() authtoken: string,
    @Body() body: ScheduledModDeletionDto,
  ) {
    const session = await SessionService.getByToken(authtoken);
    const isDeleteAllowed = await ModService.isDeleteAllowed(
      body.modId!,
      session!.user!,
    );

    if (!isDeleteAllowed) {
      this.setStatus(HttpStatusCode.Unauthorized);
      return { error: 'You are not the owner of the mod!' };
    }

    const add = cfg.scheduledDeletionTime;
    const amount = Number(add.match('^\\d+')![0]);
    const unit = add.match('[A-Za-z]+$')![0] as UnitTypeShort;
    const deletionTime = dayjs().add(amount, unit).toDate();

    const toCreate = new ScheduledModDeletion();
    toCreate.modId = body.modId!;
    toCreate.deletionTime = deletionTime;

    const created = toCreate.save();

    this.setStatus(HttpStatusCode.Created);
    return created;
  }
}
