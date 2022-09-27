import { compareSync } from 'bcryptjs';
import {
  Body,
  Controller,
  Get,
  Header,
  Path,
  Put,
  Route,
  Security,
} from 'tsoa';
import { User } from '../entities/User';
import { SessionService } from '../services/SessionService';
import { UserService } from '../services/UserService';
import { HttpStatusCode } from '../types/HttpStatusCode';

interface UserUpdateData extends Pick<User, 'password'> {
  currentPassword: string;
  passwordConfirm: string;
}

@Route('/users')
export class UserController extends Controller {
  @Put()
  @Security('user')
  public async update(
    @Header('authtoken') authToken: string,
    @Body() data: UserUpdateData,
  ) {
    const session = await SessionService.getByToken(authToken);

    if (!session || !session.user) {
      this.setStatus(403);
      return { error: 'no user found' };
    }

    const { currentPassword, password, passwordConfirm } = data;
    const currentDbPassword = await UserService.getPasswordById(
      session.user.id,
    );

    if (currentDbPassword && !compareSync(currentPassword, currentDbPassword)) {
      this.setStatus(403);
      return { error: 'Your current password was incorrect!' };
    }

    if (password !== passwordConfirm) {
      this.setStatus(400);
      return { error: 'New passwords do not match!' };
    }
  }

  @Get('/password/reset/{token}')
  @Security('anyone')
  public async readPasswordResetToken(@Path() token: string) {
    const passwordReset = UserService.getPasswordResetByToken(token);

    if (!passwordReset) {
      this.setStatus(HttpStatusCode.NotFound);
      return { error: 'Invalid token!' };
    }

    this.setStatus(HttpStatusCode.Ok);
    return passwordReset;
  }
}
