import { Theme } from '../types/State';
import { getPersistedTheme, persistTheme } from './persistence.store';
import { state } from './store';

export const getSavedTheme = (): Theme => {
  const pTheme = getPersistedTheme();

  return pTheme === 'dark' ? 'dark' : 'light';
};

export const setTheme = (theme: Theme) => {
  state.theme = theme;
  persistTheme(`${theme}`);
  document.body.setAttribute('data-theme', state.theme);
};
