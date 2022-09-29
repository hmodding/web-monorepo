import pkg from '../../package.json';
import { base } from '../rest';
import './routes/auth';
import '../forms';
import './routes/login';
import './routes/mods';
import './routes/account';
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
