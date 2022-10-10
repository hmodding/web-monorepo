import { FileDto } from './FileDto';
import { ModDto } from './ModDto';
import { RaftVersionDto } from './RaftVersionDto';

export interface CreateModVersionDto {
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
