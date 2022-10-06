import { FileDto } from './FileDto';

export interface LauncherVersionDto {
  version: string;
  timestamp?: Date;
  downloadUrl?: string;
  downloadCount?: number;
  changelog: string;
  file?: FileDto;
}
