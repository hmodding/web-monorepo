import axios, { AxiosResponse } from 'axios';
import cfg from '../cfg';

export type DiscordAuthenticationScope = 'identify' | 'email'; // https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes

export interface DiscordAuthenticationConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scope?: DiscordAuthenticationScope;
  grantType?: 'authorization_code';
}

export interface DiscordAuthenticationData {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: DiscordAuthenticationScope;
  token_type: string;
}

export interface DiscordUserData {
  avatar: string;
  discriminator: string;
  email: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  public_flags: number;
  username: string;
  verified: boolean;
}

export class DiscordAuthenticator {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly grantType: string;
  private readonly redirectUri: string;
  private readonly scope: DiscordAuthenticationScope;

  constructor(config: DiscordAuthenticationConfig) {
    const { clientId, clientSecret, grantType, redirectUri, scope } = config;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.scope = scope || 'identify';
    this.grantType = grantType || 'authorization_code';
  }

  async getAuthenticationData(
    code: string,
  ): Promise<DiscordAuthenticationData> {
    const { clientId, clientSecret, grantType, redirectUri, scope } = this;
    console.log('redirect_uri', redirectUri);
    const { data }: AxiosResponse = await axios.post(
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
    const { data }: AxiosResponse = await axios.get(
      'https://discord.com/api/users/@me',
      {
        headers: { authorization: `${tokenType} ${accessToken}` },
      },
    );

    return data as DiscordUserData;
  }
}

export default new DiscordAuthenticator({
  clientId: cfg.discord.clientId || '',
  clientSecret: cfg.discord.clientSecret || '',
  redirectUri: `${cfg.frontendBaseUrl}auth/discord`,
});
