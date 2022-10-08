import { ModVersionDto } from '../../../shared/dto/ModVersionDto';
import { ModVersion } from '../entities/ModVersion';
import { User } from '../entities/User';
import { AbstractService } from './AbstractService';
import { notifier } from './discord/DiscordNotifier';
import { ModService } from './ModService';

export class ModVersionService extends AbstractService {
  static async isCreateAllowed(modId: string, user: User) {
    return user.isAdmin || (await ModService.ownsMod(modId, user.username!));
  }

  static async isUpdateAllowed(user: User) {
    const modVersion = await ModVersion.findOneBy({ id: user.id });
    return this.isCreateAllowed(modVersion!.modId, user);
  }

  static async create(data: ModVersionDto) {
    const modVersionToCreate = new ModVersion();
    modVersionToCreate.modId = data.modId!;
    modVersionToCreate.version = data.version!;
    modVersionToCreate.changelog = 'This is the first version';
    modVersionToCreate.downloadUrl = data.downloadUrl!;
    modVersionToCreate.downloadCount = 0;
    modVersionToCreate.minRaftVersionId = data.minRaftVersionId;
    modVersionToCreate.maxRaftVersionId = data.maxRaftVersionId;
    modVersionToCreate.definiteMaxRaftVersion = data.definiteMaxRaftVersion!;
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

  static async update(data: ModVersionDto) {
    const modVersion = ModVersion.create(data);

    return ModVersion.save(modVersion);
  }
}
