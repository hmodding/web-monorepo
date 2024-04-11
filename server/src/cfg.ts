// noinspection ES6PreferShortImport,ExceptionCaughtLocallyJS

import {config} from 'dotenv-flow';
import {NodeEnv} from "./types/NodeEnv";
import crypto from "crypto";

interface DatabasePropertiesCfg {
  user: string;
  password: string
  name: string
  host: string
  port: string;
  ssl: boolean;
  logging: boolean;
}

interface DatabaseUrlCfg {
  url: string;
  logging: boolean;
}

export type DatabaseCfg = DatabasePropertiesCfg | DatabaseUrlCfg;

export function isUrlCfg(databaseCfg: DatabaseCfg): databaseCfg is DatabaseUrlCfg {
  return (databaseCfg as DatabaseUrlCfg).url !== undefined;
}

export interface ServerCfg {
  port: number;
  /**
   * The API server listens to this address.
   * Use 127.0.0.1 / localhost for local-only access and 0.0.0.0 to enable
   * external access.
   */
  host: string;
  jwtSecret: string;
  jwtTtl: string;
}

export interface MailCfg {
  sender?: string;
  port?: number;
  host?: string;
  auth: {
    user?: string;
    pass?: string;
  };
  secure?: boolean;
}

export interface DiscordCfg {
  clientId: string;
  clientSecret: string;
}

export interface StorageCfg {
  accessKey: string;
  secretKey: string;
  endPoint: string;
  publicBucket: string;
  privateBucket: string;
}

export interface SimpleStorageCfg {
  uploadPath: string;
}

/**
 * Configuration data for loader, launcher and mod release notifications to
 * Discord webhooks.
 */
export interface DiscordNotificationsCfg {
  /**
   * Minimum time distance between role pings in milliseconds.
   */
  pingCooldown: number;
  /**
   * Discord webhook URL to send loader version release notifications to.
   */
  loaderWebhook: string;
  /**
   * ID of the Discord role to ping in loader version release notifications.
   */
  loaderRoleId: string;
  /**
   * Discord webhook URL to send launcher version release notifications to.
   */
  launcherWebhook: string;
  /**
   * ID of the Discord role to ping in launcher version release notifications.
   */
  launcherRoleId: string;
  /**
   * Discord webhook URL to send mod version release notifications to.
   */
  modWebhook: string;
  /**
   * ID of the Discord role to ping in mod version release notifications.
   */
  modRoleId: string;
}

export interface ReCaptchaCfg {
  siteKey: string;
  secretKey: string;
}

export interface ViteCfg {
  baseUrl: string;
  port: string | number;
  brand: string;
}

export interface Cfg {
  node: {
    env: NodeEnv
  };
  database: DatabaseCfg;
  server: ServerCfg;
  storage?: StorageCfg | SimpleStorageCfg;
  validMimeTypes: string[];
  fileUploadAccept: string[];
  requestSizeLimit: string;
  scheduledDeletionTime: string; // https://day.js.org/docs/en/manipulate/add
  mailConfig?: MailCfg;
  reCaptcha?: ReCaptchaCfg;
  discord?: DiscordCfg;
  /**
   * Configuration data for loader, launcher and mod release notifications to
   * Discord webhooks.
   */
  discordNotifications: DiscordNotificationsCfg;
  vite: ViteCfg;
}

//load env from ../.env.* -> https://www.npmjs.com/package/dotenv-flow
config({path: '../'});

const nodeEnv = process.env.NODE_ENV as NodeEnv | undefined;
const nodeEnvDefault: NodeEnv = 'development'
if (!nodeEnv) {
  console.warn(`NODE_ENV is not configured! Using default '${nodeEnvDefault}'`);
}

function readDatabaseConfig(): DatabaseCfg {
  const dbLoggingString = process.env.DB_LOGGING;
  const dbLoggingStringDefault = 'false';
  if (dbLoggingString === undefined) {
    console.warn(
      `DB_LOGGING is not configured! Using default '${dbLoggingStringDefault}'.`,
    );
  }
  let dbLogging: boolean = false;
  if (dbLoggingString === `true`) {
    dbLogging = true;
  } else if (dbLoggingString === `false`) {
    dbLogging = false;
  } else {
    console.warn(
      `DB_LOGGING value '${dbLoggingString}' is invalid! Using default '${dbLoggingStringDefault}'.`,
    );
  }

  const url = process.env.DATABASE_URL;
  if (url !== undefined) {
    return {
      url,
      logging: dbLogging,
    }
  } else {
    const dbUser = process.env.DB_USER;
    if (dbUser === undefined) {
      throw new Error(`DB_USER is not configured!`);
    }

    const dbPassword = process.env.DB_PASSWORD;
    if (dbPassword === undefined) {
      throw new Error(`DB_PASSWORD is not configured!`);
    }

    const dbName = process.env.DB_NAME;
    if (dbName === undefined) {
      throw new Error(`DB_NAME is not configured!`);
    }

    let dbHost = process.env.DB_HOST;
    const dbHostDefault = 'localhost';
    if (dbHost === undefined) {
      console.warn(
        `DB_HOST is not configured! Using default '${dbHostDefault}'.`,
      );
      dbHost = dbHostDefault;
    }

    let dbPort = process.env.DB_PORT;
    const dbPortDefault = '5432';
    if (dbPort === undefined) {
      console.warn(
        `DB_PORT is not configured! Using default '${dbPortDefault}'.`,
      );
      dbPort = dbPortDefault;
    }

    const dbSslString = process.env.DB_SSL;
    const dbSslDefault = 'false';
    if (dbSslString === undefined) {
      console.warn(
        `DB_SSL is not configured! Using default '${dbSslDefault}'.`,
      );
    }
    let dbSsl: boolean = false;
    if (dbSslString === `true`) {
      dbSsl = true;
    } else if (dbSslString === `false`) {
      dbSsl = false;
    } else {
      console.warn(
        `DB_SSL value '${dbSslString}' is invalid! Using default '${dbSslDefault}'.`,
      );
    }

    return {
      host: dbHost,
      port: dbPort,
      ssl: dbSsl,
      user: dbUser,
      password: dbPassword,
      name: dbName,
      logging: dbLogging,
    }
  }
}


let srvPortString;
if (process.env.SERVER_PORT !== undefined) {
  srvPortString = process.env.SERVER_PORT;
} else if (process.env.PORT !== undefined) {
  srvPortString = process.env.PORT;
  console.warn('Using PORT instead of SERVER_PORT variable.')
} else {
  srvPortString = "3000"
  console.warn(`SERVER_PORT is not configured, using default value ${srvPortString}!`);
}

const port = parseInt(srvPortString, 10);
if (Number.isNaN(port)) {
  throw new Error('Server port is invalid!')
}

const host = process.env.SERVER_HOST ?? 'localhost';
if (process.env.SERVER_HOST === undefined) {
  console.warn(`SERVER_HOST is not configured, using default value ${host}!`)
}

const srvJwtSecret = process.env.SERVER_JWT_SECRET;
const srvJwtSecretDefault = crypto.randomBytes(64).toString('hex');
if (srvJwtSecret === undefined) {
  console.warn(
    `SERVER_JWT_SECRET not set! Using a random string.`,
  );
}

const srvJwtTtl = process.env.SERVER_JWT_TTL;
const srvJwtTtlDefault = '12h';
if (srvJwtSecret === undefined) {
  console.warn(
    `SERVER_JWT_TTL not set! Using a default value '${srvJwtSecretDefault}'.`,
  );
}

const readStorageConfig = (): StorageCfg | undefined => {
  try {
    const storageAccessKey = process.env.STORAGE_ACCESS;
    if (storageAccessKey === undefined) {
      throw new Error(`STORAGE_ACCESS`);
    }

    const storageSecretKey = process.env.STORAGE_SECRET;
    if (storageSecretKey === undefined) {
      throw new Error(`STORAGE_SECRET`);
    }

    const storageEndPoint = process.env.STORAGE_ENDPOINT;
    if (storageEndPoint === undefined) {
      throw new Error(`STORAGE_ENDPOINT`);
    }

    const storagePublicBucket = process.env.STORAGE_PUBLIC_BUCKET;
    if (storagePublicBucket === undefined) {
      throw new Error(`STORAGE_PUBLIC_BUCKET`);
    }

    const storagePrivateBucket = process.env.STORAGE_PRIVATE_BUCKET;
    if (storagePrivateBucket === undefined) {
      throw new Error(`STORAGE_PRIVATE_BUCKET`);
    }

    return {
      accessKey: storageAccessKey,
      secretKey: storageSecretKey,
      endPoint: storageEndPoint,
      publicBucket: storagePublicBucket,
      privateBucket: storagePrivateBucket
    }
  } catch (e: unknown) {
    const err = e as Error;
    console.warn(`❗ Missing/Invalid storage env-variables (${err.message}). File upload/download feature will not work!`)
  }
}

const readMailConfig = (): MailCfg | undefined => {
  try {
    const mailSender = process.env.MAIL_SENDER;
    if (!mailSender) {
      throw new Error(`MAIL_SENDER`);
    }

    const mailHost = process.env.MAIL_HOST;
    if (!mailHost) {
      throw new Error(`MAIL_HOST`);
    }

    const mailAuthUser = process.env.MAIL_AUTH_USER;
    if (!mailAuthUser) {
      throw new Error(`MAIL_AUTH_USER`);
    }

    const mailAuthPass = process.env.MAIL_AUTH_PASS;
    if (!mailAuthPass) {
      throw new Error(`MAIL_AUTH_PASS`);
    }

    const maiLPort = process.env.MAIL_PORT;
    const mailPortDefault = 465;
    if (!maiLPort) {
      console.warn(`MAIL_PORT is not configured! Using default '${mailPortDefault}'!`);
    }

    const mailSecure = process.env.MAIL_SECURE;
    if (!mailSecure) {
      console.warn(`MAIL_SECURE is not configured! Using default "true"!`);
    }

    return {
      host: mailHost,
      port: Number(maiLPort) || mailPortDefault,
      secure: mailSecure === 'true',
      sender: mailSender,
      auth: {
        user: mailAuthUser,
        pass: mailAuthPass,
      }
    }
  } catch (e: unknown) {
    const err = e as Error;
    console.warn(`❗ Missing/Invalid mailing env-variables (${err.message}). Mailing feature will not work!`)
  }
}

const viteBaseUrl = process.env.VITE_BASE_URL;
const viteBaseUrlDefault = 'http://localhost'
if (!viteBaseUrl) {
  console.warn(
    `VITE_BASE_URL is not configured! Using default '${viteBaseUrlDefault}'`,
  );
}

const vitePort = process.env.VITE_PORT;
const vitePortDefault = 3001;
if (!vitePort) {
  console.warn(
    `VITE_PORT is not configured! Using default '${vitePortDefault}'`,
  );
}

const viteBrand = process.env.VITE_BRAND;
const viteBrandDefault = 'brandname';
if (!viteBrand) {
  console.warn(
    `VITE_BRAND is not configured! Using default '${viteBrandDefault}'`,
  );
}

const readReCaptchaConfig = (): ReCaptchaCfg | undefined => {
  try {
    let reCaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;
    if (!reCaptchaSiteKey) {
      throw new Error(`RECAPTCHA_SITE_KEY`);
    }
    let reCaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!reCaptchaSecretKey) {
      throw new Error(`RECAPTCHA_SECRET_KEY`);
    }

    return {
      siteKey: reCaptchaSiteKey,
      secretKey: reCaptchaSecretKey,
    }
  } catch (e) {
    const err = e as Error;
    console.warn(`❗ Missing/Invalid recaptcha env-variables (${err.message}). ReCAPTCHA will not work!`)
  }
}


const readDiscordConfig = (): DiscordCfg | undefined => {
  try {
    let discordClientId = process.env.VITE_DISCORD_CLIENT_ID;
    if (!discordClientId) {
      throw new Error(`VITE_DISCORD_CLIENT_ID`);
    }
    let discordClientSecret = process.env.DISCORD_CLIENT_SECRET;
    if (!discordClientSecret) {
      throw new Error(`DISCORD_CLIENT_SECRET`);
    }

    return {
      clientId: discordClientId,
      clientSecret: discordClientSecret,
    }
  } catch (e: unknown) {
    const err = e as Error;
    console.warn(`❗ Missing/Invalid discord env-variables (${err.message}). Discord authentication disabled!!`)
  }
}

const readDiscordNotificationCfg = (): DiscordNotificationsCfg => {
  const dnCooldownString = process.env.DN_COOLDOWN;
  let dnCooldown;
  if (!dnCooldownString) {
    dnCooldown = 7200000;
    console.warn(
      'DN_COOLDOWN is not configured! Using default value 7200000 (2 hours).',
    );
  } else {
    dnCooldown = parseInt(dnCooldownString, 10);
  }

  const dnLauncherWebhook = process.env.DN_LAUNCHER_WEBHOOK;
  if (!dnLauncherWebhook) {
    console.warn(
      'DN_LAUNCHER_WEBHOOK is not configured! Launcher update Discord notifications will not work!',
    );
  }

  const dnLauncherRoleId = process.env.DN_LAUNCHER_ROLE_ID;
  if (!dnLauncherRoleId) {
    console.warn(
      "DN_LAUNCHER_ROLE_ID is not configured! Launcher update Discord notifications won't ping anyone!",
    );
  }

  const dnLoaderWebhook = process.env.DN_LOADER_WEBHOOK;
  if (!dnLoaderWebhook) {
    console.warn(
      'DN_LOADER_WEBHOOK is not configured! Loader update Discord notifications will not work!',
    );
  }

  const dnLoaderRoleId = process.env.DN_LOADER_ROLE_ID;
  if (!dnLoaderRoleId) {
    console.warn(
      "DN_LOADER_ROLE_ID is not configured! Loader update Discord notifications won't ping anyone!",
    );
  }

  const dnModWebhook = process.env.DN_MOD_WEBHOOK;
  if (!dnModWebhook) {
    console.warn(
      'DN_MOD_WEBHOOK is not configured! Mod update Discord notifications will not work!',
    );
  }

  const dnModRoleId = process.env.DN_MOD_ROLE_ID;
  if (!dnModRoleId) {
    console.warn(
      "DN_MOD_ROLE_ID is not configured! Mod update Discord notifications won't ping anyone!",
    );
  }

  return {
    pingCooldown: dnCooldown,
    launcherWebhook: dnLauncherWebhook || '',
    launcherRoleId: dnLauncherRoleId || '',
    loaderWebhook: dnLoaderWebhook || '',
    loaderRoleId: dnLoaderRoleId || '',
    modWebhook: dnModWebhook || '',
    modRoleId: dnModRoleId || '',
  };
}

export const cfg: Cfg = {
  node: {
    env: nodeEnv || nodeEnvDefault,
  },
  database: readDatabaseConfig(),
  server: {
    port,
    host,
    jwtSecret: srvJwtSecret || srvJwtSecretDefault,
    jwtTtl: srvJwtTtl || srvJwtTtlDefault,
  },
  storage: readStorageConfig(),
  validMimeTypes: ['application/zip'],
  fileUploadAccept: ['.rmod'],
  requestSizeLimit: '20mb',
  scheduledDeletionTime: '10d',
  mailConfig: readMailConfig(),
  vite: {
    baseUrl: viteBaseUrl || viteBaseUrlDefault,
    port: vitePort || vitePortDefault,
    brand: viteBrand || viteBrandDefault
  },
  reCaptcha: readReCaptchaConfig(),
  discord: readDiscordConfig(),
  discordNotifications: readDiscordNotificationCfg(),
};