import { createRouter, createWebHistory } from 'vue-router';
import Download from '../pages/Download.vue';
import Home from '../pages/Home.vue';
import LauncherChangelog from '../pages/LauncherChangelog.vue';
import LoaderChangelog from '../pages/LoaderChangelog.vue';
import NotFound from '../pages/NotFound.vue';
import { setBlankPage } from '../store/actions/blankPage.actions';
import { isSessionExpired } from '../store/actions/session.actions';
import { state } from '../store/store';
import { adminOnlyHandler } from './handlers/adminOnlyHandler';
import { existingSessionHandler } from './handlers/existingSessionHandler';
import { missingSessionHandler } from './handlers/missingSessionHandler';
import { unfinishedUserHandler } from './handlers/unfinishedUserHandler';
import { accountRoutes } from './routes/account.routes';
import { adminRoutes } from './routes/admin.routes';
import { legalRoutes } from './routes/legal.routes';
import { modRoutes } from './routes/mods.routes';
import { redirectRoutes } from './routes/redirect.routes';

export const router = createRouter({
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
    ...redirectRoutes,
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
  ],
});

router.beforeEach((to, from, next) => {
  setBlankPage(false);
  document.body.setAttribute('data-route', to.matched[0].name as string);

  if (isSessionExpired()) {
    if (to.meta.sessionRequired) {
      return missingSessionHandler(to, from, next);
    }
  } else {
    if (to.meta.prohibitSession) {
      return existingSessionHandler(to, from, next);
    } else if (to.meta.adminOnly) {
      return adminOnlyHandler(to, from, next);
    } else if (state.session?.user?.role === 'UNFINISHED') {
      return unfinishedUserHandler(to, from, next);
    }
  }

  return next();
});
