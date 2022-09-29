import 'reflect-metadata';
import { cfg } from './src/cfg';
import { AppDataSource } from './src/dataSource';
import { DownloadCounter } from './src/DownloadCounter';
import { startServer } from './src/server';
import { tsoaSetup } from './src/tsoaSetup';

(async () => {
  console.log(
    '\n##################################\n' +
      '##\t\t\t\t##\n' +
      '##\t STARTING SERVER \t##\n' +
      '##\t\t\t\t##\n' +
      '##################################\n',
  );
  // await sequelize.sync({ force: false }); //legacy
  await AppDataSource.initialize(); //new
  console.log('AppDataSource initialized!');

  if (process.env.NODE_ENV === 'develop') {
    //TODO: insertDatabaseExampleData();
    console.log('[DEV]: database example data inserted!');
  }

  startServer();
  tsoaSetup();
  new DownloadCounter(cfg).startListening();
  console.log('download-counter starting to listen!');
})();
