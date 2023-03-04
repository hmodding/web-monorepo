import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class AbstractEntityWithCreatedAndUpdated extends BaseEntity {
  @CreateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  createdAt?: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamp with time zone' })
  updatedAt?: Date;

  //hooks

  @BeforeInsert()
  setCreatedAt() {
    this.createdAt = new Date();
  }

  @BeforeInsert()
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
