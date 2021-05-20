import { config } from 'dotenv';

export interface Cfg {
  apiBase: string;
  database: {
    uri: string;
    logging: boolean;
    ssl: boolean;
  };
  server: {
    port: number;
  };
  storage: {
    accessKey: string;
    secretKey: string;
    endPoint: string;
    publicBucket: string;
    privateBucket: string;
  };
  validMimeTypes: string[];
  fileUploadAccept: string[];
  requestSizeLimit: string;
  scheduledDeletionTime: string; // https://day.js.org/docs/en/manipulate/add
  mailConfig: {
    sender?: string;
    port?: number;
    host?: string;
    auth: {
      user?: string;
      pass?: string;
    };
    secure?: boolean;
  };
  frontendBaseUrl: string;
  reCaptcha: {
    siteKey: string;
    secretKey: string;
  };
  discord: {
    clientId?: string;
    clientSecret?: string;
  };
}

// load environment variables from .env (if it exists)
config({ path: '../../.env' });

const apiBase = process.env.API_BASE;
if (!apiBase) {
  console.warn(`API_BASE is not configured! Using default "/api"`);
}

const dbUri = process.env.DATABASE_URL;
if (dbUri === undefined) {
  throw new Error(`DATABASE_URL is not configured!`);
}

const dbLoggingString = process.env.DB_LOGGING;
if (dbLoggingString === undefined) {
  throw new Error(`DB_LOGGING is not configured!`);
}
let dbLogging: boolean;
if (dbLoggingString === `true`) {
  dbLogging = true;
} else if (dbLoggingString === `false`) {
  dbLogging = false;
} else {
  throw new Error(`DB_LOGGING must be either "true" or "false"!`);
}

const dbSslString = process.env.DB_SSL;
if (dbSslString === undefined) {
  throw new Error(`DB_SSL is not configured!`);
}
let dbSsl: boolean;
if (dbSslString === `true`) {
  dbSsl = true;
} else if (dbSslString === `false`) {
  dbSsl = false;
} else {
  throw new Error(`DB_SSL must be either "true" or "false"!`);
}

const srvPortString = process.env.PORT;
if (srvPortString === undefined) {
  throw new Error(`PORT is not configured!`);
}
const port = parseInt(srvPortString, 10);

const storageAccessKey = process.env.STORAGE_ACCESS;
if (storageAccessKey === undefined) {
  throw new Error(`STORAGE_ACCESS is not configured!`);
}

const storageSecretKey = process.env.STORAGE_SECRET;
if (storageSecretKey === undefined) {
  throw new Error(`STORAGE_SECRET is not configured!`);
}

const storageEndPoint = process.env.STORAGE_ENDPOINT;
if (storageEndPoint === undefined) {
  throw new Error(`STORAGE_ENDPOINT is not configured!`);
}

const storagePublicBucket = process.env.STORAGE_PUBLIC_BUCKET;
if (storagePublicBucket === undefined) {
  throw new Error(`STORAGE_PUBLIC_BUCKET is not configured!`);
}

const storagePrivateBucket = process.env.STORAGE_PRIVATE_BUCKET;
if (storagePrivateBucket === undefined) {
  throw new Error(`STORAGE_PRIVATE_BUCKET is not configured!`);
}

const validateMimeTypesString = process.env.VALID_MIME_TYPES;
if (!validateMimeTypesString) {
  throw new Error(`VALID_MIME_TYPES is not configured!`);
}

const fileUploadAcceptString = process.env.FILE_UPLOAD_ACCEPT;
if (!fileUploadAcceptString) {
  throw new Error(`FILE_UPLOAD_ACCEPT is not configured!`);
}

const requestSizeLimit = process.env.REQUEST_SIZE_LIMIT;
if (!requestSizeLimit) {
  throw new Error(`REQUEST_SIZE_LIMIT is not configured!`);
}

const scheduledDeletionTime = process.env.SCHEDULED_DELETION_TIME;
if (!scheduledDeletionTime) {
  console.warn(
    `SCHEDULED_DELETION_TIME is not configured! Using default "10d"!`,
  );
}

const mailSender = process.env.MAIL_SENDER;
if (!mailSender) {
  console.warn(
    `MAIL_SENDER is not configured! Mailing feature will not work !!`,
  );
}

const maiLPort = process.env.MAIL_PORT;
if (!maiLPort) {
  console.warn(`MAIL_PORT is not configured! Using default "465"!`);
}

const mailSecure = process.env.MAIL_SECURE;
if (!mailSecure) {
  console.warn(`MAIL_SECURE is not configured! Using default "true"!`);
}

const mailHost = process.env.MAIL_HOST;
if (!mailHost) {
  console.warn(`MAIL_HOST is not configured! Mailing feature will not work !!`);
}

const mailAuthUser = process.env.MAIL_AUTH_USER;
if (!mailAuthUser) {
  console.warn(
    `MAIL_AUTH_USER is not configured! Mailing feature will not work !!`,
  );
}

const mailAuthPass = process.env.MAIL_AUTH_PASS;
if (!mailAuthPass) {
  console.warn(
    `MAIL_AUTH_PASS is not configured! Mailing feature will not work !!`,
  );
}

const frontendBaseUrl = process.env.FRONTEND_BASE_URL;
if (!frontendBaseUrl) {
  console.warn(
    `FRONTEND_BASE_URL is not configured! Using default "http://localhost:3000"`,
  );
}

let reCaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY;
if (!reCaptchaSiteKey) {
  reCaptchaSiteKey = '';
  console.warn(
    `RECAPTCHA_SITE_KEY is not configured! ReCAPTCHA will not work!`,
  );
}
let reCaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;
if (!reCaptchaSecretKey) {
  reCaptchaSecretKey = '';
  console.warn(
    `RECAPTCHA_SECRET_KEY is not configured! ReCAPTCHA will not work!`,
  );
}

let discordClientId = process.env.VITE_DISCORD_CLIENT_ID;
if (!discordClientId) {
  console.warn(
    `VITE_DISCORD_CLIENT_ID is not configured! Discord authentication disabled!!`,
  );
}
let discordClientSecret = process.env.DISCORD_CLIENT_SECRET;
if (!discordClientSecret) {
  console.warn(
    `DISCORD_CLIENT_SECRET is not configured! Discord authentication disabled!!`,
  );
}

const cfg: Cfg = {
  apiBase: apiBase || '/api',
  database: {
    uri: dbUri,
    logging: dbLogging,
    ssl: dbSsl,
  },
  server: {
    port,
  },
  storage: {
    accessKey: storageAccessKey,
    secretKey: storageSecretKey,
    endPoint: storageEndPoint,
    publicBucket: storagePublicBucket,
    privateBucket: storagePrivateBucket,
  },
  validMimeTypes: validateMimeTypesString.split(`,`).map((s) => s.trim()),
  fileUploadAccept: fileUploadAcceptString.split(`,`).map((s) => s.trim()),
  requestSizeLimit,
  scheduledDeletionTime: scheduledDeletionTime || `10d`,
  mailConfig: {
    sender: mailSender,
    port: Number(maiLPort) || 465,
    host: mailHost,
    auth: {
      user: mailAuthUser,
      pass: mailAuthPass,
    },
    secure: Boolean(mailSecure) || true,
  },
  frontendBaseUrl: frontendBaseUrl || 'http://localhost:3000',
  reCaptcha: {
    siteKey: reCaptchaSiteKey,
    secretKey: reCaptchaSecretKey,
  },
  discord: {
    clientId: discordClientId,
    clientSecret: discordClientSecret,
  },
};

export default cfg;

export const Role = {
  ADMIN: 'admin',
};

export const ModCategories: string[] = [
  `utility`,
  `optimization`,
  `content`,
  `fun`,
];
