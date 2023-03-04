import {Column, Entity, PrimaryColumn,} from 'typeorm';
import {AbstractEntityWithCreatedAndUpdated} from '../AbstractEntity';

@Entity()
export class Session extends AbstractEntityWithCreatedAndUpdated {
  @PrimaryColumn({unique: true})
  sid!: string;

  @Column({type: 'timestamp with time zone'})
  expires!: Date;

  @Column({type: 'text'})
  data!: string
}
