import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';

@Entity({ name: 'server-versions' })
export class ServerVersion extends AbstractEntity {
  @PrimaryColumn({ unique: true })
  version!: string;

  @Column()
  raftVersion!: string;

  @Column()
  timestamp!: Date;

  @Column({ type: 'text' })
  downloadUrl!: string;

  @Column({ type: 'text', nullable: true })
  changelog?: string;
}
