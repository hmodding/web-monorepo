/**
 * {@link https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes}
 */
export type DiscordAuthenticationScope = 'identify' | 'email';

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
  token_type: 'Bearer';
}

export interface DiscordUserData {
  avatar: string;
  discriminator: string;
  flags: number;
  id: string;
  locale: string;
  mfa_enabled: boolean;
  public_flags: number;
  username: string;
  verified: boolean;
}