import axios, {AxiosResponse} from 'axios';
import {
  DiscordAuthenticationConfig,
  DiscordAuthenticationData,
  DiscordAuthenticationScope,
  DiscordUserData,
} from '../../../shared/types/Discord';
import {cfg} from '../cfg';
import {DiscordSignOn} from '../entities/DiscordSignOn';
import {User} from '../entities/User';
import {generateToken} from '../utils';

export class DiscordAuthenticator {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly grantType: string;
  private readonly redirectUri: string;
  private readonly scope: DiscordAuthenticationScope;

  constructor(config: DiscordAuthenticationConfig) {
    const {clientId, clientSecret, grantType, redirectUri, scope} = config;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.scope = scope || 'identify';
    this.grantType = grantType || 'authorization_code';
  }

  async getAuthenticationData(
    code: string,
  ): Promise<DiscordAuthenticationData> {
    const {clientId, clientSecret, grantType, redirectUri, scope} = this;
    const {data}: AxiosResponse = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: grantType,
        redirect_uri: redirectUri,
        scope,
      } as any),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return data as DiscordAuthenticationData;
  }

  async getUserData(
    tokenType: string,
    accessToken: string,
  ): Promise<DiscordUserData> {
    const {data}: AxiosResponse = await axios.get(
      'https://discord.com/api/users/@me',
      {
        headers: {authorization: `${tokenType} ${accessToken}`},
      },
    );

    return data as DiscordUserData;
  }

  async matchesExistingUser(userData: DiscordUserData): Promise<boolean> {
    try {
      const {id: discordUserId} = userData;

      const discordLogin = await DiscordSignOn.count({
        where: {discordUserId},
      });

      return discordLogin > 0;
    } catch (e) {
      return false;
    }
  }

  async register(
    userData: DiscordUserData,
    authData: DiscordAuthenticationData,
  ): Promise<null> {
    const {id: discordUserId} = userData;
    const {access_token: accessToken, refresh_token: refreshToken} = authData;

    const user = User.create({
      username: `discord-user-${discordUserId}`,
      email: generateToken(discordUserId, 255),
      password: generateToken(null, 255),
      //role: 'UNFINISHED', - @next
    });
    await User.save(user);

    const discordLogin = DiscordSignOn.create({
      userId: user.id,
      discordUserId,
      accessToken,
      refreshToken,
    });
    await DiscordSignOn.save(discordLogin);

    return null
  }

  async login(userData: DiscordUserData): Promise<null> {
    const {id: discordUserId} = userData;
    const discordLogin = await DiscordSignOn.findOneBy({discordUserId});
    const user = await User.findOneBy({id: discordLogin!.userId});

    return null;
  }
}

export const discordAuthenticator = new DiscordAuthenticator({
  clientId: cfg.discord?.clientId || '',
  clientSecret: cfg.discord?.clientSecret || '',
  redirectUri: `${cfg.vite.baseUrl + cfg.vite.port ? `:${cfg.vite.port}` : ''}auth/discord`,
});
