import vue from '@vitejs/plugin-vue';
import {config} from 'dotenv-flow';
import {defineConfig, loadEnv} from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  //load env vars from ../.env.* -> https://www.npmjs.com/package/dotenv-flow
  const env = loadEnv(mode, '../');

  const port = Number(env.VITE_PORT || 5000);

  return {
    plugins: [vue()],
    base: '/',
    server: {
      port,
      proxy: {
        // '/api': 'http://localhost:3000', // The URL of the Express API
      }
    },
  };
});
