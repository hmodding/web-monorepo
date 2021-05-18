import finale from 'finale-rest';
import { launcherVersionModel } from '../../models';
import cfg from '../cfg';
import { FileManager } from '../FileManager';
import { validateAdminPrivileges as validateAdminPrivileges } from './_commons';

const fileManager = new FileManager(cfg);

export const launcherVersionsEndpoint = finale.resource({
  model: launcherVersionModel,
  endpoints: ['/launcherVersions', '/launcherVersions/:version'],
  associations: true,
  actions: ['read', 'list', 'create'],
});

export default launcherVersionsEndpoint;

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
