import { LoaderVersionDto } from '../../../shared/dto/LoaderVersionDto';
import { notifier } from './discord/DiscordNotifierService';
import { LoaderVersion } from '../entities/LoaderVersion';
import { ApiError } from '../errors/ApiError';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { AbstractService } from './AbstractService';

const REQUIRED_RELATIONS = ['raftVersion'];

export class LoaderVersionService extends AbstractService {
  static getAll(sort?: string) {
    return LoaderVersion.find({
      order: this.parseSort(sort),
      relations: [...REQUIRED_RELATIONS],
    });
  }

  static getByRmlVersion(rmlVersion: string) {
    return LoaderVersion.findOne({
      where: { rmlVersion },
      relations: [...REQUIRED_RELATIONS],
    });
  }

  /**
   * create a new loader version and send a notification
   * @param dto
   */
  static async releaseNew(dto: LoaderVersionDto) {
    try {
      const newLoaderVersion = LoaderVersion.create(dto);
      newLoaderVersion.timestamp = new Date();

      const savedLoaderVersion = await LoaderVersion.save(newLoaderVersion);
      const dbLoaderVersion = await LoaderVersion.findOne({
        where: { rmlVersion: savedLoaderVersion.rmlVersion },
        relations: ['raftVersion'],
      });
      if (dbLoaderVersion) {
        notifier.sendLoaderVersionReleaseNotification(dbLoaderVersion);
      } else {
        console.warn('❗ Failed to grab loader version from db!');
      }

      return savedLoaderVersion;
    } catch (err) {
      const { message } = err as Error;
      throw new ApiError(HttpStatusCode.InternalServerError, message);
    }
  }
}
