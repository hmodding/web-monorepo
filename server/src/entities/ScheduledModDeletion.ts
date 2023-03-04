import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';
import {AbstractEntityWithGeneratedId} from './AbstractEntityWithGeneratedId';
import {Mod} from './Mod';

@Entity({name: 'scheduled-mod-deletions'})
export class ScheduledModDeletion extends AbstractEntityWithGeneratedId {
  @Column({unique: true})
  modId!: string;

  @Column({nullable: true, type: 'timestamp with time zone'})
  deletionTime!: Date;

  @OneToOne(() => Mod, mod => mod.scheduledDeletion)
  @JoinColumn()
  mod?: Mod;
}
