import {
  STORAGE_COOKIE_CONSENT,
  STORAGE_AUTHTOKEN,
  STORAGE_THEME,
} from '../const/localStorage.const';
import { Theme } from './store';

export type CookieConsentAnswer = 'accepted';

export const persistTheme = (theme: Theme) => {
  persistItem(STORAGE_THEME, theme);
};

export const getPersistedTheme = (): Theme => {
  const lsTheme = localStorage.getItem(STORAGE_THEME);

  return lsTheme === 'dark' ? 'dark' : 'light';
};

export const getPersistedCookieConsent = () => {
  return getPersistedItem(STORAGE_COOKIE_CONSENT);
};

export const persistCookieConsent = (answer: CookieConsentAnswer) => {
  persistItem(STORAGE_COOKIE_CONSENT, answer);
};

export const getPersistedAuthtoken = () => {
  return getPersistedItem(STORAGE_AUTHTOKEN);
};

export const persistAuthtoken = (token: string) => {
  persistItem(STORAGE_AUTHTOKEN, token);
};

export const deletePersistedAuthtoken = () => {
  deleteItem(STORAGE_AUTHTOKEN);
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
const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};
