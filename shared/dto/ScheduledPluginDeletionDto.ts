import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';
import { PluginDto } from './PluginDto';

export interface ScheduledPluginDeletionDto extends WithCreatedAndUpdatedDto {
  pluginId?: number;
  deletionTime?: Date;
  plugin?: PluginDto;
}
