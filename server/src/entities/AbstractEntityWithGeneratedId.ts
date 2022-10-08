import { PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntityWithCreatedAndUpdated } from './AbstractEntity';

export abstract class AbstractEntityWithGeneratedId extends AbstractEntityWithCreatedAndUpdated {
  @PrimaryGeneratedColumn()
  id!: number;
}
