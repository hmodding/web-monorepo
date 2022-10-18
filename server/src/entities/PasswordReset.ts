import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { generateToken } from '../utils';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';
import { User } from './User';

@Entity({ name: 'password-resets' })
export class PasswordReset extends AbstractEntityWithGeneratedId {
  @Column({ unique: true })
  userId!: number;

  @Column({ unique: true })
  token!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user?: User;

  //hooks

  @BeforeInsert()
  generateToken() {
    this.token = generateToken();
  }
}
