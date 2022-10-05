import finale from 'finale-rest';
import { validatePassword } from '../../../utils';
import { userModel } from '../../models';
import { validateAuthToken } from './_commons';

const usersEndpoint = finale.resource({
  model: userModel,
  endpoints: ['/users', '/users/:username'],
  actions: ['update'],
  excludeAttributes: ['password', 'email', 'role'],
});

usersEndpoint.update.auth(async (req, res, context) => {
  const session = await validateAuthToken(req, res);

  if (!session || !session.user) return;

  if (session.user.username !== req.params.username) {
    return res.status(403).send({
      error: 'You can not modify other users!',
    });
  }

  if (session.user.role !== 'admin' && req.body.role === 'admin') {
    delete req.body.role; //prevent granting admin role
  }

  const { currentPassword, password, passwordConfirm } = req.body;
  const user = await userModel.findOne({
    where: { id: session.userId },
    attributes: ['password'],
  }); // we know that the user exists since we checked the session

  if (user && !validatePassword(currentPassword || '', user.password)) {
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