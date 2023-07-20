import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { Mod } from './Mod';
import { User } from './User';

/**
 * We have to define our many-to-many tables as we have additional columns in there
 */
@Entity({ name: 'ModLikes' }) //No uppercase! https://github.com/typeorm/typeorm/issues/4420
export class ModLike extends AbstractEntity {
  @PrimaryColumn({ unique: true })
  userId!: number;

  @Column({ length: 64 })
  modId!: string;

  @ManyToOne(() => User, user => user.modLikes)
  user?: User;

  @ManyToOne(() => Mod)
  @JoinColumn({name: 'modId', referencedColumnName: 'id'})
  mod?: Mod;
}
