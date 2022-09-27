import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';
import { PluginVersion } from './PluginVersion';
import { ScheduledPluginDeletion } from './ScheduledPluginDeletion';
import { User } from './User';

@Entity({ name: 'plugins' })
export class Plugin extends AbstractEntityWithGeneratedId {
  @Column({ unique: true, length: 64 })
  slug!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'text' })
  readme!: string;

  @Column()
  maintainerId!: number;

  @Column({ type: 'text' })
  bannerImageUrl!: string;

  @Column({ type: 'text', nullable: true })
  repositoryUrl?: string;

  @OneToOne(() => User)
  @JoinColumn()
  maintainer?: User;

  @OneToOne(() => ScheduledPluginDeletion)
  @JoinColumn()
  deletion?: ScheduledPluginDeletion;

  @OneToMany(() => PluginVersion, (version) => version.plugin)
  versions?: PluginVersion[];
}
