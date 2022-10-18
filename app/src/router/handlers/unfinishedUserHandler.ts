import { NavigationGuardNext, RouteLocation } from 'vue-router';

export const unfinishedUserHandler = (
  to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext,
): void => {
  if (to.name !== 'finishAccount') {
    return next({ name: 'finishAccount' });
  }

  return next();
};
