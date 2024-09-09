import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  senderId: string;

  @Column('text')
  content: string;

  @Column()
  classId: number;

  @Column()
  sentAt: Date;

  // 메시지 삽입 전에 자동으로 sentAt 값을 설정
  @BeforeInsert()
  setSentAt() {
    this.sentAt = new Date();
  }
}
