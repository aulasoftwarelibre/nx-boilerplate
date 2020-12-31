import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { UserView } from '../../application';

@Entity('users')
export class UserEntity implements UserView {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'simple-array',
  })
  roles: string[];

  constructor(id: string, username: string, password: string, roles: string[]) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.roles = roles;
  }
}
