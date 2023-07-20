/*
import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';


@Entity({ name: 'discord-sign-ons' })
export class DiscordSignOn extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  userId!: number;

  @Column({ unique: true })
  discordUserId!: string;

  @Column()
  accessToken!: string;

  @Column()
  refreshToken!: string;
}
*/