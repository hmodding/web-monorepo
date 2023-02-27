import {RouteRecordRaw} from 'vue-router';
import Redirecting from '../../pages/Redirecting.vue';
import {
  API_DOCS_MULTIPLE_FILES_URL,
  API_DOCS_SLUGS_URL,
  API_DOCS_URL,
  DISCORD_INVITE_LINK
} from "../../const/links.const";

export const redirectRoutes: RouteRecordRaw[] = [
  {
    path: '/discord',
    component: Redirecting,
    beforeEnter() {
      location.replace(DISCORD_INVITE_LINK);
    },
  },
  {
    path: '/docs',
    component: Redirecting,
    beforeEnter() {
      return location.replace(API_DOCS_URL);
    },
  },
  {
    path: '/docs/multiple-files',
    component: Redirecting,
    beforeEnter() {
      location.replace(API_DOCS_MULTIPLE_FILES_URL);
    },
  },
  {
    path: '/docs/slugs',
    component: Redirecting,
    beforeEnter() {
      location.replace(API_DOCS_SLUGS_URL);
    },
  },
];
