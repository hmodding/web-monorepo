import pkg from '../../package.json';
import '../forms';
import router from './router';
import './routes/account';
import './routes/auth';
import './routes/login';
import './routes/mods';

router.get('/', async (req: any, res: any) => {
  res.status(200).send({
    status: 'online',
    version: pkg.version,
  });
});

export default router;
