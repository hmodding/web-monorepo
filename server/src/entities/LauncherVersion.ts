import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AbstractEntityWithCreatedAndUpdated } from './AbstractEntity';

@Entity({ name: 'launcher-versions' })
export class LauncherVersion extends AbstractEntityWithCreatedAndUpdated {
  @PrimaryColumn({ unique: true })
  version!: string;

  @Column()
  timestamp!: Date;

  @Column({ type: 'text' })
  downloadUrl!: string;

  @Column({ default: 0 })
  downloadCount!: number;

  @Column({ type: 'text' })
  changelog!: string;
}
