import vue from '@vitejs/plugin-vue';
import {defineConfig, loadEnv} from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  //load env vars from ../.env.* -> https://www.npmjs.com/package/dotenv-flow
  const env = loadEnv(mode, '../', '');

  const port = Number(env.VITE_PORT || 5000);

  let proxy = {};

  if (mode === 'development') {
    proxy = {
      '/api/': {
        target: `http://localhost:${env.SERVER_PORT}`, // The URL of the Express API
        changeOrigin: true,
      },
    }
  }

  return {
    plugins: [vue()],
    base: '/',
    server: {
      port,
      proxy,
    },
  };
});
