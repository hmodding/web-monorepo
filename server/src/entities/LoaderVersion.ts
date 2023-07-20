import {Column, Entity, JoinColumn, OneToOne, PrimaryColumn} from 'typeorm';
import {AbstractEntity} from './AbstractEntity';
import {GameVersion} from './GameVersion';

@Entity({name: 'loader-versions'})
export class LoaderVersion extends AbstractEntity {
  @PrimaryColumn({unique: true})
  rmlVersion!: string;

  @Column()
  raftVersionId!: number;

  @Column({type: 'timestamp with time zone'})
  timestamp!: Date;

  @Column({type: 'text', nullable: true})
  readme?: string;

  @OneToOne(() => GameVersion)
  @JoinColumn()
  raftVersion?: GameVersion;
}
