import { ModBundleDto } from './ModBundleDto';
import { ModDto } from './ModDto';
import { RaftVersionDto } from './RaftVersionDto';
import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';

export interface ModVersionDto extends WithCreatedAndUpdatedDto {
  modId?: string;
  version?: string;
  changelog?: string;
  downloadUrl?: string;
  downloadCount?: number;
  minRaftVersionId?: number;
  maxRaftVersionId?: number;
  definiteMaxRaftVersion?: boolean;
  fileHashes?: Record<string, any>;
  mod?: ModDto;
  minRaftVersion?: RaftVersionDto;
  maxRaftVersion?: RaftVersionDto;
  bundles?: ModBundleDto[];
}
