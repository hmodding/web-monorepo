import app from '../app';
import pkg from '../../../package.json';
import './login';
import './mods';
import './forms';
import './modVersions';

import { base } from '../rest';

app.get('/', async (req: any, res: any) => {
  res.status(200).send({
    status: 'online',
    version: pkg.version,
    rest: {
      base,
    },
  });
});
