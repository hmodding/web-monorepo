import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';

export interface RaftVersionDto extends WithCreatedAndUpdatedDto {
  id: number;
  version: string;
  buildId: number;
  title: string;
  releasedAt: Date;
}
