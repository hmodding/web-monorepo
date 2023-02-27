import 'reflect-metadata';
import {saveExampleDbData} from './resources/example/dbData.example';
import {cfg} from './src/cfg';
import {AppDataSource} from './src/db/dataSource';
import {startServer} from './src/app';
import {DownloadCounterService} from './src/services/DownloadCounterService';

(async () => {
  console.log(`
##################################
##                              ##
##       STARTING SERVER        ##
##   (profile: ${process.env.NODE_ENV})     ##
##                              ##
##################################`);
  console.log('    ⏳ Connection AppDataSource...');
  await AppDataSource.initialize(); //new
  console.log('    ✔️ AppDataSource initialized!');

  if (process.env.NODE_ENV === 'development') {
    await saveExampleDbData();
    console.log('    ✔️ Example data saved!');
  }

  await startServer();

  new DownloadCounterService(cfg).startListening();
})();
