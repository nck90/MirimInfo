import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('text')
  content!: string;

  @Column()
  sender!: string;

  @Column()
  createdAt!: Date;

  // 엔터티가 데이터베이스에 삽입되기 전에 자동으로 실행
  @BeforeInsert()
  setCreationDate() {
    this.createdAt = new Date();
  }
}
