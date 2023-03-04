import { Column, Entity, Index } from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';

@Entity({ name: 'download-trackers' })
@Index(['ipHash', 'path'], { unique: true })
export class DownloadTracker extends AbstractEntityWithGeneratedId {
  @Column({ length: 32 })
  ipHash!: string;

  @Column({ type: 'text' })
  path!: string;

  @Column({type: 'timestamp with time zone'})
  expiresAt!: Date;
}
