import {compareSync} from 'bcryptjs';
import crypto from 'crypto';
import {BaseEntity} from 'typeorm';
import {v1} from 'uuid';

import {ajv} from './ajv';
import {cfg} from './cfg';
import {LauncherVersion} from './entities/LauncherVersion';
import {LoaderVersion} from './entities/LoaderVersion';
import {Mod} from './entities/Mod';

export function validatePassword(given: string, expected: string): boolean {
  return compareSync(given, expected);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * creates an almost unique token
 * @param data a string that the token should be based on
 * @param length allows to shorten the token to a wanted length
 * @returns
 */
export function generateToken(data: string | null = null, length = -1) {
  if (data === null) {
    data = v1();
  }

  const token = crypto
    .createHash('sha256')
    .update(data)
    .update(crypto.randomBytes(256))
    .digest('hex');

  return length > 0 ? token.substring(0, length) : token;
}

function getBaseUrl(): string {
  const {baseUrl, port} = cfg.vite;
  const portStr = port ? `:${port}` : '';
  return baseUrl + portStr + '/';
}

/**
 * Builds the publicly accessible WWW URL for a mod page.
 * @param mod a mod instance to build a URL for.
 * @returns the URL.
 */
export function getModUrl(mod: Mod): string {
  return `${getBaseUrl()}mods/${mod.id}`;
}

/**
 * Builds the publicly accessible WWW URL for a loader version page.
 * @param version a loader version instance to build a URL for.
 * @returns the URL.
 */
export function getLoaderVersionUrl(version: LoaderVersion): string {
  return `${getBaseUrl()}loader/${version.rmlVersion}`;
}

/**
 * Builds the publicly accessible WWW URL for a launcher version page.
 * @param version a launcher version instance to build a URL for.
 * @returns the URL.
 */
export function getLauncherVersionUrl(version: LauncherVersion): string {
  return `${getBaseUrl()}launcher/${version.version}`;
}

/**
 * Builds the publicly accessible WWW URL for a user page.
 * @param username name of the user to build a URL for.
 * @returns the URL.
 */
export function getUserUrlForUsername(username: string): string {
  return `${getBaseUrl()}user/${encodeURIComponent(username)}`;
}

/**
 * Publicly accessible WWW URL for the mod loader download page.
 */
export const softwareDownloadUrl = `${getBaseUrl()}download`;

/**
 * Publicly accessible WWW URL of a mod loader logo image.
 */
export const logoUrl = `${getBaseUrl()}logo.png`;

/**
 * validates data to a json-schema
 * @param data data-object
 * @param schema json-schema
 * @returns true/false
 */
export const validateData = async (
  data: Record<string, any>,
  schema: Record<string, any>,
) => {
  const isValid = ajv.validate(schema, data);
  if (!isValid) {
    console.warn('❗ validation failed: \n  errors:', ajv.errors);
  }
  return isValid;
};

/**
 * checks if an entry exists and if not saves it
 * @param data a raw entity data
 * @param Entity an entity class providing a repository
 */
export const saveIfNotExists = async (
  Entity: typeof BaseEntity,
  data: Record<string, any>,
) => {
  try {
    await Entity.findOneByOrFail(data);
  } catch (err) {
    await Entity.save(Entity.create(data));
  }
};

export const getResourcesPath = () => {
  return `${__dirname}/../resources`
}