import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';
import { ModDto } from './ModDto';

export interface ScheduledModDeletionDto extends WithCreatedAndUpdatedDto {
  modId?: string;
  deletionTime?: Date;
  mod?: ModDto;
}
