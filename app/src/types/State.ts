import { RaftVersion } from './RaftVersion';
import { Session } from './Session';

export interface State {
  session: Session | null;
  theme: Theme;
  likes: string[];
  latestRaftVersion: RaftVersion | null;
}

export type Theme = 'light' | 'dark';
