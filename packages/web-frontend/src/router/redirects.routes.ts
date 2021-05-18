export default [
  {
    path: '/discord',
    beforeEnter() {
      location.replace(import.meta.env.VITE_DISCORD_INVITE_LINK as string);
    },
  },
  {
    path: '/docs',
    beforeEnter() {
      location.replace(import.meta.env.VITE_API_DOCS_URL as string);
    },
  },
  {
    path: '/docs/multiple-files',
    beforeEnter() {
      location.replace(
        import.meta.env.VITE_API_DOCS_MULTIPLE_FILES_URL as string,
      );
    },
  },
  {
    path: '/docs/slugs',
    beforeEnter() {
      location.replace(import.meta.env.VITE_API_DOCS_SLUGS_URL as string);
    },
  },
];
