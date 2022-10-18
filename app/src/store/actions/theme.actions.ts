import { persistTheme } from '../persistence.store';
import { state, Theme } from '../store';

export const setTheme = (theme: Theme): void => {
  state.theme = theme;
  persistTheme(`${state.theme}`);
  document.body.setAttribute('data-theme', state.theme);
};
