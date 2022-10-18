import { ModDto } from './ModDto';
import { UserDto } from './UserDto';
import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';

export interface ModLikeDto extends WithCreatedAndUpdatedDto {
  userId?: number;
  modId?: string;
  user?: UserDto;
  mod?: ModDto;
}
