import { Mod } from './Mod';

export interface ScheduledModDeletion {
  modId: string;
  deletionTime: Date;
  mod?: Mod;
}
