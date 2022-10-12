import RaftVersion from './RaftVersion';
import Session from './Session';

export default interface State {
  session: Session | null;
  theme: Theme;
  likes: string[];
  latestRaftVersion: RaftVersion;
  blank: boolean;
}

export type Theme = 'light' | 'dark';
