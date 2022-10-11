import { ModVersion } from './ModVersion';
import { User } from './User';

export interface ModBundle {
  title: string;
  description: string;
  readme: string;
  maintainerId: number;
  bannerImageUrl?: string;
  maintainer?: User;
  modContents?: ModVersion[];
}
