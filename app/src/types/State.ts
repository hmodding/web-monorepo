import RaftVersion from './RaftVersion';
import Session from './Session';

export default interface State {
  session: Session;
  theme: Theme;
  likes: string[];
  latestRaftVersion: RaftVersion;
  blank: boolean;
}

export type Theme = 'light' | 'dark';
