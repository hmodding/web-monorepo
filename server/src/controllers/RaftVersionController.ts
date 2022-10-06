import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  Security,
} from 'tsoa';
import { RaftVersionDto } from '../../../shared/dto/RaftVersionDto';
import { ajv } from '../ajv';
import { RaftVersion } from '../entities/RaftVersion';
import { RaftVersionService } from '../services/RaftVersionService';
import { HttpStatusCode } from '../types/HttpStatusCode';

type RaftVersionCreateKeys = 'version' | 'buildId' | 'title' | 'releasedAt';

interface RaftVersionCreateBody
  extends Pick<RaftVersion, RaftVersionCreateKeys> {}

interface RaftVersionUpdateBody extends RaftVersionCreateBody {}

@Route('/raftVersions')
export class RaftVersionController extends Controller {
  @Get()
  @Security('everyone')
  public async list(@Query() sort?: string) {
    this.setStatus(HttpStatusCode.Ok);
    return RaftVersionService.getAll(sort);
  }

  @Get('/{id}')
  @Security('everyone')
  public async read(@Path() id: number) {
    this.setStatus(HttpStatusCode.Accepted);
    return RaftVersionService.getById(id);
  }

  @Post()
  @Security('admin')
  public async create(@Body() body: RaftVersionDto) {
    const isValidCreateData = await RaftVersionService.isValidCreateData(body);

    if (!isValidCreateData) {
      this.setStatus(HttpStatusCode.BadRequest);
      return ajv.errors;
    }

    this.setStatus(HttpStatusCode.Created);
    return RaftVersionService.create(body);
  }

  @Put('/{id}')
  @Security('admin')
  public async update(@Path() id: number, @Body() body: RaftVersionUpdateBody) {
    const isValidUpdateData = RaftVersionService.isValidUpdateData(body);

    if (!isValidUpdateData) {
      this.setStatus(HttpStatusCode.BadRequest);
      return { error: 'Invalid form' };
    }

    this.setStatus(HttpStatusCode.Ok);
    return RaftVersionService.update(id, body);
  }
}
