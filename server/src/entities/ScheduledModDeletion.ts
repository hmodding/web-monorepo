import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';
import { Mod } from './Mod';

@Entity({ name: 'scheduled-mod-deletion' })
export class ScheduledModDeletion extends AbstractEntityWithGeneratedId {
  @Column({ unique: true })
  modId!: string;

  @Column({ nullable: true })
  deletionTime!: Date;

  @OneToOne(() => Mod)
  @JoinColumn()
  mod?: Mod;
}
