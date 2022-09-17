import cfg from './modules/cfg';
import sequelize from './modules/sequelize';
import './modules/modelAssociations';
import './modules/rest';
import './modules/endpoints';
import './modules/routes';
import server from './modules/server';
import { DownloadCounter } from './modules/DownloadCounter';
import { insertDatabaseExampleData } from './modules/utils';

(async () => {
  await sequelize.sync({ force: false });

  if (process.env.NODE_ENV === 'develop') {
    insertDatabaseExampleData();
  }

  const port = cfg.server.port;

  server.listen(port);
  server.on('error', console.error);
  server.on('listening', () => {
    // noinspection HttpUrlsUsage
    console.log('listening at http://%s:%s', 'localhost', port);
  });

  new DownloadCounter(cfg).startListening();
})();
