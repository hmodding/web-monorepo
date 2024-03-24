import {hashSync} from 'bcryptjs';
import {BeforeUpdate, Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne} from 'typeorm';
import {AbstractEntityWithGeneratedId} from './AbstractEntityWithGeneratedId';
import {Mod} from './Mod';
import {ModBundle} from './ModBundle';
import {Plugin} from './Plugin';
import {UserPrivilege} from './UserPrivilege';
import {ModLike} from "./ModLike";

@Entity({name: 'users'})
export class User extends AbstractEntityWithGeneratedId {
  @Column({unique: true})
  username!: string;

  @Column({unique: true})
  email!: string;

  @Column({select: false})
  password!: string;

  /* future feature
  @Column()
  role!: UserRole;
   */

  @OneToOne(() => UserPrivilege, userPrivilege => userPrivilege.user, { nullable: true })
  privilege!: UserPrivilege;

  @OneToMany(() => Plugin, (plugin) => plugin.maintainerId)
  plugins?: Plugin[];

  @OneToMany(() => ModBundle, (bundle) => bundle.maintainerId)
  modBundles?: ModBundle[];

  @OneToMany(() => ModLike, modLike => modLike.user)
  @JoinColumn({name: 'id', referencedColumnName: 'userId'})
  modLikes?: ModLike[];

  /*
  @ManyToMany(() => Mod, (mod) => mod.author)
  @JoinColumn()
  likedMods?: Mod[];
   */

  //hooks

  @BeforeUpdate()
  hashPassword() {
    this.password = hashSync(this.password);
  }

  //helpers

  get isAdmin(): boolean {
    return false;
  }

  /* future feature
  get isAdmin(): boolean {
    return this.role === 'admin'; //TODO: check privileges too
  }

  get isUnfinished(): boolean {
    return this.role === 'UNFINISHED'; //TODO: check privileges too
  }
   */
}
