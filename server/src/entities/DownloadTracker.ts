import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';

@Entity(/*{ name: 'download-trackers' }*/)
@Index(['ipHash', 'path'], { unique: true })
export class DownloadTracker extends AbstractEntityWithGeneratedId {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 32 })
  ipHash!: string;

  @Column({ type: 'text' })
  path!: string;

  @Column({type: 'timestamp with time zone'})
  expiresAt!: Date;
}
