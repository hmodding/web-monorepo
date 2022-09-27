import {
  ModVersionCreateData,
  ModVersionUpdateData,
} from '../controllers/ModVersionController';
import { notifier } from '../discord/DiscordNotifier';
import { ModVersion } from '../entities/ModVersion';
import { User } from '../entities/User';
import { AbstractService } from './AbstractService';
import { ModService } from './ModService';

export class ModVersionService extends AbstractService {
  static async isCreateAllowed(modId: string, user: User) {
    return user.isAdmin || (await ModService.ownsMod(modId, user.username));
  }

  static async isUpdateAllowed(id: number, user: User) {
    const modVersion = await ModVersion.findOneBy({ id });
    return this.isCreateAllowed(modVersion!.modId, user);
  }

  static async create(data: ModVersionCreateData) {
    const modVersionToCreate = new ModVersion();
    modVersionToCreate.modId = data.modId;
    modVersionToCreate.version = data.version;
    modVersionToCreate.changelog = 'This is the first version';
    modVersionToCreate.downloadUrl = data.downloadUrl!;
    modVersionToCreate.downloadCount = 0;
    modVersionToCreate.minRaftVersionId = data.minRaftVersionId;
    modVersionToCreate.maxRaftVersionId = data.maxRaftVersionId;
    modVersionToCreate.definiteMaxRaftVersion = data.definiteMaxRaftVersion;
    modVersionToCreate.fileHashes = data.fileHashes;

    const createdModVersion = await modVersionToCreate.save();
    const newModVersion = await ModVersion.findOne({
      where: { id: createdModVersion.id },
      relations: ['mod'],
    });

    if (newModVersion) {
      notifier.sendModVersionReleaseNotification(newModVersion, true);
    } else {
      console.warn('could not find new mod version with associations!', {
        id: createdModVersion.id,
      });
    }

    return newModVersion;
  }

  static async update({
    version,
    changelog,
    minRaftVersionId,
    maxRaftVersionId,
    definiteMaxRaftVersion,
  }: ModVersionUpdateData) {
    const modVersion = new ModVersion();
    modVersion.version = version;
    modVersion.changelog = changelog;
    modVersion.minRaftVersionId = minRaftVersionId;
    modVersion.maxRaftVersionId = maxRaftVersionId;
    modVersion.definiteMaxRaftVersion = definiteMaxRaftVersion;

    return modVersion.save();
  }
}
