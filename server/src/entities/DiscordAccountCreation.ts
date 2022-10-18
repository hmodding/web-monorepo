import { Column, Entity } from 'typeorm';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';

@Entity({ name: 'discord-account-creations' })
export class DiscordAccountCreation extends AbstractEntityWithGeneratedId {
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
