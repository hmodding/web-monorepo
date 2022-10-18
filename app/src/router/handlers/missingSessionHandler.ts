import { NavigationGuardNext, RouteLocation } from 'vue-router';
import { toaster } from '../../modules/toaster';

export const missingSessionHandler = (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext,
): void => {
  toaster.error('Please login to proceed');

  const { name, query, params } = to || {};
  let redirect = name;
  let queryStr = JSON.stringify(query || null);
  let paramsStr = JSON.stringify(params || null);

  if (!redirect || redirect === 'login') {
    redirect = 'home';
  }

  return next({
    name: 'signIn',
    query: { redirect, paramsStr: paramsStr, queryStr: queryStr },
  } as any);
};
