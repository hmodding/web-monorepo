// noinspection ES6PreferShortImport

import { Body, Controller, Post, Route, Security } from 'tsoa';
import { DiscordAuthenticationDto } from '../../../shared/dto/DiscordAuthenticationDto';
import { discordAuthenticator } from '../authenticators/DiscordAuthenticator';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/auth')
export class AuthenticationController extends Controller {
  @Post('/discord')
  @Security('everyone')
  public async create(@Body() body: DiscordAuthenticationDto) {
    const { code } = body;

    try {
      const authData = await discordAuthenticator.getAuthenticationData(code);
      const userData = await discordAuthenticator.getUserData(
        authData.token_type,
        authData.access_token,
      );

      if (await discordAuthenticator.matchesExistingUser(userData)) {
        const session = await discordAuthenticator.login(userData);
        this.setStatus(HttpStatusCode.Ok);
        return session;
      } else {
        const session = await discordAuthenticator.register(userData, authData);
        this.setStatus(HttpStatusCode.Accepted);
        return session;
      }
    } catch (err) {
      console.warn('❌ discord auth error: ', err);
      this.setStatus(HttpStatusCode.Unauthorized);
      return { error: 'discord authentication failed!' };
    }
  }
}
