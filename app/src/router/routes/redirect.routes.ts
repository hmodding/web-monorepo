import { RouteRecordRaw } from 'vue-router';
import Redirecting from '../../pages/Redirecting.vue';

export const redirectRoutes: RouteRecordRaw[] = [
  {
    path: '/discord',
    component: Redirecting,
    beforeEnter() {
      location.replace(import.meta.env.VITE_DISCORD_INVITE_LINK as string);
    },
  },
  {
    path: '/docs',
    component: Redirecting,
    beforeEnter() {
      return location.replace(import.meta.env.VITE_API_DOCS_URL as string);
    },
  },
  {
    path: '/docs/multiple-files',
    component: Redirecting,
    beforeEnter() {
      location.replace(
        import.meta.env.VITE_API_DOCS_MULTIPLE_FILES_URL as string,
      );
    },
  },
  {
    path: '/docs/slugs',
    component: Redirecting,
    beforeEnter() {
      location.replace(import.meta.env.VITE_API_DOCS_SLUGS_URL as string);
    },
  },
];
