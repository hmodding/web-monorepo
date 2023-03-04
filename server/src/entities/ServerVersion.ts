import {Column, Entity, PrimaryColumn} from 'typeorm';
import {AbstractEntityWithCreatedAndUpdated} from './AbstractEntity';

@Entity({name: 'server-versions'})
export class ServerVersion extends AbstractEntityWithCreatedAndUpdated {
  @PrimaryColumn({unique: true})
  version!: string;

  @Column()
  raftVersion!: string;

  @Column({type: 'timestamp with time zone'})
  timestamp!: Date;

  @Column({type: 'text'})
  downloadUrl!: string;

  @Column({type: 'text', nullable: true})
  changelog?: string;
}
