import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';
import { PluginVersionDto } from './PluginVersionDto';
import { ScheduledPluginDeletionDto } from './ScheduledPluginDeletionDto';
import { UserDto } from './UserDto';

export interface PluginDto extends WithCreatedAndUpdatedDto {
  slug?: string;
  title?: string;
  description?: string;
  readme?: string;
  maintainerId?: number;
  bannerImageUrl?: string;
  repositoryUrl?: string;
  maintainer?: UserDto;
  deletion?: ScheduledPluginDeletionDto;
  versions?: PluginVersionDto[];
}
