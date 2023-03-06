import { ModLike } from '../entities/ModLike';
import { AbstractService } from './AbstractService';


export class ModLikeService extends AbstractService {
  static getAllByUserId(userId: number) {
    return ModLike.find({
      where: { userId },
    });
  }

  static async create(modId: string, userId: number) {
    const newModLike = new ModLike();
    newModLike.modId = modId;
    newModLike.userId = userId;

    return await newModLike.save();
  }

  static async delete(modId: string, userId: number) {
    await ModLike.delete({ modId, userId });
  }
}