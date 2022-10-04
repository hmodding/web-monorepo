import bcrypt from 'bcryptjs';
import { DeepPartial } from 'typeorm';
import { PasswordReset } from '../entities/PasswordReset';
import { Session } from '../entities/Session';
import { User } from '../entities/User';
import { ApiError } from '../errors/ApiError';
import { schema as resetPasswordSchema } from '../forms/resetPasswordForm';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { validateData } from '../utils';
import { AbstractService } from './AbstractService';

interface ResetPasswordCreateData {
  email: string;
  userId: number;
}

export class UserService extends AbstractService {
  static create(params: DeepPartial<User>) {
    return User.create(params);
  }

  static getByEmail(email: string) {
    return User.findOneBy({ email });
  }

  static getByUsernameOrEmail(username: string, email: string) {
    return User.findOneBy({ username, email });
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
    const user = await User.save({ password });

    return user;
  }

  static async login(
    username: string,
    password: string,
    deviceInfo: Record<string, string> | undefined,
  ) {
    const foundUser = await User.findOne({
      where: { username },
      select: ['id', 'password', 'username'],
    });

    if (!foundUser || !bcrypt.compareSync(password, foundUser.password)) {
      throw new ApiError(
        HttpStatusCode.Unauthorized,
        'Invalid username or password',
      );
    }

    const session = Session.create({
      userId: foundUser.id,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), //1 Month
      deviceInfo,
    });
    const savedSession = await Session.save(session);
    savedSession.user = foundUser;

    return savedSession;
  }
}

export const userService = new UserService();
