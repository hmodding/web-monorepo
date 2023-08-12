import { createHash } from 'crypto';
import { Client } from 'minio';
import { cfg, Cfg, SimpleStorageCfg } from "../cfg";

/**
 * Relevant metadata for an uploaded object (file).
 */
export interface ObjectMeta {
  /**
   * A public download url for the uploaded file.
   */
  url: string;
  /**
   * MD5 hash value of the uploaded file.
   */
  md5: string;
  /**
   * SHA256 hash value of the uploaded file.
   */
  sha256: string;
}

export class SimpleFileManagerService {
  private storageCfg: SimpleStorageCfg;

  public constructor(storageCfg: SimpleStorageCfg) {
    this.storageCfg = storageCfg;
  }

  public async createModVersionFile(
    modSlug: string,
    versionSlug: string,
    fileName: string,
    fileContents: Buffer,
  ): Promise<ObjectMeta> {
    const filePath = `mods/${modSlug}/${versionSlug}/${fileName}`;

    return this.uploadPublic(filePath, fileContents);
  }

  public async createLauncherVersionFile(
    versionSlug: string,
    fileName: string,
    fileContents: Buffer,
  ): Promise<ObjectMeta> {
    const filePath = `launcher/${versionSlug}/${fileName}`;

    return this.uploadPublic(filePath, fileContents);
  }

  private async uploadPublic(
    filePath: string,
    fileContents: Buffer,
  ): Promise<ObjectMeta> {
    const sha256 = this.hashSha256(fileContents);
    let md5 = this.hashMd5(fileContents);

    return {
      url: `${this.storageCfg.uploadPath}/${filePath}`,
      md5,
      sha256,
    };
  }

  private hashSha256(fileContents: Buffer): string {
    return createHash('sha256').update(fileContents).digest('hex');
  }

  private hashMd5(fileContents: Buffer): string {
    return createHash('md5').update(fileContents).digest('hex');
  }
}

export const simpleFileManager = new SimpleFileManagerService(cfg.storage as SimpleStorageCfg);
