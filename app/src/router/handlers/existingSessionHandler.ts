import { NavigationGuardNext, RouteLocation } from 'vue-router';
import { toaster } from '../../modules/toaster';

export const existingSessionHandler = (
  _to: RouteLocation,
  _from: RouteLocation,
  next: NavigationGuardNext,
): void => {
  toaster.success('You are already logged in');

  return next({ name: 'home' });
};
