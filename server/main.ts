import 'reflect-metadata';
import { saveExampleDbData } from './resources/example/dbData.example';
import { cfg } from './src/cfg';
import { AppDataSource } from './src/dataSource';
import { startServer } from './src/server';
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
    await saveExampleDbData();
    console.log('Example data saved!');
  }

  await startServer();

  new DownloadCounterService(cfg).startListening();
})();
