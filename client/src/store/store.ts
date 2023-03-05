import { reactive } from 'vue';
import { RaftVersion, Session } from '../types';
import { getPersistedTheme } from './persistence.store';
import {JwtDecodeOptions, JwtPayload} from "jwt-decode";
import SessionState from "SessionState";

export default interface RootState {
  session: SessionState | null;
  theme: Theme;
  likes: string[];
  latestRaftVersion: RaftVersion | null;
  blankPage: boolean;
}

export type Theme = 'light' | 'dark';

export const state: RootState = reactive({
  session: null,
  theme: getPersistedTheme(),
  likes: [],
  latestRaftVersion: null,
  blankPage: false,
});
