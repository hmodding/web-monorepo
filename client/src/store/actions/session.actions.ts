import dayjs from 'dayjs';
import {api} from '../../modules/api';
import {
  persistAuthtoken,
  deletePersistedAuthtoken, getPersistedAuthtoken,
} from '../persistence.store';
import {state} from '../store';
import jwtDecode from "jwt-decode";

export const isSessionExpired = (): boolean => {
  const session = state.session;
  const expiration = dayjs.unix(session?.exp || 0);
  const now = dayjs();

  return !expiration.isAfter(now);
};

export const initSession = async (): Promise<void> => {
  document.body.setAttribute('data-theme', state.theme);

  const token = getPersistedAuthtoken();

  if (token) {
    //TODO: refresh and/or recheck token?
    await setSession(token);
    state.likes = (await api.getLikedMods())!;
  }
  state.latestRaftVersion = (
    await api.getRaftVersions({sort: '-releasedAt', count: 1})
  )[0];
};

export const setSession = async (token: string): Promise<void> => {
  state.session = jwtDecode(token);
  persistAuthtoken(token);
};

export const killSession = async (): Promise<void> => {
  const {session} = state;
  //await api.deleteSession(session!.token);
  state.session = null;
  state.likes = [];
  deletePersistedAuthtoken();
};
