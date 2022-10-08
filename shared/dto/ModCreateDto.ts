import { FileDto } from './FileDto';
import { ModDto } from './ModDto';

export interface ModCreateDto extends ModDto {
  file: FileDto;
  version: string;
  minRaftVersionId: number;
  maxRaftVersionId: number;
  definiteMaxRaftVersion?: boolean;
}
