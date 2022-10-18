import { FileDto } from './FileDto';
import { ModVersionDto } from './ModVersionDto';
import { ScheduledModDeletionDto } from './ScheduledModDeletionDto';
import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';

export interface ModDto extends WithCreatedAndUpdatedDto {
  id: string;
  title?: string;
  description?: string;
  readme?: string;
  category?: string;
  author?: string;
  bannerImageUrl?: string;
  iconImageUrl?: string;
  repositoryUrl?: string;
  versions?: ModVersionDto[];
  deletion?: ScheduledModDeletionDto;
  likeCount?: number;
}

export interface ModCreateDto extends ModDto {
  version: string;
  minRaftVersionId: number;
  maxRaftVersionId: number;
  definiteMaxRaftVersion?: boolean;
  file: FileDto;
}

export interface ModUpdateDto extends Omit<ModDto, 'versions'> {}
