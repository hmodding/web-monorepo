import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { Mod } from './Mod';
import { User } from './User';

@Entity({ name: 'ModLikes' })
export class ModLike extends AbstractEntity {
  @PrimaryColumn({ unique: true })
  userId!: number;

  @Column({ length: 64 })
  modId!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user?: User;

  @OneToOne(() => Mod)
  @JoinColumn()
  mod?: Mod;
}
