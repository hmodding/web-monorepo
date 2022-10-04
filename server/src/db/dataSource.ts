// eslint-disable-next-line import/no-default-export
import { DataSource } from 'typeorm';
import { cfg } from '../cfg';
import { AccountCreation } from '../entities/AccountCreation';
import { DiscordAccountCreation } from '../entities/DiscordAccountCreation';
import { DiscordSignOn } from '../entities/DiscordSignOn';
import { DownloadTracker } from '../entities/DownloadTracker';
import { FileScan } from '../entities/FileScan';
import { LauncherVersion } from '../entities/LauncherVersion';
import { LoaderVersion } from '../entities/LoaderVersion';
import { Mod } from '../entities/Mod';
import { ModBundle } from '../entities/ModBundle';
import { ModLike } from '../entities/ModLike';
import { ModVersion } from '../entities/ModVersion';
import { PasswordReset } from '../entities/PasswordReset';
import { Plugin } from '../entities/Plugin';
import { PluginVersion } from '../entities/PluginVersion';
import { RaftVersion } from '../entities/RaftVersion';
import { ScheduledModDeletion } from '../entities/ScheduledModDeletion';
import { ScheduledPluginDeletion } from '../entities/ScheduledPluginDeletion';
import { ServerVersion } from '../entities/ServerVersion';
import { Session } from '../entities/Session';
import { User } from '../entities/User';
import { UserPrivilege } from '../entities/UserPrivilege';

const { uri, ssl } = cfg.database;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  url: uri,
  ssl,
  logging: false,
  synchronize: false,
  entities: [
    AccountCreation,
    DiscordAccountCreation,
    DiscordSignOn,
    DownloadTracker,
    FileScan,
    LauncherVersion,
    LoaderVersion,
    Mod,
    ModBundle,
    ModLike,
    ModVersion,
    PasswordReset,
    Plugin,
    PluginVersion,
    RaftVersion,
    ScheduledModDeletion,
    ScheduledPluginDeletion,
    ServerVersion,
    Session,
    User,
    UserPrivilege,
  ],
});
