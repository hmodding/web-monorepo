import {DeepPartial} from 'typeorm';
import {AbstractService} from './AbstractService';
import {Session} from "../entities/session/Session";

export class SessionService extends AbstractService {
  static async getBySid(sid: string) {
    const session = await Session.findOne({
      where: {sid},
      relations: ['user'],
    });

    return JSON.parse(session?.data || '{}');
  }

  static create(params: DeepPartial<Session>) {
    return Session.create(params);
  }

  static async deleteBySid(sid: string) {
    await Session.delete({sid});
  }
}
