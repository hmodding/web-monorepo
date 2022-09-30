import 'reflect-metadata';
import { startServer } from './src/server';
import { cfg } from './src/cfg';
import { AppDataSource } from './src/db/dataSource';
import { DownloadCounterService } from './src/services/DownloadCounterService';

(async () => {
  console.log(
    '\n##################################\n' +
      '##\t\t\t\t##\n' +
      '##\t STARTING SERVER \t##\n' +
      '##\t\t\t\t##\n' +
      '##################################\n',
  );
  await AppDataSource.initialize(); //new
  console.log('AppDataSource initialized!');

  if (process.env.NODE_ENV === 'develop') {
    //TODO: insertDatabaseExampleData();
  }

  await startServer();

  new DownloadCounterService(cfg).startListening();
})();
