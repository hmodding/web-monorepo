import { NavigationGuardNext, RouteLocation } from 'vue-router';
import { toaster } from '../../modules/toaster';
import { isSessionExpired } from '../../store/actions/session.actions';
import { state } from '../../store/store';

export const adminOnlyHandler = (
  _to: RouteLocation,
  from: RouteLocation,
  next: NavigationGuardNext,
): void => {
  if (isSessionExpired() || state.jwt?.user?.role !== 'admin') {
    toaster.error(`You are missing privileges to view this page!`);
    return next(from);
  } else {
    return next();
  }
};
