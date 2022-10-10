import FileType from 'file-type';
import {
  ModVersionCreateDto,
  ModVersionDto,
} from '../../../shared/dto/ModVersionDto';
import { cfg } from '../cfg';
import { ModVersion } from '../entities/ModVersion';
import { RaftVersion } from '../entities/RaftVersion';
import { User } from '../entities/User';
import { ApiError } from '../errors/ApiError';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { AbstractService } from './AbstractService';
import { notifier } from './discord/DiscordNotifierService';
import { fileManager } from './FileManagerService';
import { ModService } from './ModService';

export class ModVersionService extends AbstractService {
  static async isCreateAllowed(modId: string, user: User) {
    return user.isAdmin || (await ModService.ownsMod(modId, user.username!));
  }

  static async isUpdateAllowed(user: User) {
    const modVersion = await ModVersion.findOneBy({ id: user.id });
    return this.isCreateAllowed(modVersion!.modId, user);
  }

  static async create(data: ModVersionCreateDto) {
    if (!data.file) {
      throw new ApiError(HttpStatusCode.BadRequest, 'missing file!');
    }

    const encoding = 'base64';
    const buffer = Buffer.from(data.file.base64, encoding);
    const fileType = await FileType.fromBuffer(buffer);

    if (!fileType || !cfg.validMimeTypes.includes(fileType.mime)) {
      console.warn('    ❗ fileType: ', fileType);
      throw new ApiError(
        HttpStatusCode.Forbidden,
        `file-type is not allowed: ${fileType?.mime || 'n/a'}!`,
      );
    }

    const filename = `${data.modId}-${data.version}.rmod`;
    const { url, md5, sha256 } = await fileManager.createModVersionFile(
      data.modId!,
      data.version!,
      filename,
      buffer,
    );
    const minRaftVersion = await RaftVersion.findOneBy({
      id: data.minRaftVersionId,
    });
    const maxRaftVersion = await RaftVersion.findOneBy({
      id: data.maxRaftVersionId,
    });
    delete data.minRaftVersionId;
    delete data.maxRaftVersionId;
    const newModVersion = ModVersion.create(data);
    newModVersion.downloadCount = 0;
    newModVersion.minRaftVersion = minRaftVersion!;
    newModVersion.maxRaftVersion = maxRaftVersion!;
    newModVersion.definiteMaxRaftVersion = !!data.definiteMaxRaftVersion;
    newModVersion.downloadUrl = url;
    newModVersion.fileHashes = { md5, sha256 };

    const createdModVersion = await ModVersion.save(newModVersion);
    const dbModVersion = await ModVersion.findOne({
      where: { id: createdModVersion.id },
      relations: ['mod'],
    });

    if (dbModVersion) {
      notifier.sendModVersionReleaseNotification(dbModVersion, true);
    } else {
      console.warn('could not find new mod version with associations!', {
        id: createdModVersion.id,
      });
    }

    return dbModVersion;
  }

  static async update(data: ModVersionDto) {
    const modVersion = ModVersion.create(data);

    return ModVersion.save(modVersion);
  }
}
