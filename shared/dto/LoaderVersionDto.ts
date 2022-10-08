import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';
import { RaftVersionDto } from './RaftVersionDto';

export interface LoaderVersionDto extends WithCreatedAndUpdatedDto {
  rmlVersion: string;
  timestamp?: Date;
  readme?: string;
  raftVersionId?: number;
  raftVersion?: RaftVersionDto;
}
