import { WithCreatedAndUpdatedDto } from './WithCreatedAndUpdatedDto';
import { PluginDto } from './PluginDto';

export interface PluginVersionDto extends WithCreatedAndUpdatedDto {
  pluginId?: number;
  version?: string;
  changelog?: string;
  downloadUrl?: string;
  downloadCount?: number;
  minServerVersionId?: string;
  maxServerVersionId?: string;
  definiteMaxServerVersion?: boolean;
  plugin?: PluginDto;
}
