import finale from 'finale-rest';
import { loaderVersionModel } from '../../models';
import { validateAdminPrivileges } from './_commons';

export const loaderVersionsEndpoint = finale.resource({
  model: loaderVersionModel,
  endpoints: ['/loaderVersions', '/loaderVersions/:rmlVersion'],
  associations: true,
  actions: ['read', 'list', 'create'],
});

export default loaderVersionsEndpoint;

loaderVersionsEndpoint.create.auth(async (req, res, context) => {
  if (await validateAdminPrivileges(req, res)) {
    return context.continue;
  }
});

loaderVersionsEndpoint.create.write.before(async (req, res, context) => {
  req.body.timestamp = new Date();

  return context.continue;
});
