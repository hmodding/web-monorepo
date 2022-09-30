import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { ModVersion } from './ModVersion';
import { ScheduledModDeletion } from './ScheduledModDeletion';
import { User } from './User';

@Entity({ name: 'mods' })
export class Mod extends AbstractEntity {
  @PrimaryColumn({ unique: true, length: 64 })
  id!: string;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column({ type: 'text' })
  readme!: string;

  @Column()
  category!: string;

  @Column()
  author!: string;

  @Column({ type: 'text', nullable: true })
  bannerImageUrl?: string;

  @Column({ type: 'text', nullable: true })
  iconImageUrl?: string;

  @Column({ type: 'text', nullable: true })
  repositoryUrl?: string;

  @OneToMany(() => ModVersion, (version) => version.mod)
  versions?: ModVersion[];

  @OneToOne(() => ScheduledModDeletion)
  deletion?: ScheduledModDeletion;

  @ManyToMany(() => User, (user) => user.likedMods)
  @JoinTable({
    name: 'ModLikes',
    joinColumn: {
      name: 'modId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
  })
  likes?: User[];

  //hooks

  /*TODO: -- see if this needs implementation: --
    async beforeFind(findOptions: FindOptions): Promise<void> {
    const modsToDelete = await scheduledModDeletionModel.findAll();
    const excludedIds = modsToDelete.map(({ modId }) => modId);

    findOptions.where = {
      ...findOptions.where,
      id: { [Op.notIn]: excludedIds },
    };

    const includes = Array.isArray(findOptions.include)
      ? findOptions.include
      : [findOptions.include];
    const versionsInclude =
      includes.find(
        (include) => (include as Association)?.as === 'versions',
      ) || null;

    if (versionsInclude) {
      findOptions.order = [['versions', 'createdAt', 'desc']];
    } else {
      findOptions.order = [['createdAt', 'desc']];
    }
  },
  */
}
