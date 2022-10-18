import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';

export interface UserPrivilegeDto extends WithCreatedAndUpdatedDto {
  username?: string;
  role?: string;
}
