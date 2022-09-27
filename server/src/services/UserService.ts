import { DeepPartial } from 'typeorm';
import { PasswordReset } from '../entities/PasswordReset';
import { User } from '../entities/User';
import { AbstractService } from './AbstractService';

export class UserService extends AbstractService {
  static create(params: DeepPartial<User>) {
    return User.create(params);
  }

  static getByUsernameOrEmail(username: string, email: string) {
    return User.findOne({
      where: { username, email },
    });
  }

  static async getPasswordById(id: number) {
    const user = await User.findOne({
      where: { id },
      select: ['password'],
    });

    return user?.password || null;
  }

  static async getPasswordResetByToken(token: string) {
    return PasswordReset.findOneBy({ token });
  }
}

export const userService = new UserService();
