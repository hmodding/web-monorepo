import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {AbstractEntityWithGeneratedId} from './AbstractEntityWithGeneratedId';
import {AbstractEntity} from "./AbstractEntity";

@Entity(/*{name: 'game_versions'}*/)
export class GameVersion extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({unique: true})
  version!: string;

  @Column()
  buildId!: number;

  @Column({nullable: true})
  title?: string;

  @Column({type: 'timestamp with time zone'})
  releasedAt!: Date;
}
