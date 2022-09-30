import finale from 'finale-rest';
import { schema as addRaftVersionSchema } from '../../../forms/addRaftVersionForm';
import { schema as editRaftVersionSchema } from '../../../forms/editRaftVersionForm';
import { raftVersionModel } from '../../models';
import { validateAdminPrivileges, validateSchema } from './_commons';

export const raftVersionsEndpoint = finale.resource({
  model: raftVersionModel,
  endpoints: ['/raftVersions', '/raftVersions/:id'],
  actions: ['read', 'list', 'update', 'create'],
});

raftVersionsEndpoint.read.auth(async (req, res, context) => {
  if (await validateAdminPrivileges(req, res)) {
    return context.continue;
  }
});

raftVersionsEndpoint.update.auth(async (req, res, context) => {
  const user = validateAdminPrivileges(req, res);

  if (!user) {
    return;
  }

  if (!validateSchema(req.body, editRaftVersionSchema, res)) {
    return;
  }

  return context.continue;
});

raftVersionsEndpoint.create.auth(async (req, res, context) => {
  const user = validateAdminPrivileges(req, res);

  if (!user) {
    return;
  }

  if (!validateSchema(req.body, addRaftVersionSchema, res)) {
    return;
  }

  return context.continue;
});
