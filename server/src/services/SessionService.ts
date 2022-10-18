import { DeepPartial } from 'typeorm';
import { Session } from '../entities/Session';
import { AbstractService } from './AbstractService';

export class SessionService extends AbstractService {
  static getByToken(token: string) {
    return Session.findOne({
      where: { token },
      relations: ['user'],
    });
  }

  static create(params: DeepPartial<Session>) {
    return Session.create(params);
  }

  static async deleteByToken(token: string) {
    await Session.delete({ token });
  }
}
