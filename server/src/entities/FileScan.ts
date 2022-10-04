import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';

@Entity({ name: 'file-scans' })
export class FileScan extends AbstractEntity {
  @PrimaryColumn({ type: 'text', unique: true })
  fileUrl!: string;

  @Column({ nullable: true, length: 96 }) // (sha256 = 64 chars) + (scan id ~ 10 chars) + buffer
  scanId?: string;

  @Column({ nullable: true, type: 'json' })
  scanResult?: Record<string, any>;
}
