import { Plugin } from 'Plugin';
import ModBundle from './ModBundle';
import { ModLike } from './ModLike';

export default interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  role?: string; //not downwards compatible with old DB
  plugins?: Plugin[];
  modBundles?: ModBundle[];
  likedMods?: ModLike[];
  createdAt?: Date;
  updatedAt?: Date;
}
