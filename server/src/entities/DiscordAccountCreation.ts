/*
import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';
import {AbstractEntity} from "./AbstractEntity";

@Entity({ name: 'discord-account-creations' })
export class DiscordAccountCreation extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  discordUserId!: string;

  @Column()
  accessToken!: string;

  @Column()
  refreshToken!: string;

  @Column()
  token!: string;

  @Column({ type: 'json' })
  discordUserObject!: Record<string, any>;
}
*/