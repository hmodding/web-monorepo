import { Column, Entity } from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';

@Entity({ name: 'discord-sign-ons' })
export class DiscordSignOn extends AbstractEntityWithGeneratedId {
  @Column({ unique: true })
  userId!: number;

  @Column({ unique: true })
  discordUserId!: string;

  @Column()
  accessToken!: string;

  @Column()
  refreshToken!: string;
}
