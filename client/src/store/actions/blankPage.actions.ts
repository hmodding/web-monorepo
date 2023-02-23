import { state } from '../store';

export const setBlankPage = (value: boolean) => {
  state.blankPage = value;
};
