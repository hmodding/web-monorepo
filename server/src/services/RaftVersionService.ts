import dayjs from 'dayjs';
import { RaftVersionDto } from '../../../shared/dto/RaftVersionDto';
import { RaftVersion } from '../entities/RaftVersion';
import { ApiError } from '../errors/ApiError';
import { schema as addRaftVersionSchema } from '../forms/addRaftVersionForm';
import { schema as editRaftVersionSchema } from '../forms/editRaftVersionForm';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { validateData } from '../utils';
import { AbstractService } from './AbstractService';

type RaftVersionCreateKeys = 'version' | 'buildId' | 'title' | 'releasedAt';

interface RaftVersionCreateData
  extends Pick<RaftVersion, RaftVersionCreateKeys> {}

interface RaftVersionUpdateData extends RaftVersionCreateData {}

export class RaftVersionService extends AbstractService {
  static async getAll(sort?: string) {
    return RaftVersion.find({
      order: this.parseSort(sort),
    });
  }

  static async getById(id: number) {
    return RaftVersion.findBy({ id });
  }

  static async create(data: RaftVersionDto) {
    const raftVersionToCreate = new RaftVersion();
    raftVersionToCreate.version = data.version;
    raftVersionToCreate.buildId = data.buildId;
    raftVersionToCreate.title = data.title;
    raftVersionToCreate.releasedAt = dayjs(data.releasedAt).toDate();

    const createdRaftVersion = await raftVersionToCreate.save();

    return createdRaftVersion;
  }

  static async update(id: number, data: RaftVersionUpdateData) {
    const raftVersionToUpdate = await RaftVersion.findOneBy({ id });

    if (!raftVersionToUpdate) {
      throw new ApiError(
        HttpStatusCode.NotFound,
        `Couldn't find a raft-version with id: ${id}`,
      );
    }

    raftVersionToUpdate.version = data.version;
    raftVersionToUpdate.buildId = data.buildId;
    raftVersionToUpdate.title = data.title;
    raftVersionToUpdate.releasedAt = data.releasedAt;

    const updatedRaftVersion = await raftVersionToUpdate.save();

    return updatedRaftVersion;
  }

  static isValidCreateData(data: any) {
    return validateData(data, addRaftVersionSchema);
  }

  static isValidUpdateData(data: any) {
    return validateData(data, editRaftVersionSchema);
  }
}
