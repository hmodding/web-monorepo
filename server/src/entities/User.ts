import { hashSync } from 'bcryptjs';
import { BeforeUpdate, Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { UserRole } from '../../../shared/types/UserRole';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';
import { Mod } from './Mod';
import { ModBundle } from './ModBundle';
import { Plugin } from './Plugin';
import { UserPrivilege } from './UserPrivilege';

@Entity({ name: 'users' })
export class User extends AbstractEntityWithGeneratedId {
  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column()
  role!: UserRole;

  @OneToMany(() => UserPrivilege, (privileges) => privileges.username)
  privileges!: UserPrivilege[];

  @OneToMany(() => Plugin, (plugin) => plugin.maintainerId)
  plugins?: Plugin[];

  @OneToMany(() => ModBundle, (bundle) => bundle.maintainerId)
  modBundles?: ModBundle[];

  @ManyToMany(() => Mod, (mod) => mod.author)
  likedMods?: Mod[];

  //hooks

  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password);
  }

  //helpers

  get isAdmin(): boolean {
    return this.role === 'admin'; //TODO: check privileges too
  }

  get isUnfinished(): boolean {
    return this.role === 'UNFINISHED'; //TODO: check privileges too
  }
}
