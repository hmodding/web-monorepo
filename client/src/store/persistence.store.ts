import {
  LOCAL_STORAGE_COOKIE_CONSENT,
  LOCAL_STORAGE_SESSION,
  LOCAL_STORAGE_THEME,
} from '../const/localStorage.const';
import { Theme } from './store';

export type CookieConsentAnswer = 'accepted';

export const persistTheme = (theme: Theme) => {
  persistItem(LOCAL_STORAGE_THEME, theme);
};

export const getPersistedTheme = (): Theme => {
  const lsTheme = localStorage.getItem(LOCAL_STORAGE_THEME);

  return lsTheme === 'dark' ? 'dark' : 'light';
};

export const getPersistedCookieConsent = () => {
  return getPersistedItem(LOCAL_STORAGE_COOKIE_CONSENT);
};

export const persistCookieConsent = (answer: CookieConsentAnswer) => {
  persistItem(LOCAL_STORAGE_COOKIE_CONSENT, answer);
};

export const getPersistedSession = () => {
  return getPersistedItem(LOCAL_STORAGE_SESSION);
};

export const persistSession = (token: string) => {
  persistItem(LOCAL_STORAGE_SESSION, token);
};

export const unPersistSession = () => {
  unPersistItem(LOCAL_STORAGE_SESSION);
};

// ------------

/**
 * proxy to eventually switch out local storage
 * @param key `string`
 * @param value `string`
 */
const persistItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**
 * proxy to eventually switch out localStorage
 * @param key `string`
 * @returns `string | undefined`
 */
const getPersistedItem = (key: string) => {
  return localStorage.getItem(key);
};

/**
 * proxy to eventually switch out local storage
 * @param key `string`
 */
const unPersistItem = (key: string) => {
  localStorage.removeItem(key);
};
