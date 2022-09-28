import FileType from 'file-type';
import { DeepPartial } from 'typeorm';
import { cfg } from '../cfg';
import { ModCreateData } from '../controllers/ModController';
import { Mod } from '../entities/Mod';
import { User } from '../entities/User';
import { ApiError } from '../errors/ApiError';
import { fileManager, ObjectMeta } from '../FileManager';
import { getSchema } from '../router/routes/forms/addModForm';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { validateData } from '../utils';
import { AbstractService } from './AbstractService';
import { ModVersionService } from './ModVersionService';

export class ModService extends AbstractService {
  static async getAll() {
    return await Mod.find();
  }

  static async getById(id: string) {
    return await Mod.findOne({
      where: { id },
      relations: ['versions', 'likes'],
    });
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
