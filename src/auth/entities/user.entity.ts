import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  fullName: string;

  @CreateDateColumn()
  createdAt: Date;
}
