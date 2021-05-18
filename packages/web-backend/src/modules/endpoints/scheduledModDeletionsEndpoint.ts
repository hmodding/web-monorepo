import finale from 'finale-rest';
import { scheduledModDeletionModel } from '../../models';
import { validateModOwnership } from './_commons';
import dayjs, { UnitTypeShort } from 'dayjs';
import cfg from '../cfg';

export const scheduledModDeletionsEndpoint = finale.resource({
  model: scheduledModDeletionModel,
  endpoints: ['/scheduledModDeletions', '/scheduledModDeletions/:id'],
  actions: ['create'],
});

export default scheduledModDeletionsEndpoint;

scheduledModDeletionsEndpoint.create.auth(async (req, res, context) => {
  const { modId } = req.body;

  req.params.id = modId;

  if (await validateModOwnership(req, res)) {
    return context.continue;
  }

  return;
});

scheduledModDeletionsEndpoint.create.write.before(async (req, res, context) => {
  const add = cfg.scheduledDeletionTime;
  const amount = Number(add.match('^\\d+')![0]);
  const unit = add.match('[A-Za-z]+$')![0] as UnitTypeShort;

  req.body.deletionTime = dayjs().add(amount, unit);

  return context.continue;
});
