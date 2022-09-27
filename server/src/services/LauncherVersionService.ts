import { notifier } from '../discord/DiscordNotifier';
import { LauncherVersion } from '../entities/LauncherVersion';
import { fileManager } from '../FileManager';
import { AbstractService } from './AbstractService';

export interface UploadFile {
  base64: string;
  name: string;
}

/**
 * uploads launcher-version file, creates launcher-version and sends discord notification
 * @param data
 */
export class LauncherVersionService extends AbstractService {
  static async releaseNew(
    version: string,
    changelog: string,
    file: UploadFile,
  ) {
    const buffer = Buffer.from(file.base64, 'base64');
    const upload = await fileManager.createLauncherVersionFile(
      version,
      file.name,
      buffer,
    );

    const newLauncherVersion = new LauncherVersion();
    newLauncherVersion.version = version;
    newLauncherVersion.changelog = changelog;
    newLauncherVersion.downloadUrl = upload.url;
    newLauncherVersion.timestamp = new Date();

    const releasedLauncherVersion = await newLauncherVersion.save();
    notifier.sendLauncherVersionReleaseNotification(releasedLauncherVersion);
  }

  static getAll() {
    return LauncherVersion.find();
  }

  static getByVersion(version: string) {
    return LauncherVersion.findOneBy({ version });
  }
}
