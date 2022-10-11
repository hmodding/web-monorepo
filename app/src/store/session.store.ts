import dayjs from 'dayjs';
import { api } from '../modules/api';
import { Session } from '../types/Session';
import {
  getPersistedSessionToken,
  persistSessionToken,
  unPersistSessionToken,
} from './persistence.store';
import { state } from './store';

export const isSessionExpired = () => {
  const { session } = state;

  if (session?.expires) {
    const now = dayjs();
    const expires = dayjs(session.expires);

    if (expires.isAfter(now)) {
      return false;
    }
  }

  return true;
};

export const initSession = async () => {
  const token = getPersistedSessionToken();

  document.body.setAttribute('data-theme', state.theme);

  if (token) {
    state.session = await api.getSession(token);
    api.setAuthToken(state.session!.token);

    if (state.session?.user?.role === 'UNFINISHED') {
      state.likes = [];
    } else {
      state.likes = (await api.getModLikes()).map(({ modId }) => modId);
    }
  }
  state.latestRaftVersion = (
    await api.getRaftVersions({ sort: '-releasedAt', count: 1 })
  )[0];
};

export const setSession = async (session: Session) => {
  state.session = session;
  api.setAuthToken(state.session.token);
  persistSessionToken(session.token);
  state.likes = (await api.getModLikes()).map(({ modId }) => modId);
};

export const killSession = async () => {
  const { session } = state;
  await api.deleteSession(session!.token);
  state.session = null;
  state.likes = [];
  unPersistSessionToken();
};
