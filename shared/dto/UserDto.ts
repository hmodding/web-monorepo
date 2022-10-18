import { UserRole } from '../types/UserRole';
import { ModBundleDto } from './ModBundleDto';
import { ModDto } from './ModDto';
import { PluginDto } from './PluginDto';
import { UserPrivilegeDto } from './UserPriviligeDto';
import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';

export interface UserDto extends WithCreatedAndUpdatedDto {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  privileges?: UserPrivilegeDto[];
  plugins?: PluginDto[];
  modBundles?: ModBundleDto[];
  likedMods?: ModDto[];
}
