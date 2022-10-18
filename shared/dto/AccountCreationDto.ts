import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';

export interface AccountCreationDto extends WithCreatedAndUpdatedDto {
  username?: string;
  email?: string;
  password?: string;
  token?: string;
}
