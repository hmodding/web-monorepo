import {ILike} from 'typeorm';
import {ModCreateDto, ModDto} from '../../../shared/dto/ModDto';
import {modCategories} from '../../../shared/modCategories';
import {ModQueryParams} from '../../../shared/types/QueryParams';
import {getSchema} from '../../resources/schemas/mod/addModSchema';
import {Mod} from '../entities/Mod';
import {User} from '../entities/User';
import {ApiError} from '../errors/ApiError';
import {HttpStatusCode} from '../types/HttpStatusCode';
import {validateData} from '../utils';
import {AbstractService} from './AbstractService';
import {ModVersionService} from './ModVersionService';

export class ModService extends AbstractService {
  static async getAll({sort, author, q}: ModQueryParams) {
    return Mod.find<Mod>({
      order: sort ? this.parseSort(sort) : undefined,
      where: {
        author,
        title: q ? ILike('%' + q + '%') : undefined,
      },
    });
  }

  static async getById(id: string, sort?: string) {
    const mod = await Mod.createQueryBuilder('mod')
      .where('mod.id = :id', {id})
      .leftJoinAndSelect(
        'mod.versions',
        'versions',
        'versions.modId = :modId',
        {
          modId: id,
        },
      )
      .orderBy('versions.createdAt', 'DESC')
      .getOne();
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
    const mod = await Mod.findOneBy({id: modId});

    return mod?.author === username;
  }

  static async create(data: ModCreateDto) {
    try {
      const mod = Mod.create(data);
      await Mod.save(mod);
      await ModVersionService.create({
        modId: mod.id,
        changelog: 'This is the first version!',
        definiteMaxRaftVersion: data.definiteMaxRaftVersion,
        version: data.version!,
        minRaftVersionId: data.minRaftVersionId,
        maxRaftVersionId: data.maxRaftVersionId,
        file: data.file,
      });
      const dbMod = Mod.findOne({
        where: {id: mod.id},
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
    const mod = Mod.create(data);
    await Mod.save(mod);
    return mod;
  }

  static async isValidCreateData(data: ModCreateDto) {
    const addModSchema = await getSchema();

    return validateData(data, addModSchema);
  }
}

const MOST_LIKED_MODS_QUERY = `
    SELECT *,
           (SELECT COUNT(*) FROM "ModLikes" WHERE "ModLikes"."modId" = "mods"."id") ::int AS likes
    FROM "mods"
    ORDER BY likes DESC, "mods".title DESC
        LIMIT $1`;

const MOST_DOWNLOADED_MODS_QUERY = `
    SELECT *,
           (
               CASE
                   WHEN (SELECT SUM("downloadCount")
                         from "mod-versions"
                         WHERE "mod-versions"."modId" = "mods"."id"
                           AND "mod-versions"."downloadCount" IS NOT NULL) IS NOT NULL THEN (SELECT SUM("downloadCount")
                                                                                             from "mod-versions"
                                                                                             WHERE "mod-versions"."modId" = "mods"."id"
                                                                                               AND "mod-versions"."downloadCount" IS NOT NULL)
                   ELSE 0
                   END
               ) AS "totalDownloads"
    FROM "mods"
    GROUP BY id
    ORDER BY "totalDownloads" DESC
        LIMIT $1`;
