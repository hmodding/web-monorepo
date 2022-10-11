import { RaftVersion } from './RaftVersion';

export interface LoaderVersion {
  rmlVersion: string;
  raftVersionId: number;
  timestamp: Date;
  readme?: string;
  raftVersion?: RaftVersion;
  updatedAt?: Date;
}
