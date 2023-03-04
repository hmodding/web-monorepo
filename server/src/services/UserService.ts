import {compareSync} from 'bcryptjs';
import {DeepPartial} from 'typeorm';
import {schema as resetPasswordSchema} from '../../resources/schemas/resetPasswordSchema';
import {PasswordReset} from '../entities/PasswordReset';
import {User} from '../entities/User';
import {ApiError} from '../errors/ApiError';
import {HttpStatusCode} from '../types/HttpStatusCode';
import {validateData} from '../utils';
import {AbstractService} from './AbstractService';
import {Session} from "../entities/session/Session";

export class UserService extends AbstractService {
  static create(params: DeepPartial<User>) {
    return User.create(params);
  }

  static getByEmail(email: string) {
    return User.findOneBy({email});
  }

  static getByUsernameOrEmail(username: string, email: string) {
    return User.findOneBy({username, email});
  }

  static async getPasswordById(id: number) {
    const user = await User.findOne({
      where: {id},
      select: ['password'],
    });

    return user?.password || null;
  }

  static async getPasswordResetByToken(token: string) {
    return PasswordReset.findOneBy({token});
  }

  static async isValidResetPasswordCreateData(data: any) {
    return validateData(data, resetPasswordSchema);
  }

  static async createPasswordReset(email: string) {
    const user = await this.getByEmail(email);

    if (!user) {
      throw new ApiError(HttpStatusCode.Unauthorized, 'password reset failed');
    }

    const existingPasswordReset = await PasswordReset.findOneBy({
      userId: user.id,
    });

    existingPasswordReset?.remove();

    const passwordResetToCreate = new PasswordReset();
    passwordResetToCreate.userId = user.id;

    return passwordResetToCreate.save();
  }

  static async updatePassword(password: string) {
    const user = await User.save({password});

    return user;
  }

  static async login(
      username: string,
      password: string,
      deviceInfo: Record<string, string> | undefined,
  ) {
    const internalFoundUser = await User.findOne({
      where: {username},
      select: ['id', 'password', 'username', 'email'],
    });

    if (
        !internalFoundUser ||
        !compareSync(password, internalFoundUser.password)
    ) {
      throw new ApiError(
          HttpStatusCode.Unauthorized,
          'Invalid username or password',
      );
    }

    const session = Session.create({
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //1 Month
      data: JSON.stringify({user: internalFoundUser.id}),
      //deviceInfo,
    });
    const savedSession = await Session.save(session);
    const dbSession = await Session.findOne({
      where: {sid: savedSession.sid},
      relations: ['user'],
    });

    return dbSession;
  }
}

export const userService = new UserService();
