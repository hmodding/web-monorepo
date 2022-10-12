import { createRouter, createWebHistory } from 'vue-router';
import Download from '../pages/Download.vue';
import Home from '../pages/Home.vue';
import LauncherChangelog from '../pages/LauncherChangelog.vue';
import LoaderChangelog from '../pages/LoaderChangelog.vue';
import NotFound from '../pages/NotFound.vue';
import { setBlankPage } from '../store/actions/blankPage.actions';
import { isSessionExpired } from '../store/actions/session.actions';
import { state } from '../store/store';
import accountRoutes from './account.routes';
import adminRoutes from './admin.routes';
import legalRoutes from './legal.routes';
import modRoutes from './mods.routes';
import redirectsRoutes from './redirects.routes';
import {
  handleAdminOnly,
  handleExistingSession,
  handleMissingSession,
  handleUnfinishedUser,
} from './routerHandlers';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/download',
      name: 'download',
      component: Download,
    },
    {
      path: '/launcher/:version',
      name: 'launcherChangelog',
      component: LauncherChangelog,
    },
    {
      path: '/loader/:version',
      name: 'loaderChangelog',
      component: LoaderChangelog,
    },
    ...modRoutes,
    ...accountRoutes,
    ...legalRoutes,
    ...adminRoutes,
    ...redirectsRoutes,
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
  ],
});

export default router;

router.beforeEach((to, from, next) => {
  setBlankPage(false);
  document.body.setAttribute('data-route', to.matched[0].name as string);

  if (isSessionExpired()) {
    if (to.meta.sessionRequired) {
      return handleMissingSession(to, from, next);
    }
  } else {
    if (to.meta.prohibitSession) {
      return handleExistingSession(to, from, next);
    } else if (to.meta.adminOnly) {
      return handleAdminOnly(to, from, next);
    } else if (state.session?.user?.role === 'UNFINISHED') {
      return handleUnfinishedUser(to, from, next);
    }
  }

  return next();
});
