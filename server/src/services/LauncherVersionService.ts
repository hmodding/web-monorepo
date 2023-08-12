import { LauncherVersionDto } from '../../../shared/dto/LauncherVersionDto';
import { notifier } from './discord/DiscordNotifierService';
import { LauncherVersion } from '../entities/LauncherVersion';
import { AbstractService } from './AbstractService';
import { simpleFileManager } from "./SimpleFileManagerService";

export interface UploadFile {
  base64: string;
  name: string;
}

/**
 * uploads launcher-version file, creates launcher-version and sends discord notification
 * @param data
 */
export class LauncherVersionService extends AbstractService {
  static getAll(sort?: string) {
    return LauncherVersion.find({
      order: this.parseSort(sort),
    });
  }

  static getByVersion(version: string) {
    return LauncherVersion.findOneBy({ version });
  }

  static async releaseNew(dto: LauncherVersionDto) {
    const buffer = Buffer.from(dto.file!.base64, 'base64');
    const upload = await simpleFileManager.createLauncherVersionFile(
      dto.version,
      dto.file!.name,
      buffer,
    );

    const newLauncherVersion = LauncherVersion.create(dto);
    newLauncherVersion.downloadUrl = upload.url;
    newLauncherVersion.timestamp = new Date();
    const releasedLauncherVersion = await LauncherVersion.save(
      newLauncherVersion,
    );

    notifier.sendLauncherVersionReleaseNotification(releasedLauncherVersion);

    return releasedLauncherVersion;
  }
}
