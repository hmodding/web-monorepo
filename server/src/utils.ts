import { compareSync } from 'bcryptjs';
import crypto from 'crypto';
import { BaseEntity } from 'typeorm';
import { v1 } from 'uuid';

import { ajv } from './ajv';
import { cfg } from './cfg';
import { LauncherVersion } from './entities/LauncherVersion';
import { LoaderVersion } from './entities/LoaderVersion';
import { Mod } from './entities/Mod';
import {
  LauncherVersion as LauncherVersionModel,
  LoaderVersion as LoaderVersionModel,
  Mod as ModModel,
} from './_legacy/models';

export function validatePassword(given: string, expected: string): boolean {
  return compareSync(given, expected);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateToken(data: string | null = null, length = -1) {
  if (data === null) {
    data = v1();
  }

  const token = crypto
    .createHash('sha256')
    .update(data)
    .update(crypto.randomBytes(256))
    .digest('hex');

  return length > 0 ? token.substr(0, length) : token;
}

/**
 * Builds the publicly accessible WWW URL for a mod page.
 * @param mod a mod instance to build a URL for.
 * @returns the URL.
 */
export function getModUrl(mod: ModModel | Mod): string {
  return `${cfg.frontendBaseUrl}mods/${mod.id}`;
}

/**
 * Builds the publicly accessible WWW URL for a loader version page.
 * @param version a loader version instance to build a URL for.
 * @returns the URL.
 */
export function getLoaderVersionUrl(
  version: LoaderVersionModel | LoaderVersion,
): string {
  return `${cfg.frontendBaseUrl}loader/${version.rmlVersion}`;
}

/**
 * Builds the publicly accessible WWW URL for a launcher version page.
 * @param version a launcher version instance to build a URL for.
 * @returns the URL.
 */
export function getLauncherVersionUrl(
  version: LauncherVersionModel | LauncherVersion,
): string {
  return `${cfg.frontendBaseUrl}launcher/${version.version}`;
}

/**
 * Builds the publicly accessible WWW URL for a user page.
 * @param username name of the user to build a URL for.
 * @returns the URL.
 */
export function getUserUrlForUsername(username: string): string {
  return `${cfg.frontendBaseUrl}user/${encodeURIComponent(username)}`;
}

/**
 * Publicly accessible WWW URL for the mod loader download page.
 */
export const softwareDownloadUrl = `${cfg.frontendBaseUrl}download`;

/**
 * Publicly accessible WWW URL of a mod loader logo image.
 */
export const logoUrl = `${cfg.frontendBaseUrl}logo.png`;

/**
 * validates data to a json-schema
 * @param data data-object
 * @param schema json-schema
 * @returns true/false
 */
export const validateData = (
  data: Record<string, any>,
  schema: Record<string, any>,
) => {
  const validate = ajv.compile(schema);

  return validate(data);
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
