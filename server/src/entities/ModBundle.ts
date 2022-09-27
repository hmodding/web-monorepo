import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';
import { ModVersion } from './ModVersion';
import { User } from './User';

@Entity({ name: 'mod-bundles' })
export class ModBundle extends AbstractEntityWithGeneratedId {
  @Column({ length: 100 })
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'text' })
  readme!: string;

  @Column()
  maintainerId!: number;

  @Column({ type: 'text', nullable: true })
  bannerImageUrl?: string;

  @OneToOne(() => User)
  @JoinColumn()
  maintainer?: User;

  @ManyToMany(() => ModVersion, (version) => version.bundles)
  @JoinTable()
  modContents?: ModVersion[];
}
