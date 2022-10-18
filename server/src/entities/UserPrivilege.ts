import { Column, Entity } from 'typeorm';

import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';

@Entity({ name: 'user-privileges' })
export class UserPrivilege extends AbstractEntityWithGeneratedId {
  @Column({ unique: true })
  username!: string;

  @Column({ unique: false })
  role!: string;
}
