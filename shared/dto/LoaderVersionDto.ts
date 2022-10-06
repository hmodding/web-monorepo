import { RaftVersionDto } from './RaftVersionDto';

export interface LoaderVersionDto {
  rmlVersion: string;
  timestamp?: Date;
  readme?: string;
  raftVersionId?: number;
  raftVersion?: RaftVersionDto;
}
