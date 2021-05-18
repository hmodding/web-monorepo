import RaftVersion from './RaftVersion';

export default interface LoaderVersion {
  rmlVersion: string;
  raftVersionId: number;
  timestamp: Date;
  downloadUrl?: string;
  readme?: string;
  raftVersion?: RaftVersion;
  updatedAt?: Date;
}
