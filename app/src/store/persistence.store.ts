import {
  LOCAL_STORAGE_COOKIE_CONSENT,
  LOCAL_STORAGE_SESSION,
  LOCAL_STORAGE_THEME,
} from '../const/localStorage.const';
import { Theme } from '../types/State';

type CookieConsentValue = 'accepted' | '';

export const persistTheme = (theme: Theme) => {
  localStorage.setItem(LOCAL_STORAGE_THEME, `${theme}`);
};

export const getPersistedTheme = () => {
  return localStorage.getItem(LOCAL_STORAGE_THEME);
};

export const persistSessionToken = (token: string) => {
  localStorage.setItem(LOCAL_STORAGE_SESSION, token);
};

export const getPersistedSessionToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_SESSION);
};

export const unPersistSessionToken = () => {
  localStorage.removeItem(LOCAL_STORAGE_SESSION);
};

export const persistCookieConsent = (cookieConsent: CookieConsentValue) => {
  localStorage.setItem(LOCAL_STORAGE_COOKIE_CONSENT, String(cookieConsent));
};

export const getPersistedCookieConsent = () => {
  return localStorage.getItem(LOCAL_STORAGE_COOKIE_CONSENT);
};
