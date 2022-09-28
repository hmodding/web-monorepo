import { hashSync } from 'bcryptjs';
import { BeforeUpdate, Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Role } from '../cfg';
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
  role!: string;

  @OneToMany(() => UserPrivilege, (privileges) => privileges.username)
  privileges!: UserPrivilege[];

  @OneToMany(() => Plugin, (plugin) => plugin.maintainerId)
  plugins?: Plugin[];

  @OneToMany(() => ModBundle, (bundle) => bundle.maintainerId)
  modBundles?: ModBundle[];

  @OneToMany(() => Mod, (mod) => mod.author)
  @JoinColumn({ name: 'username', referencedColumnName: 'author' })
  likedMods?: Mod[];

  //hooks

  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password);
  }

  //helpers

  get isAdmin(): boolean {
    return this.role === Role.Admin; //TODO: check privileges too;
  }
}
