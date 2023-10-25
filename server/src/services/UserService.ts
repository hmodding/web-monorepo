// noinspection ES6PreferShortImport

import { compareSync } from "bcryptjs";
import { DeepPartial } from "typeorm";
import { schema as resetPasswordSchema } from "../../resources/schemas/resetPasswordSchema";
import { PasswordReset } from "../entities/PasswordReset";
import { User } from "../entities/User";
import { ApiError } from "../errors/ApiError";
import { HttpStatusCode } from "../types/HttpStatusCode";
import { validateData } from "../utils";
import { AbstractService } from "./AbstractService";
import { AuthenticationError } from "../errors/AuthenticationError";
import { UserPrivilege } from "../entities/UserPrivilege";

export class UserService extends AbstractService {
  static create(params: DeepPartial<User>) {
    return User.create(params);
  }

  static getByEmail(email: string) {
    return User.findOneBy({email});
  }

  static getByUsername(username: string) {
    return User.findOneBy({username});
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
  ): Promise<string> {
    const dbUser = await User.findOne({
      select: ['password', 'username'],
      where: {username},
    });

    if (!dbUser || !compareSync(password, dbUser.password)) {
      throw new AuthenticationError('Invalid username or password');
    }

    return username;
  }

  static async getRoles(username: string): Promise<string[]> {
    const dbPrivileges = await UserPrivilege.find({
      select: ['role'],
      where: { username }
    });

    if (!dbPrivileges || dbPrivileges.length <= 0) {
      return []
    } else {
      return dbPrivileges.map(dbPrivilege => dbPrivilege.role);
    }
  }
}

export const userService = new UserService();
