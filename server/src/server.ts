import { app } from './app';

const port = process.env.PORT || 3000;

export const startServer = () => {
  app.listen(port, () => {
    console.log('listening at http://%s:%s', 'localhost', port);
  });
};
