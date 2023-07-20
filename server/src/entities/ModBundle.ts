import {Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne,} from 'typeorm';
import {AbstractEntityWithGeneratedId} from './AbstractEntityWithGeneratedId';
import {ModVersion} from './ModVersion';
import {User} from './User';

@Entity({name: 'mod-bundles'})
export class ModBundle extends AbstractEntityWithGeneratedId {
  @Column({length: 100})
  title!: string;

  @Column()
  description!: string;

  @Column({type: 'text'})
  readme!: string;

  @Column()
  maintainerId!: number; //is this necessary? or is the reference enough?

  @Column({type: 'text', nullable: true})
  bannerImageUrl?: string;

  @ManyToOne(() => User, user => user.modBundles)
  @JoinColumn({name: 'maintainerId', referencedColumnName: 'id'})
  maintainer?: User;

  @ManyToMany(() => ModVersion, (version) => version.modBundles)
  @JoinTable({
    name: 'ModBundleContents',
    joinColumn: {
      name: 'modBundleId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'modVersionId',
      referencedColumnName: 'id',
    },
  })
  modContents?: ModVersion[];
}
