import { PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';

export abstract class AbstractEntityWithGeneratedId extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id!: number;
}
