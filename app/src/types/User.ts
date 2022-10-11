import { Plugin } from 'Plugin';
import { UserRole } from '../../../shared/types/UserRole';
import { ModBundle } from './ModBundle';
import { ModLike } from './ModLike';

export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role?: UserRole; //not downwards compatible with old DB
  plugins?: Plugin[];
  modBundles?: ModBundle[];
  likedMods?: ModLike[];
  createdAt?: Date;
  updatedAt?: Date;
}
