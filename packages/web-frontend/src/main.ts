import './assets/styles/global.scss';
import 'notyf/notyf.min.css';

import { createApp } from 'vue';
import MarkdownIt from 'vue3-markdown-it';
import $ from 'jquery'; //TODO: get rid of it!
import { Modal, Tooltip } from 'bootstrap';

import router from './router';
import { initSession } from './modules/stateManager';

import App from './App.vue';

(async () => {
  $.extend(Modal);
  $.extend(Tooltip);
  await initSession();
  createApp(App).use(router).use(MarkdownIt).mount('#app');
})();
