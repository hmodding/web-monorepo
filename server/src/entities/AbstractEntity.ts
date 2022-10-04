import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity extends BaseEntity {
  @CreateDateColumn({ nullable: false })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: false })
  updatedAt?: Date;
}
