import finale from 'finale-rest';
import { Session, User, userModel } from '../../models';
import { generateToken, validatePassword } from '../utils';
import { validateAuthToken, validateSchema } from './_commons';
import { schema as finishAccountSchema } from '../routes/forms/finishAccountForm';

const usersEndpoint = finale.resource({
  model: userModel,
  endpoints: ['/users', '/users/:username'],
  associations: true,
  actions: ['read', 'list', 'update'],
  excludeAttributes: ['password'],
});

usersEndpoint.update.auth(async (req, res, context) => {
  const session = (await validateAuthToken(req, res)) as Session;

  if (!session || !session.user) return;

  if (session.user.role !== 'admin' && req.body.role === 'admin') {
    delete req.body.role; //prevent granting admin role
  }

  const { currentPassword, password, passwordConfirm } = req.body;
  const user: User = session.user!;

  if (!validatePassword(currentPassword || '', user.password)) {
    return res.status(403).send({
      error: 'Your current password was incorrect!',
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).send({
      error: 'New passwords do not match!',
    });
  }

  req.body = { password };
  return context.continue;
});

export default usersEndpoint;
