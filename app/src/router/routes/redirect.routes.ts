import { RouteRecordRaw } from 'vue-router';
import { setBlankPage } from '../../store/actions/blankPage.actions';

export const redirectRoutes: RouteRecordRaw[] = [
  {
    path: '/discord',
    redirect: '/',
    beforeEnter() {
      setBlankPage(true);
      location.replace(import.meta.env.VITE_DISCORD_INVITE_LINK as string);
    },
  },
  {
    path: '/docs',
    redirect: '/',
    beforeEnter() {
      setBlankPage(true);
      return location.replace(import.meta.env.VITE_API_DOCS_URL as string);
    },
  },
  {
    path: '/docs/multiple-files',
    redirect: '/',
    beforeEnter() {
      setBlankPage(true);
      location.replace(
        import.meta.env.VITE_API_DOCS_MULTIPLE_FILES_URL as string,
      );
    },
  },
  {
    path: '/docs/slugs',
    redirect: '/',
    beforeEnter() {
      setBlankPage(true);
      location.replace(import.meta.env.VITE_API_DOCS_SLUGS_URL as string);
    },
  },
];
