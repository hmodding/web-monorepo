import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { generateToken } from '../utils';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';
import { User } from './User';

export interface SessionDeviceInfo {
  ipHash: string;
  platform?: string;
  userAgent?: string;
  appVersion?: string;
  vendor?: string;
}

@Entity({ name: 'sessions' })
@Index(['token'], { unique: true })
@Index(['userId'], { unique: false })
export class Session extends AbstractEntityWithGeneratedId {
  @Column({ unique: true })
  token!: string;

  @Column()
  expires!: Date;

  @Column()
  userId!: number;

  @Column({ type: 'json', nullable: true })
  deviceInfo?: SessionDeviceInfo;

  @OneToOne(() => User)
  @JoinColumn()
  user?: User;

  //hooks
  @BeforeInsert()
  @BeforeUpdate()
  generateToken() {
    this.token = generateToken(null, 36);
  }
}
