import FileType from 'file-type';
import { DeepPartial, FindOptionsWhere } from 'typeorm';
import { cfg } from '../cfg';
import { ModCreateData } from '../controllers/ModController';
import { Mod } from '../entities/Mod';
import { User } from '../entities/User';
import { ApiError } from '../errors/ApiError';
import { getSchema } from '../forms/addModForm';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { validateData } from '../utils';
import { AbstractService } from './AbstractService';
import { fileManager, ObjectMeta } from './FileManagerService';
import { ModVersionService } from './ModVersionService';

export class ModService extends AbstractService {
  static async getAll(where?: FindOptionsWhere<Mod>, sort?: string) {
    return await Mod.find({
      order: this.parseSort(sort),
      where,
    });
  }

  static async getById(id: string, sort?: string) {
    return await Mod.findOne({
      where: { id },
      relations: ['versions', 'likes'],
    });
  }

  static async getMostLiked(limit: number = 3) {
    console.log('get most liked mods');
    return await Mod.query(MOST_LIKED_MODS_QUERY, [limit]);
  }

  static async getMostDownloaded(limit: number = 3) {
    console.log('get most downloaded mods');
    return await Mod.query(MOST_DOWNLOADED_MODS_QUERY, [limit]);
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

  static async create(data: ModCreateData) {
    const buffer = Buffer.from(data.file.base64);
    const fileType = await FileType.fromBuffer(buffer);

    if (!fileType || !cfg.validMimeTypes.includes(fileType.mime)) {
      throw new ApiError(HttpStatusCode.Forbidden, 'file-type is not allowed!');
    }

    try {
      const filename = `${data.id}-${data.version}.rmod`;
      const {
        url,
        md5,
        sha256,
      }: ObjectMeta = await fileManager.createModVersionFile(
        data.id,
        data.version,
        filename,
        buffer,
      );

      const createdMod = Mod.create(data);

      await ModVersionService.create({
        modId: createdMod.id,
        definiteMaxRaftVersion: data.definiteMaxRaftVersion,
        downloadUrl: url,
        fileHashes: { md5, sha256 },
        version: data.version,
        maxRaftVersionId: data.maxRaftVersionId,
        minRaftVersionId: data.minRaftVersionId,
      });
      const newMod = Mod.findOne({
        where: { id: createdMod.id },
        relations: ['versions'],
      });

      return newMod;
    } catch (err) {
      throw new ApiError(
        HttpStatusCode.InternalServerError,
        'file upload failed! (sorry)',
      );
    }
  }

  static async update(id: string, mod: DeepPartial<Mod>) {
    const modToSave = mod as Mod;
    modToSave.id = id;

    const savedMod = await modToSave.save();

    return savedMod;
  }

  static async isValidCreateData(data: any) {
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