import {Column, Entity, Index, ManyToOne} from 'typeorm';

import {AbstractEntityWithGeneratedId} from './AbstractEntityWithGeneratedId';
import {Plugin} from './Plugin';

@Entity({name: 'plugin-versions'})
@Index(['pluginId', 'version'], {unique: true})
export class PluginVersion extends AbstractEntityWithGeneratedId {
  @Column()
  pluginId!: number;

  @Column({length: 64})
  version!: string;

  @Column({type: 'text'})
  changelog!: string;

  @Column({type: 'text'})
  downloadUrl!: string;

  @Column({default: 0})
  downloadCount!: number;

  @Column({length: 64})
  minServerVersionId!: string;

  @Column({length: 64})
  maxServerVersionId!: string;

  @Column({default: false})
  definiteMaxServerVersion!: boolean;


  @ManyToOne(() => Plugin, plugin => plugin.versions)
  plugin?: Plugin;
}
