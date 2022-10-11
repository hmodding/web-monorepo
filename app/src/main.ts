import 'notyf/notyf.min.css';
import './assets/styles/global.scss';

import { Modal, Tooltip } from 'bootstrap';
import $ from 'jquery'; //TODO: get rid of it!
import { createApp } from 'vue';
import {
  createMetaManager,
  defaultConfig,
  plugin as metaPlugin,
} from 'vue-meta';
import MarkdownIt from 'vue3-markdown-it';

import App from './App.vue';
import { router } from './router/router';
import { initSession } from './store/session.store';

(async () => {
  const metaManager = createMetaManager(false, {
    ...defaultConfig,
    meta: { tag: 'meta', nameless: true },
  });

  $.extend(Modal);
  $.extend(Tooltip);
  await initSession();

  const app = createApp(App);

  app.use(router);
  app.use(metaManager);
  app.use(metaPlugin);
  app.use(MarkdownIt);

  app.mount('#app');
})();
