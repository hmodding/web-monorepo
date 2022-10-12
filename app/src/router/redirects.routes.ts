import { setBlankPage } from '../store/actions/blankPage.actions';

export default [
  {
    path: '/discord',
    beforeEnter() {
      setBlankPage(true);
      location.replace(import.meta.env.VITE_DISCORD_INVITE_LINK as string);
    },
  },
  {
    path: '/docs',
    beforeEnter() {
      setBlankPage(true);
      return location.replace(import.meta.env.VITE_API_DOCS_URL as string);
    },
  },
  {
    path: '/docs/multiple-files',
    beforeEnter() {
      setBlankPage(true);
      location.replace(
        import.meta.env.VITE_API_DOCS_MULTIPLE_FILES_URL as string,
      );
    },
  },
  {
    path: '/docs/slugs',
    beforeEnter() {
      setBlankPage(true);
      location.replace(import.meta.env.VITE_API_DOCS_SLUGS_URL as string);
    },
  },
];
