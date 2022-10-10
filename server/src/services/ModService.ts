import FileType from 'file-type';
import { FindOptionsWhere } from 'typeorm';
import { ModCreateDto } from '../../../shared/dto/ModCreateDto';
import { ModDto } from '../../../shared/dto/ModDto';
import { modCategories } from '../../../shared/modCategories';
import { getSchema } from '../../resources/schemas/mod/addModSchema';
import { cfg } from '../cfg';
import { Mod } from '../entities/Mod';
import { User } from '../entities/User';
import { ApiError } from '../errors/ApiError';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { validateData } from '../utils';
import { AbstractService } from './AbstractService';
import { fileManager } from './FileManagerService';
import { ModVersionService } from './ModVersionService';

export class ModService extends AbstractService {
  static async getAll(where?: FindOptionsWhere<Mod>, sort?: string) {
    return await Mod.find({
      order: this.parseSort(sort),
      where,
    });
  }

  static async getById(id: string, sort?: string) {
    const mod = await Mod.findOne({
      where: { id },
      select: [
        'id',
        'author',
        'bannerImageUrl',
        'iconImageUrl',
        'category',
        'description',
        'readme',
        'title',
      ],
      relations: {
        versions: {},
        likes: true,
      },
    });
    const modDto = (mod as unknown) as ModDto;
    modDto.likeCount = mod?.likes?.length || 0;

    return modDto;
  }

  static async getMostLiked(limit: number = 3) {
    console.log('get most liked mods');
    return await Mod.query(MOST_LIKED_MODS_QUERY, [limit]);
  }

  static async getMostDownloaded(limit: number = 3) {
    console.log('get most downloaded mods');
    return await Mod.query(MOST_DOWNLOADED_MODS_QUERY, [limit]);
  }

  static getCategories() {
    return modCategories;
  }

  static async isUpdateAllowed(modId: string, user: User) {
    return user.isAdmin || (await this.ownsMod(modId, user.username));
  }

  static async isDeleteAllowed(modId: string, user: User) {
    return user.isAdmin || (await this.ownsMod(modId, user.username));
  }

  static async ownsMod(modId: string, username: string) {
    const mod = await Mod.findOneBy({ id: modId });

    return mod?.author === username;
  }

  static async create(data: ModCreateDto) {
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

    try {
      const filename = `${data.id}-${data.version}.rmod`;
      const { url, md5, sha256 } = await fileManager.createModVersionFile(
        data.id!,
        data.version!,
        filename,
        buffer,
      );
      const mod = Mod.create(data);
      await Mod.save(mod);
      await ModVersionService.create({
        modId: mod.id,
        definiteMaxRaftVersion: data.definiteMaxRaftVersion!,
        downloadUrl: url,
        fileHashes: { md5, sha256 },
        version: data.version!,
        maxRaftVersionId: data.maxRaftVersionId,
        minRaftVersionId: data.minRaftVersionId,
      });
      const dbMod = Mod.findOne({
        where: { id: mod.id },
        relations: ['versions'],
      });

      return dbMod;
    } catch (err) {
      console.warn('    ❗ error creating mod:', err);
      throw new ApiError(
        HttpStatusCode.InternalServerError,
        'file upload failed! (sorry)',
      );
    }
  }

  static async update(data: ModDto) {
    const savedMod = Mod.create(data);
    return savedMod;
  }

  static async isValidCreateData(data: ModCreateDto) {
    const addModSchema = await getSchema();

    return validateData(data, addModSchema);
  }
}

const MOST_LIKED_MODS_QUERY = `
  SELECT 
    *, 
    (SELECT COUNT(*) FROM "ModLikes" WHERE "ModLikes"."modId" = "mods"."id")::int AS likes
  FROM "mods"
  ORDER BY likes DESC, "mods".title DESC
  LIMIT $1`;

const MOST_DOWNLOADED_MODS_QUERY = `
    SELECT *,
    (
        CASE
            WHEN (
                SELECT SUM("downloadCount")
                from "mod-versions"
                WHERE "mod-versions"."modId" = "mods"."id"
                    AND "mod-versions"."downloadCount" IS NOT NULL
            ) IS NOT NULL THEN (
                SELECT SUM("downloadCount")
                from "mod-versions"
                WHERE "mod-versions"."modId" = "mods"."id"
                    AND "mod-versions"."downloadCount" IS NOT NULL
            )
            ELSE 0
        END
    ) AS "totalDownloads"
  FROM "mods"
  GROUP BY id
  ORDER BY "totalDownloads" DESC
  LIMIT $1`;