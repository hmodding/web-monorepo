import {Column, Entity, PrimaryColumn} from 'typeorm';
import {AbstractEntity} from './AbstractEntity';

@Entity({name: 'launcher-versions'})
export class LauncherVersion extends AbstractEntity {
  @PrimaryColumn({unique: true})
  version!: string;

  @Column({type: 'timestamp with time zone'})
  timestamp!: Date;

  @Column({type: 'text'})
  downloadUrl!: string;

  @Column({default: 0})
  downloadCount!: number;

  @Column({type: 'text'})
  changelog!: string;
}
