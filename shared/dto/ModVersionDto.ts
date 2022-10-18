import { FileDto } from './FileDto';
import { ModBundleDto } from './ModBundleDto';
import { ModDto } from './ModDto';
import { RaftVersionDto } from './RaftVersionDto';
import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';

export interface ModVersionDto extends WithCreatedAndUpdatedDto {
  id: number;
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

export interface ModVersionCreateDto {
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
  file: FileDto;
}
