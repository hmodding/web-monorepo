import { reactive } from 'vue';
import { RaftVersion, Session } from '../types';
import { getPersistedTheme } from './persistence.store';
import {JwtDecodeOptions, JwtPayload} from "jwt-decode";
import JwtState from "JwtState";

export default interface RootState {
  jwt: JwtState | null;
  theme: Theme;
  likes: string[];
  latestRaftVersion: RaftVersion | null;
  blankPage: boolean;
}

export type Theme = 'light' | 'dark';

export const state: RootState = reactive({
  jwt: null,
  theme: getPersistedTheme(),
  likes: [],
  latestRaftVersion: null,
  blankPage: false,
});
