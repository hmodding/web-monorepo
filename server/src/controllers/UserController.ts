import { compareSync } from 'bcryptjs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Path,
  Post,
  Put,
  Query,
  Request,
  Route,
  Security,
} from 'tsoa';
import { ChangePasswordDto } from '../../../shared/dto/ChangePasswordDto';
import { LoginDto } from '../../../shared/dto/LoginDto';
import { ResetPasswordDto } from '../../../shared/dto/ResetPasswordDto';
import { User } from '../entities/User';
import { ApiError } from '../errors/ApiError';
import { mailer } from '../services/MailerService';
import { UserService } from '../services/UserService';
import { HttpStatusCode } from '../types/HttpStatusCode';
import { generateToken } from '../utils';
import {SessionService} from "../services/SessionService";

@Route('/users')
export class UserController extends Controller {
  @Put()
  @Security('api_key', ['user'])
  public async update(
    @Header() authtoken: string,
    @Body() data: ChangePasswordDto,
  ) {
    const session = await SessionService.getBySid(authtoken);

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

    const userToUpdate = User.create({
      id: session.user.id,
      password: passwordConfirm,
    });
    await User.save(userToUpdate);
  }

  @Get('/resetPassword/{token}')
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

  @Post('/resetPassword')
  @Security('captcha')
  public async createPasswordResetToken(@Body() body: ResetPasswordDto) {
    const user = await UserService.getByEmail(body.email);

    if (!user /*|| user.isAdmin - @next*/) {
      // do nothing! we don't want people to find existing email with this form! (dont just trust captcha)
      this.setStatus(200);
      return {};
    }

    const isValidResetPasswordCreateData = await UserService.isValidResetPasswordCreateData(
      body,
    );

    if (!isValidResetPasswordCreateData) {
      this.setStatus(HttpStatusCode.BadRequest);
      return { error: 'Invalid form' };
    }

    const createdPasswordReset = await UserService.createPasswordReset(
      body.email,
    );

    mailer.sendPasswordResetMail(user, createdPasswordReset.token);

    this.setStatus(HttpStatusCode.BadRequest);
    return createdPasswordReset;
  }

  @Delete('/resetPassword/{token}')
  @Security('anyone')
  public async deletePasswordResetToken(
    @Path() token: string,
    @Query() password: string,
    @Query() passwordConfirm: string,
  ) {
    if (!password || !passwordConfirm || password !== passwordConfirm) {
      this.setStatus(HttpStatusCode.BadRequest);
      return { error: 'Passwords did not match' };
    }

    const passwordReset = await UserService.getPasswordResetByToken(token);

    if (!passwordReset) {
      this.setStatus(HttpStatusCode.BadRequest);
      return { error: 'Invalid token!' };
    }

    const user = await UserService.updatePassword(password);

    if (!user) {
      this.setStatus(HttpStatusCode.InternalServerError);
      return { error: 'password reset failed!' };
    }

    passwordReset.remove();

    this.setStatus(HttpStatusCode.Ok);
    return { successful: true };
  }

  @Post('/login')
  @Security('everyone')
  public async login(
    @Request() request: any, // express is not exposing the type :(
    @Body() { username, password, deviceInfo = {} }: LoginDto,
  ) {
    try {
      const session = await UserService.login(username, password, {
        ...deviceInfo,
        ipHash: generateToken(request.socket.remoteAddress),
      });

      this.setStatus(HttpStatusCode.Ok);
      return session;
    } catch (err) {
      const apiErr = err as ApiError;

      this.setStatus(apiErr.status);
      return { error: apiErr.message };
    }
  }
}
