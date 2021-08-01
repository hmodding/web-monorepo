import finale from 'finale-rest';
import { sessionModel } from '../../models';

const sessionsEndpoint = finale.resource({
  model: sessionModel,
  endpoints: ['/sessions', '/sessions/:token'],
  associations: true,
  actions: ['read', 'delete'],
});

export default sessionsEndpoint;
