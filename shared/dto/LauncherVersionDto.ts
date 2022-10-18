import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';
import { FileDto } from './FileDto';

export interface LauncherVersionDto extends WithCreatedAndUpdatedDto {
  version: string;
  timestamp?: Date;
  downloadUrl?: string;
  downloadCount?: number;
  changelog: string;
  file?: FileDto;
}
