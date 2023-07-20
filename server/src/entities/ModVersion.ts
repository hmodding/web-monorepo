import {Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne,} from 'typeorm';
import {AbstractEntityWithGeneratedId} from './AbstractEntityWithGeneratedId';
import {Mod} from './Mod';
import {ModBundle} from './ModBundle';
import {GameVersion} from './GameVersion';

@Entity({name: 'mod-versions'})
@Index(['modId', 'version'], {unique: true})
export class ModVersion extends AbstractEntityWithGeneratedId {
  @Column({length: 64})
  modId!: string;

  @Column({length: 64}) // limited length because of file system restrictions
  version!: string;

  @Column({type: 'text'})
  changelog!: string; // markdown

  @Column({type: 'text'})
  downloadUrl!: string;

  @Column({default: 0})
  downloadCount!: number;

  @Column({nullable: true})
  minGameVersionId?: number;

  @Column({nullable: true})
  maxGameVersionId?: number;

  @Column()
  definiteMaxGameVersion!: boolean;

  /* new feature
  @Column({ type: 'json' })
  fileHashes?: Record<string, any>;
  */

  @ManyToOne(() => Mod, (mod) => mod.versions)
  mod?: Mod;

  @ManyToOne(() => GameVersion, raftVersion => raftVersion.id)
  minGameVersion?: GameVersion;

  @ManyToOne(() => GameVersion, raftVersion => raftVersion.id)
  maxGameVersion?: GameVersion;

  @ManyToMany(() => ModBundle, (bundle) => bundle.modContents)
  modBundles?: ModBundle[];
}
