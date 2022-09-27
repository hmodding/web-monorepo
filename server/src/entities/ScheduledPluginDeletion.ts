import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';
import { Plugin } from './Plugin';

@Entity({ name: 'scheduled-plugin-deletions' })
export class ScheduledPluginDeletion extends AbstractEntityWithGeneratedId {
  @Column({ unique: true })
  pluginId!: number;

  @Column({ nullable: true })
  deletionTime!: Date;

  @OneToOne(() => Plugin)
  @JoinColumn()
  plugin?: Plugin;
}
