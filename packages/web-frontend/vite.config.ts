import vue from '@vitejs/plugin-vue';
import { config } from 'dotenv';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(() => {
  config({ path: `../../.env` });

  return {
    publicDir:
      process.env.NODE_ENV === 'production' ? './public' : './public/_dev',
    plugins: [vue()],
  };
});
