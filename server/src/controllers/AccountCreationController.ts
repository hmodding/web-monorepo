import { Body, Controller, Delete, Path, Post, Route } from 'tsoa';
import { AccountCreation } from '../entities/AccountCreation';
import reCaptchaClient from '../ReCaptchaClient';
import { AccountCreationService } from '../services/AccountCreationService';

export interface AccountCreationCreateData
  extends Pick<AccountCreation, 'username' | 'email' | 'password'> {
  recaptcha: string;
}

@Route('/accountCreations')
export class AccountCreationController extends Controller {
  @Post()
  public async create(@Body() data: AccountCreationCreateData) {
    const { username, email, recaptcha } = data;
    const isValidCaptcha = await reCaptchaClient.verifyResponseToken(recaptcha);

    if (!isValidCaptcha) {
      this.setStatus(403);
      return { error: 'Invalid CAPTCHA' };
    }

    if (await AccountCreationService.alreadyExists(username, email)) {
      this.setStatus(400);
      return { error: 'Username or E-Mail is already taken!' };
    }

    //TODO: validate body - lol

    AccountCreationService.create(data);
    this.setStatus(204);
  }

  @Delete('/{token}')
  public async delete(@Path() token: string) {
    const accountCreation = await AccountCreationService.getByToken(token);

    if (!accountCreation) {
      this.setStatus(403);
      return { error: 'Invalid token!' };
    }

    const user = AccountCreationService.finishRegistration(
      accountCreation,
      token,
    );

    this.setStatus(204);
    return user;
  }
}
