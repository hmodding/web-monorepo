import {Column, Entity, JoinColumn, OneToOne} from 'typeorm';

import {AbstractEntityWithGeneratedId} from './AbstractEntityWithGeneratedId';
import {User} from "./User";

@Entity({name: 'user-privileges'})
export class UserPrivilege extends AbstractEntityWithGeneratedId {
  @Column({unique: true})
  username!: string;

  @Column({unique: false, nullable: false})
  role!: string;

  @OneToOne(() => User, user => user.privilege)
  @JoinColumn({name: 'username', referencedColumnName: 'username'})
  user!: User;
}
