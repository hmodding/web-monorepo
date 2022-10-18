import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';
import { Mod } from './Mod';
import { ModBundle } from './ModBundle';
import { RaftVersion } from './RaftVersion';

@Entity({ name: 'mod-versions' })
@Index(['modId', 'version'], { unique: true })
export class ModVersion extends AbstractEntityWithGeneratedId {
  @Column({ length: 64 })
  modId!: string;

  @Column({ length: 64 }) // limited length because of file system restrictions
  version!: string;

  @Column({ type: 'text' })
  changelog!: string; // markdown

  @Column({ type: 'text' })
  downloadUrl!: string;

  @Column({ default: 0 })
  downloadCount!: number;

  @Column({ nullable: true })
  minRaftVersionId?: number;

  @Column({ nullable: true })
  maxRaftVersionId?: number;

  @Column()
  definiteMaxRaftVersion!: boolean;

  @Column({ type: 'json' })
  fileHashes?: Record<string, any>;

  @ManyToOne(() => Mod, (mod) => mod.versions)
  mod?: Mod;

  @OneToOne(() => RaftVersion) //TODO: Or ManyToOne?
  minRaftVersion?: RaftVersion;

  @OneToOne(() => RaftVersion) //TODO: Or ManyToOne?
  maxRaftVersion?: RaftVersion;

  @ManyToMany(() => ModBundle, (bundle) => bundle.modContents)
  bundles?: ModBundle[];
}
