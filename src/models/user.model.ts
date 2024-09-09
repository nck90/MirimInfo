import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,  // 기본값으로 'student' 설정
  })
  role: UserRole;

  @Column({ nullable: true })
  classId: number;

  @Column()
  createdAt: Date;

  // 데이터베이스에 삽입되기 전에 자동으로 생성 날짜 설정
  @BeforeInsert()
  setCreationDate() {
    this.createdAt = new Date();
  }
}
