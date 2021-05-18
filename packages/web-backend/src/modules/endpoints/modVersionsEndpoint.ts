import finale from 'finale-rest';
import { modVersionModel } from '../../models';
import { validateAndWriteModFile, validateModOwnership } from './_commons';

export const modVersionsEndpoint = finale.resource({
  model: modVersionModel,
  endpoints: ['/mods/:modId/versions', '/mods/:modId/versions/:version'],
  actions: ['create', 'update'],
});

export default modVersionsEndpoint;

modVersionsEndpoint.create.auth(async (req, res, context) => {
  if (await validateModOwnership(req, res, 'modId')) {
    return context.continue;
  }

  return;
});

modVersionsEndpoint.create.write.before(async (req, res, context) => {
  const { definiteMaxRaftVersion } = req.body;

  req.body.modId = req.params.modId;
  req.body.definiteMaxRaftVersion = !!definiteMaxRaftVersion;

  if (await validateAndWriteModFile(req, res)) {
    return context.continue;
  }
});

modVersionsEndpoint.update.auth(async (req, res, context) => {
  if (await validateModOwnership(req, res, 'modId')) {
    return context.continue;
  }

  return;
});

modVersionsEndpoint.update.write.before(async (req, res, context) => {
  const { definiteMaxRaftVersion } = req.body;

  req.body.modId = req.params.modId;
  req.body.definiteMaxRaftVersion = !!definiteMaxRaftVersion;

  return context.continue;
});
