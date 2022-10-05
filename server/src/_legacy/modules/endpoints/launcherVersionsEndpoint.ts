import finale from 'finale-rest';
import { cfg } from '../../../cfg';
import { notifier } from '../../../discord/DiscordNotifier';
import { FileManagerService } from '../../../services/FileManagerService';
import { LauncherVersion, launcherVersionModel } from '../../models';
import { validateAdminPrivileges } from './_commons';

const fileManager = new FileManagerService(cfg);

export const launcherVersionsEndpoint = finale.resource({
  model: launcherVersionModel,
  endpoints: ['/launcherVersions', '/launcherVersions/:version'],
  actions: ['read', 'list', 'create'],
});

launcherVersionsEndpoint.create.auth(async (req, res, context) => {
  if (await validateAdminPrivileges(req, res)) {
    return context.continue;
  }
});

launcherVersionsEndpoint.create.write.before(async (req, res, context) => {
  req.body.timestamp = new Date();

  const { file, version } = req.body;
  const buffer = Buffer.from(file.base64, 'base64');
  const upload = await fileManager.createLauncherVersionFile(
    version,
    file.name,
    buffer,
  );

  req.body.downloadUrl = upload.url;

  return context.continue;
});

launcherVersionsEndpoint.create.write.after(async (req, res, context) => {
  const newLauncherVersion: LauncherVersion = (context as any).instance;
  notifier.sendLauncherVersionReleaseNotification(newLauncherVersion);
  return context.continue;
});