import { Column, Entity } from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';

@Entity({ name: 'raft-versions' })
export class RaftVersion extends AbstractEntityWithGeneratedId {
  @Column({ unique: true })
  version!: string;

  @Column()
  buildId!: number;

  @Column({ nullable: true })
  title?: string;

  @Column()
  releasedAt!: Date;
}
