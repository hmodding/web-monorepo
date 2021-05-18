import pkg from '../../../package.json';
import { base } from '../rest';
import './forms';
import './login';
import './mods';
import router from './router';

router.get('/', async (req: any, res: any) => {
  res.status(200).send({
    status: 'online',
    version: pkg.version,
    rest: {
      base,
    },
  });
});

export default router;
