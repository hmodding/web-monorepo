import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';
import { ModVersionDto } from './ModVersionDto';
import { UserDto } from './UserDto';

export interface ModBundleDto extends WithCreatedAndUpdatedDto {
  title?: string;
  description?: string;
  readme?: string;
  maintainerId?: number;
  bannerImageUrl?: string;
  maintainer?: UserDto;
  modContents?: ModVersionDto[];
}
