import 'reflect-metadata';
import { AppDataSource } from './src/dataSource';
import cfg from './src/cfg';
import { DownloadCounter } from './src/DownloadCounter';
import './src/modules/endpoints';
import './src/modelAssociations';
import './src/rest';
import './src/router';
import server from './src/server';
import { insertDatabaseExampleData } from './src/utils';

(async () => {
  // await sequelize.sync({ force: false }); //legacy
  await AppDataSource.initialize(); //new

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
