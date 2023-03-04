// noinspection ES6PreferShortImport

import {Body, Controller, Header, Post, Route, Security} from 'tsoa';
import {AccountCreationDto} from '../../../shared/dto/AccountCreationDto';
import {schema as finishAccountSchema} from '../../resources/schemas/finishAccountSchema';
import {User} from '../entities/User';
import {HttpStatusCode} from '../types/HttpStatusCode';
import {generateToken, validateData} from '../utils';
import {SessionService} from "../services/SessionService";
import {Session} from "../entities/session/Session";
import {ILike} from 'typeorm'

@Route('/account')
export class AccountController extends Controller {
  @Post('/finish')
  @Security('api_key', ['user'])
  public async create(
      @Header() authtoken: string,
      @Body() body: AccountCreationDto, //TODO: correct type?
  ) {
    //TODO: move complex logic into service
    const isValidData = await validateData(body, finishAccountSchema);

    if (!isValidData) {
      this.setStatus(HttpStatusCode.BadRequest);
      return {error: 'Invalid data provided!'};
    }

    const session = await SessionService.getBySid(authtoken);
    const user = await User.findOneBy({id: session!.user!.id});

    if (!user) {
      this.setStatus(HttpStatusCode.Unauthorized);
      return {error: 'user does not exist!'};
    }

    const {username, email} = body;

    /* @next
    if (!user.isUnfinished) {
      this.setStatus(HttpStatusCode.Forbidden);
      return {error: 'Your account is already finished!'};
    }
     */

    try {
      user.username = username!;
      user.email = email!;
      //user.role = 'third-party-login-user'; @next
      user.password = generateToken(); //random password only a placeholder
      await User.save(user);
    } catch (err) {
      this.setStatus(HttpStatusCode.Forbidden);
      return {error: 'Username or email already taken'};
    }

    //uuuh?
    const userSession = await Session.findOne({
      where: {data: ILike(`%${user.id}%`)},
      relations: ['user'],
    });

    this.setStatus(HttpStatusCode.Ok);
    return userSession;
  }
}
