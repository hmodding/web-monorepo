import { reactive } from 'vue';
import { State as RootState } from '../types/State';
import { getSavedTheme } from './theme.store';

export const state = reactive<RootState>({
  session: null,
  theme: getSavedTheme(),
  likes: [],
  latestRaftVersion: null,
});
