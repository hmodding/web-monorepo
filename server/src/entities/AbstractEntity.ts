import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
