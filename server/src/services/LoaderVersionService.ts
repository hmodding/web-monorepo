import { notifier } from '../discord/DiscordNotifier';
import { LoaderVersion } from '../entities/LoaderVersion';
import { AbstractService } from './AbstractService';

const REQUIRED_RELATIONS = ['raftVersion'];

export class LoaderVersionService extends AbstractService {
  static getAll() {
    const loaderVersions = LoaderVersion.find({
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
   * @param rmlVersion
   * @param readme
   */
  static async releaseNew(rmlVersion: string, readme?: string) {
    const newLoaderVersion = new LoaderVersion();
    newLoaderVersion.rmlVersion = rmlVersion;
    newLoaderVersion.readme = readme;
    newLoaderVersion.timestamp = new Date();

    const releasedLoaderVersion = await newLoaderVersion.save();
    notifier.sendLoaderVersionReleaseNotification(releasedLoaderVersion);
  }
}
